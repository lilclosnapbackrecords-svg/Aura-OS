const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Home endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'Aura OS backend online',
    version: 'v1',
    features: ['transport-control', 'ai-lyrics', 'bpm-sync', 'lyrics-frame']
  });
});

// AI & DSP Routing Endpoints
app.post('/api/ai/transcribe', (req, res) => {
    // TODO: Connect to audio-to-MIDI transcription service
    console.log('Audio to MIDI transcription requested.');
    res.json({ status: 'Processing', message: 'Transcription started.' });
});

app.post('/api/ai/lyrics', (req, res) => {
    // TODO: Connect to AI lyric generation engine
    const { prompt } = req.body;
    console.log(`Generating lyrics for prompt: ${prompt}`);
    res.json({ lyrics: '[Generated Lyrics Draft Will Appear Here]' });
});

// Serve static frontend when built (assumes `npm run build` ran at repo root)
const buildPath = path.join(__dirname, '..', 'build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
}

// For SPA client-side routing, serve index.html for any non-API route
app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path === '/health' || req.path.startsWith('/socket.io')) {
    return res.status(404).json({ error: 'Not found' });
  }
  const index = path.join(buildPath, 'index.html');
  if (fs.existsSync(index)) {
    return res.sendFile(index);
  }
  return res.status(404).send('Not found');
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Real-time Studio Console Transport
io.on('connection', (socket) => {
    console.log(`Studio Console connected: ${socket.id}`);

    // Transport events
    socket.on('transport_play', (data) => {
        console.log('Transport: PLAY triggered');
        io.emit('sync_status', { state: 'PLAYING', time: data.time });
    });

    socket.on('transport_stop', () => {
        console.log('Transport: STOP triggered');
        io.emit('sync_status', { state: 'STOPPED', time: 0 });
    });

    // BPM sync event
    socket.on('change-bpm', (data) => {
        console.log(`BPM changed to: ${data.bpm}`);
        io.emit('bpm-updated', data);
    });

    // Lyrics frame sync event
    socket.on('sync-lyrics', (data) => {
        console.log('Lyrics frame synced');
        io.emit('lyrics-frame', data);
    });

    socket.on('disconnect', () => {
        console.log(`Studio Console disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  server.listen(PORT, () => {
      console.log(`Aura OS v1 Backend running on port ${PORT}`);
  });
}

module.exports = app;
