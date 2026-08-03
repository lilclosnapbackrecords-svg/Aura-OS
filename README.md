# Aura OS v1 - Intelligent Audio Production Environment

Aura OS v1 is a full-stack audio production platform built with React, Node.js, Express, and Socket.IO.

## Features

- **Real-time Transport Controls** - Play/Stop audio with WebSocket sync
- **BPM Sync** - Real-time BPM change broadcasting
- **Lyrics Frame Sync** - Synchronized lyrics delivery
- **AI Songwriting Assistant** - Generate lyrics powered by AI
- **Professional Audio Interface** - DSP rack with signal routing
- **WebSocket Communication** - Live updates via Socket.IO

## Tech Stack

- **Frontend:** React 18.2, Socket.IO Client, Axios
- **Backend:** Node.js, Express, Socket.IO
- **Build:** npm, react-scripts
- **Deployment:** Render

## Local Development

```bash
# Install root dependencies
npm install

# Install backend dependencies
npm install --prefix backend

# Start dev server (concurrent frontend + backend)
npm run dev

# OR run them separately
npm start                    # Frontend on http://localhost:3000
npm run server:dev --prefix backend  # Backend on http://localhost:5000
```

## Building for Production

```bash
# Build frontend
npm run build

# Start production backend
npm start
```

## Deployment on Render

### Automated Deployment
This repository is configured for automatic deployment on Render:

1. Go to [render.com](https://render.com) and sign up/log in
2. Click **New +** → **Web Service**
3. Connect your GitHub repository (`lilclosnapbackrecords-svg/Aura-OS`)
4. Fill in the configuration:
   - **Name:** `aura-os-v1`
   - **Environment:** Node
   - **Build Command:** `bash build.sh`
   - **Start Command:** `cd backend && node server.js`
   - **Plan:** Free (or upgraded)
5. Click **Create Web Service**
6. Render will deploy automatically! 🚀

Your app will be available at: `https://aura-os-v1.onrender.com`

## API Endpoints

### REST API
- `GET /` - Backend status and features
- `GET /health` - Health check
- `POST /api/ai/lyrics` - Generate AI lyrics
- `POST /api/ai/transcribe` - Audio-to-MIDI transcription (WIP)

### WebSocket Events
- **Emit:** `transport_play` - Start playback
- **Emit:** `transport_stop` - Stop playback
- **Emit:** `change-bpm` - Update BPM
- **Emit:** `sync-lyrics` - Sync lyrics frame
- **Listen:** `sync_status` - Transport state updates
- **Listen:** `bpm-updated` - BPM changes
- **Listen:** `lyrics-frame` - Lyrics sync updates

## Project Structure

```
.
├── src/                 # React frontend
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   └── index.js
├── public/              # Static assets
│   └── index.html
├── backend/
│   ├── server.js        # Express + Socket.IO server
│   ├── package.json
│   └── package-lock.json
├── package.json         # Root dependencies
├── package-lock.json    # Root lock file
├── build.sh             # Render build script
├── Procfile             # Process configuration
├── Dockerfile           # Container configuration
└── README.md            # This file
```

## Environment Variables

- `PORT` - Server port (default: 5000)

## Deployment Status

✅ Issue #4 (deployment) - **RESOLVED**
- Backend features merged from deployment issue
- Render configuration added (build.sh, Procfile, Dockerfile)
- Ready for production deployment

## License

PUHD V1
