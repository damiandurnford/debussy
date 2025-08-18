import React, { useEffect, useState } from "react";
import "./In-Piano.css";
import { BackgroundColor } from "styled-icons/foundation";

interface InPianoProps {
  activeNotes?: string[];
}

// Persistent AudioContext and buffer cache map
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
const bufferMap: { [note: string]: AudioBuffer } = {};

const InPiano: React.FC<InPianoProps> = ({ activeNotes = [] }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const notes = [
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
  ];

  const playNoteAudio = (note: string) => {
    if (!soundEnabled) return;
    const buffer = bufferMap[note];
    if (buffer) {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
    }
  };

  // Load and decode audio files into AudioBuffers
  useEffect(() => {
    notes.forEach((note) => {
      if (!bufferMap[note]) {
        fetch(`/media/${encodeURIComponent(note)}.mp3`)
          .then((response) => response.arrayBuffer())
          .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
          .then((audioBuffer) => {
            bufferMap[note] = audioBuffer;
          })
          .catch((err) => {
            console.warn(`Failed to load or decode audio for ${note}:`, err);
          });
      }
    });
    // No cleanup needed: persistent cache for the lifetime of the app
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    activeNotes.forEach((note) => playNoteAudio(note));
  }, [activeNotes]);

  return (
    <>


<div className="w3switch">
  <span><b>Piano Sound:</b></span>
  <label className="switch">
    <input
      type="checkbox"
      checked={soundEnabled}
      onChange={() => setSoundEnabled(!soundEnabled)}
    />
    <span className="slider" />
  </label>
  <span style={{ marginLeft: "10px" }}>{soundEnabled ? '🔊' : '🔇'}</span>
</div>


<div className="piano-container">

      <div className="in-piano">
        {notes.map((note) => {
          const isSharp = note.includes("#");
          const isActive = activeNotes.includes(note);
          return (
            <div
              key={note}
              className={`key ${isSharp ? "black" : "white"} ${isActive ? "active" : ""}`}
              onClick={() => playNoteAudio(note)}
            >
              {isActive && <div className="finger-dot" />}
            </div>
          );
        })}
      </div></div>
    </>
  );
};

export default InPiano;
