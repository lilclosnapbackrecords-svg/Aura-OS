import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// Connect to the Aura OS Backend
const socket = io('http://localhost:5000');

function App() {
  const [transportState, setTransportState] = useState('STOPPED');
  const [lyricsDraft, setLyricsDraft] = useState('');

  useEffect(() => {
    socket.on('sync_status', (data) => {
      setTransportState(data.state);
    });

    return () => socket.off('sync_status');
  }, []);

  const handlePlay = () => {
    socket.emit('transport_play', { time: 0 });
  };

  const handleStop = () => {
    socket.emit('transport_stop');
  };

  const generateLyrics = async () => {
    const response = await fetch('http://localhost:5000/api/ai/lyrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'New R&B trap beat concept' })
    });
    const data = await response.json();
    setLyricsDraft(data.lyrics);
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
    </div>
  );
}

export default App;