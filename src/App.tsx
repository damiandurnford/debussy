import React, { useState } from 'react';
import './App.css';
import CoF from './components/CoF.tsx';
import Chart from './components/Chart.tsx';
import Tabs from './components/Tabs.tsx';
import Chord from './components/Chord.tsx';
import Progressions from './components/Progressions.tsx';
import Modes from './components/Modes.tsx';
import ToolButton from './components/ToolButton.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';
import { LlamaProvider } from './components/LlamaContext.tsx';

function App() {

  const [selectedChord, setSelectedChord] = useState<string>('C');
  const [activeTool, setActiveTool] = useState<'cof' | 'progressions' | 'chart' | 'tabs' | 'modes'>('tabs');

  const renderTool = () => {
    switch (activeTool) {
      case 'cof':
        return <CoF onChordSelect={setSelectedChord} />;
      case 'chart':
        return <Chart onChordSelect={setSelectedChord} />;
      case 'tabs':
        return <Tabs onChordSelect={setSelectedChord} />;
      case 'modes':
        return <Modes onChordSelect={setSelectedChord} />;
      case 'progressions':
        return <Progressions onChordSelect={setSelectedChord} />;
      default:
        return null;
    }
  };

  return (
    <LlamaProvider>
      <div className="App">

        <div className="tool-buttons">
          <ToolButton
            label="📝 Tabs"
            onClick={() => setActiveTool('tabs')}
            selected={activeTool === 'tabs'}
          />
          <ToolButton
            label="🎸 Chart"
            onClick={() => setActiveTool('chart')}
            selected={activeTool === 'chart'}
          />
          <ToolButton
            label="⭕️ CoF"
            onClick={() => setActiveTool('cof')}
            selected={activeTool === 'cof'}
          />
          <ToolButton
            label="🎨 Modes"
            onClick={() => setActiveTool('modes')}
            selected={activeTool === 'modes'}
          />
          <ToolButton
            label="🎶 Progs"
            onClick={() => setActiveTool('progressions')}
            selected={activeTool === 'progressions'}
          />
        </div>
        <div className="main-content">
          <div className="pane-1">{renderTool()}
          </div>
          <div className="pane-2">
            <Chord chord={selectedChord} />
          </div>
         
        </div>

  <div className="title-row">
    <div className="title">De♭ussy <button className="version">(v0.93)</button></div>
   <button id="menuBtn">🎶</button>
    <button id="darkModeBtn">🌙</button>
  </div>

  <ThemeToggle />

      </div>
    </LlamaProvider>
  );
};

export default App;