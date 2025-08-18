import React, { createContext, useContext, useState, useEffect } from 'react';

interface Song {
  title: string;
  artist: string;
  key: string;
  sig: string;
  bpm: string;
  body: string[];
  user: string;
}

interface LlamaInsight {
  type: 'tritone' | 'secondary' | 'borrowed';
  chord: string;
  resolvesTo?: string;
  roman?: string;
  target?: string;
  tritoneSub?: string;
  fromMode?: string;
  inKey?: string;
  showSevenths?: boolean;
}

interface LlamaContextProps {
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
  selectedSong: Song;
  setSelectedSong: (song: Song) => void;
  llamaInsight: LlamaInsight | null;
  setLlamaInsight: (insight: LlamaInsight | null) => void;
}

const defaultSong: Song = {
  title: 'Default Song',
  artist: 'Unknown',
  key: 'C',
  sig: '4/4',
  bpm: '120',
  body: [],
  user: 'System',
};

const LlamaContext = createContext<LlamaContextProps>({
  selectedMode: 'Ionian',
  setSelectedMode: () => {},
  selectedSong: defaultSong,
  setSelectedSong: () => {},
  llamaInsight: null,
  setLlamaInsight: () => {},
});


export const useLlama = () => useContext(LlamaContext);

export const chordTypeWisdoms: Record<string, string> = {

};

export const LlamaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMode, setSelectedMode] = useState('Ionian');
  const [selectedSong, setSelectedSong] = useState<Song>(defaultSong);
  const [llamaInsight, setLlamaInsight] = useState<LlamaInsight | null>(null);

  useEffect(() => {
    console.log('selectedSong updated in LlamaProvider:', selectedSong);
  }, [selectedSong]);

  return (
    <LlamaContext.Provider
      value={{
        selectedMode,
        setSelectedMode,
        selectedSong,
        setSelectedSong,
        llamaInsight,
        setLlamaInsight
      }}
    >
      {children}
    </LlamaContext.Provider>
  );
};