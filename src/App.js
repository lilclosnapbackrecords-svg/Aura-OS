import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

// NOTE: socket is initialized inside the component to allow proper lifecycle management and cleanup

function App() {
  const [transportState, setTransportState] = useState('STOPPED');
  const [lyricsDraft, setLyricsDraft] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection on mount
    try {
      socketRef.current = io('http://localhost:5000');
    } catch (e) {
      console.warn('Socket initialization failed', e);
      return;
    }

    const socket = socketRef.current;

    const onSyncStatus = (data) => {
      if (!data) return;
      try {
        setTransportState(data.state || 'STOPPED');
      } catch (e) {
        console.warn('Error handling sync_status', e);
      }
    };

    socket.on('sync_status', onSyncStatus);

    // Cleanup on unmount
    return () => {
      try {
        socket.off('sync_status', onSyncStatus);
        if (socket && socket.connected) socket.disconnect();
      } catch (e) {
        console.warn('Socket cleanup error', e);
      }
    };
  }, []);

  const handlePlay = () => {
    try {
      socketRef.current?.emit('transport_play', { time: 0 });
    } catch (e) {
      console.warn('Failed to emit transport_play', e);
    }
  };

  const handleStop = () => {
    try {
      socketRef.current?.emit('transport_stop');
    } catch (e) {
      console.warn('Failed to emit transport_stop', e);
    }
  };

  const generateLyrics = async () => {
    try {
      const resp = await fetch('http://localhost:5000/api/ai/lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'New R&B trap beat concept' })
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      setLyricsDraft(data.lyrics || '');
    } catch (err) {
      console.error('generateLyrics error', err);
      setLyricsDraft('// Error generating lyrics — check server logs or network.');
    }
  };

  return (
    <div className="aura-console">
      <header className="console-header">
        <h1>AURA OS v1</h1>
        <p>Intelligent Audio Production Environment</p>
      </header>

      <main className="console-grid">
        <section className="transport-controls">
          <h2>Transport</h2>
          <div className="status">Status: {transportState}</div>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handleStop}>Stop</button>
        </section>

        <section className="ai-assistant">
          <h2>AI Songwriting Assistant</h2>
          <button onClick={generateLyrics}>Draft Lyrics</button>
          <textarea
            value={lyricsDraft}
            readOnly
            placeholder="AI generated lyrics will appear here..."
            rows="5"
          />
        </section>

        <section className="dsp-rack">
          <h2>Signal Routing</h2>
          <div className="rack-unit">Master Bus: Ready</div>
          <div className="rack-unit">AI Compressor: Bypassed</div>
        </section>
      </main>
      <Analytics />
    </div>
  );
}

export default App;
