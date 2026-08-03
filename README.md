# Aura OS v1 - Intelligent Audio Production Environment

Aura OS v1 is a full-stack audio production platform built with React, Node.js, Express, and Socket.IO.

## Features

- **Real-time Transport Controls** - Play/Stop audio with WebSocket sync
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

1. Go to [render.com](https://render.com) and sign up/log in
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Fill in the configuration:
   - **Name:** `aura-os-v1` (or your choice)
   - **Environment:** Node
   - **Build Command:** `bash build.sh`
   - **Start Command:** `cd backend && node server.js`
5. Click **Create Web Service**
6. Render will deploy automatically! 🚀

## API Endpoints

- `GET /health` - Health check
- `POST /api/ai/lyrics` - Generate AI lyrics
- `POST /api/ai/transcribe` - Audio-to-MIDI transcription (WIP)
- WebSocket: Real-time transport sync via Socket.IO

## Project Structure

```
.
├── src/                 # React frontend
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/              # Static assets
├── backend/
│   ├── server.js        # Express + Socket.IO server
│   ├── package.json
│   └── package-lock.json
├── package.json         # Root dependencies
├── build.sh             # Render build script
├── Procfile             # Process configuration
├── Dockerfile           # Container configuration
└── package-lock.json    # Root lock file
```

## Environment Variables

- `PORT` - Server port (default: 5000)

## License

PUHD V1
