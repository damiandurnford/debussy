import React, { useState, useEffect, useRef } from "react";
import './In-Llama.css';
import { useLlama } from './LlamaContext.tsx';

interface InLlamaProps {
  chordName: string;
  notes: string[];
}

const InLlama: React.FC<InLlamaProps> = ({ chordName, notes }) => {
  const [greeting, setGreeting] = useState<string>("Click my head to see more");

  const [darting, setDarting] = useState(false);
  const [bobbing, setBobbing] = useState(false);
  const { selectedMode, selectedSong, llamaInsight } = useLlama();
  const hasModeChanged = useRef(false);
  const hasChordChanged = useRef(false);
  const hasSongChanged = useRef(false);
  const hasInsightChanged = useRef(false);
  const hasBorrowedChanged = useRef(false);
  const prevInsight = useRef<any>(null);
  const prevBorrowedInsight = useRef<any>(null);
  const prevMode = useRef<string | null>(null);
  const prevChord = useRef<string | null>(null);


  useEffect(() => {
    if (llamaInsight && JSON.stringify(llamaInsight) !== JSON.stringify(prevInsight.current)) {
      hasInsightChanged.current = true;
      prevInsight.current = llamaInsight;

      if (llamaInsight.type === "tritone") {
        const message = `🎓 Tritone Substitution
${llamaInsight.chord} resolves to ${llamaInsight.resolvesTo}
Swap a dominant 7th chord for another a tritone away to create tension and surprise — a classic jazz move.`;
        setGreeting(message);
        setDarting(true);
        setTimeout(() => setDarting(false), 600);
      } else if (llamaInsight.type === "secondary") {
        const message = `🎓 Secondary Dominant
${llamaInsight.chord} resolves to ${llamaInsight.target} — functions as ${llamaInsight.roman}
A secondary dominant temporarily tonicizes ${llamaInsight.target}, creating a strong pull even outside the key.`;
        setGreeting(message);
        setDarting(true);
        setTimeout(() => setDarting(false), 600);
      } else if (llamaInsight.type === "borrowed") {
        if (JSON.stringify(llamaInsight) !== JSON.stringify(prevBorrowedInsight.current)) {
          hasBorrowedChanged.current = true;
          prevBorrowedInsight.current = llamaInsight;

          const message = `🎓 Borrowed Chord
${llamaInsight.chord} is borrowed from the ${llamaInsight.fromMode} mode in the key of ${llamaInsight.inKey}.
Borrowing adds colour and surprise by reaching into nearby modal palettes.`;

          setGreeting(message);
          setDarting(true);
          setTimeout(() => setDarting(false), 600);
        }
      }
    }
  }, [llamaInsight]);






  const groupedChordSuffixes: { group: string, chords: { label: string, suffix: string }[] }[] = [
    {
      group: 'Minor',
      chords: [
        { label: 'm', suffix: 'm' }
      ]
    },


    {
      group: 'Augmented',
      chords: [
        { label: 'Aug', suffix: 'aug' },
        { label: '+ (Aug)', suffix: 'aug' }
      ]
    },

    {
      group: 'Diminished',
      chords: [
        { label: 'Dim', suffix: 'dim' },
        { label: '°', suffix: 'dim' },

      ]
    },


    {
      group: 'Major',
      chords: [
        { label: '', suffix: '' }
      ]
    },



    {
      group: 'Suspended',
      chords: [
        { label: 'sus2', suffix: 'sus2' },
        { label: 'sus4', suffix: 'sus4' }
      ]
    },
    {
      group: 'Sevenths',
      chords: [
        { label: '7', suffix: '7' },
        { label: 'maj7', suffix: 'maj7' },
        { label: 'm7', suffix: 'm7' },
        { label: 'm7♭5 (ø)', suffix: 'm7b5' },
        { label: '°7', suffix: 'dim7' }
      ]
    },
    {
      group: 'Extensions',
      chords: [
        { label: '9', suffix: '9' },
        { label: 'maj9', suffix: 'maj9' },
        { label: 'm9', suffix: 'm9' },
        { label: '11', suffix: '11' },
        { label: '13', suffix: '13' },
        { label: 'maj13', suffix: 'maj13' },
        { label: 'm11', suffix: 'm11' }
      ]
    },
    {
      group: 'Altered Dominants',
      chords: [
        { label: 'aug7 (7♯5)', suffix: 'aug7' },
        { label: '7♭5', suffix: '7b5' },
        { label: '7♯9', suffix: '7#9' },
        { label: '7♭9', suffix: '7b9' }
      ]
    },
    {
      group: 'Added Tone',
      chords: [
        { label: 'add9', suffix: 'add9' },
        { label: '5', suffix: '5' }
      ]
    }
  ];

  const llamaGreetings = [
    "Hey there! I'm your 🦙 of Tonal Wisdom, let's make some music 🎶🎧",
    "Welcome! Click a chord, pick a mode, or just vibe ✨🎹",
    "The Llama is listening… what do you want to explore today? 👂🎵🧐",
    "Greetings, tonal traveler. Ready to explore some musical landscapes? 🗺️🎼",
    "Let's get expressive! The Llama approves your sonic journey ✅🎶🚀",
    "Try writing a 4-chord loop in Phrygian today. The Llama believes in your boldness 😎🎼🔥"
  ];

  const chordWisdoms = [
    "Nice chord 😁🎶",
    "A well-placed chord can change the whole mood 🎭🎵",
    "Let the chord speak 🎤💬",
    "Harmony is the spice of a song 🌶️🎶",
    "Tasty chord choice 😋🎧",
    "That chord, chef's kiss 👨‍🍳💋🎵",
    "Every chord tells a story 📖🎼",
    "Don't rush to the next chord 🐢⏳"
  ];

  const specialChordMessages: Record<string, string> = {
    "G#m": "Abm - This is what you get when you drop a piano down a mineshaft 🎹",
    "C#dim": "C#dim - Tense and unstable — diminished chords build suspense",
    "G7": "G7 - Dominant and punchy — classic setup for resolution",
    "Fmaj7": "Fmaj7 - Smooth, jazzy, and full of sophistication",
    "E7#9": "E7#9 - Hendrix called. He wants his chord back",
  };

  // Mode descriptions
  const modeDescriptions: Record<string, string> = {
    Ionian: "Bright and familiar, the classic major scale 🌞🎶",
    Dorian: "The minor scale with a raised 6th, moody but cool 😎🌙",
    Phrygian: "Dark and exotic, perfect for dramatic tension 🌌🔥",
    Lydian: "Dreamy and floating, thanks to its sharp 4th ☁️✨",
    Mixolydian: "Major with a twist, laid-back and bluesy 😌🎷",
    Aeolian: "The natural minor, expressive and emotional 😢🎵",
    Locrian: "Rare and unstable, built for bold explorers ⚠️🧭",
  };

  const modeWisdoms = [
    "Modes are like flavors 🍦🎼",
    "Tonal shift engaged 🔁🎶",
    "Your ear just leveled up 📈👂",
    "Modal magic in progress 🪄✨",
    "You’ve unlocked another layer of harmony 🧠🔓🎵",
    "Let the mode guide your melody 🎼🧭",
    "Exploring modes — it’s what the cool composers do 😎🎷"
  ];

  const chordTypeWisdoms: Record<string, string> = {
    "Major": "Major chords are built from a root, major 3rd, and perfect 5th — great for stability (C - E - G) 🏛️🎶",
    "Minor": "Minor chords are built from a root, minor 3rd, and perfect 5th — great for emotional depth (C - E♭ - G) 🌙💔",
    "Augmented": "Augmented chords use a major 3rd and sharp 5th — all tension and no resolution (C - E - G♯) ⚡❓",
    "Diminished": "Diminished chords stack minor thirds — perfect for eerie or suspenseful moments (C - E♭ - G♭) 🕷️🔮",
    "Suspended": "Suspended chords replace the 3rd with a 2nd or 4th — they float without resolving 🌊🤲",
    "Sevenths": "Seventh chords add a 7th above the root — major, minor, dominant, and more 🎺🎶",
    "Extensions": "Extensions add 9ths, 11ths, and 13ths — reaching deeper into the scale 🌈🔢",
    "Altered Dominants": "Altered dominants are spicy chords — used to resolve with extra tension and color 🌶️🌀",
    "Added Tone": "Added tone chords include extra scale tones (like 9 or 6) without extending the full seventh structure 🎨➕",
  };


  // Wisdom when chordName changes, with group-based message
  useEffect(() => {
    if (prevChord.current !== null && chordName !== prevChord.current) {
      hasChordChanged.current = true;

      // Do not override if a new insight was just shown
      if (hasInsightChanged.current) {
        hasInsightChanged.current = false;
        prevChord.current = chordName;
        return;
      }

      setBobbing(true);
      setTimeout(() => setBobbing(false), 600);

      const special = specialChordMessages[chordName];
      const base = chordWisdoms[Math.floor(Math.random() * chordWisdoms.length)];

      // Attempt to extract suffix
      const rootMatch = chordName.match(/^[A-G][b#]?/);
      const root = rootMatch ? rootMatch[0] : "";
      const suffix = chordName.replace(root, "");

      let groupMessage = "";
      for (const { group, chords } of groupedChordSuffixes) {
        if (chords.some(c => c.suffix === suffix)) {
          groupMessage = chordTypeWisdoms[group] || "";
          break;
        }
      }

      const message = special
        ? `${special}`
        : groupMessage
          ? `${groupMessage}`
          : `${base}`;

      setGreeting(message);
    }
    prevChord.current = chordName;
  }, [chordName]);

  // Wisdom when selectedMode changes
  useEffect(() => {
    if (prevMode.current !== null && selectedMode !== prevMode.current) {
      hasModeChanged.current = true;
      setDarting(true);
      setTimeout(() => setDarting(false), 600);
      const base = modeWisdoms[Math.floor(Math.random() * modeWisdoms.length)];
      const extra = selectedMode && modeDescriptions[selectedMode];
      const message = extra ? `The ${selectedMode} Mode - ${extra} (${base})` : base;
      setGreeting(message);
    }
    prevMode.current = selectedMode;
  }, [selectedMode]);

  // Show encouragement when selectedSong changes, but only if not the default song
  useEffect(() => {
    if (selectedSong?.title && selectedSong.title !== "Default Song") {
      hasSongChanged.current = true;
      const encouragements = [
        "Have fun playing this song 🎶",
        "Enjoy the groove! 🎸",
        "Make it your own! 🎵",
        "Feel the vibe! 🎼",
        "Let the music flow! 🎷",
      ];

      const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
      setGreeting(`${selectedSong.title} by ${selectedSong.artist} (${randomEncouragement})`);

    }
  }, [selectedSong])
  ;


  // On mount, pick a random greeting only if no changes detected
  useEffect(() => {
    hasSongChanged.current = false;
    if (!hasModeChanged.current && !hasChordChanged.current && !hasSongChanged.current) {
      const random = llamaGreetings[Math.floor(Math.random() * llamaGreetings.length)];
      setGreeting(random);
    }
  }, []);




  // Refresh greeting on head click
  const handleLlamaHeadClick = () => {
    const random = llamaGreetings[Math.floor(Math.random() * llamaGreetings.length)];
    setGreeting(random);

    setDarting(true);
    setTimeout(() => setDarting(false), 600);

  };

  return (
    <div className="llama-container">
      <div className="llama-container2">
      <div className={`llama-graphic ${bobbing ? 'llama-bob' : ''}`} onClick={handleLlamaHeadClick}>
        {/* Minimal Llama SVG */}
        <svg viewBox="0 0 64 64" width="64" height="90">
          {/* Ears */}
          <path d="M42 15 Q63 -30 57 0 Q55 15 45 15 Z" fill="antiquewhite" />
          <g transform="scale(-1,1) translate(-100)">
            <path d="M77 15 Q97 -30 92 0 Q90 15 80 15 Z" fill="antiquewhite" />
          </g>
          {/* Body */}

          <g transform="translate(32, 44)">
            <g>
              <circle r="4" cx="-18" cy="18" fill="white" />
              <circle r="4" cx="-18" cy="12" fill="white" />
              <circle r="4" cx="-18" cy="6" fill="white" />
              <circle r="4" cx="-18" cy="0" fill="white" />
              <circle r="4" cx="-18" cy="-6" fill="white" />
              <circle r="4" cx="-18" cy="-12" fill="white" />
              <circle r="4" cx="-18" cy="-18" fill="white" />
              <circle r="4" cx="-17" cy="-23" fill="white" />
              <circle r="4" cx="-14" cy="-28" fill="white" />
              <circle r="4" cx="-10" cy="-30" fill="white" />
              <circle r="4" cx="-5" cy="-32" fill="white" />
              <circle r="4" cx="0" cy="-33" fill="white" />
              <circle r="4" cx="5" cy="-32" fill="white" />
              <circle r="4" cx="10" cy="-30" fill="white" />
              <circle r="4" cx="17" cy="-23" fill="white" />
              <circle r="4" cx="14" cy="-28" fill="white" />
              <circle r="4" cx="18" cy="18" fill="white" />
              <circle r="4" cx="18" cy="12" fill="white" />
              <circle r="4" cx="18" cy="6" fill="white" />
              <circle r="4" cx="18" cy="0" fill="white" />
              <circle r="4" cx="18" cy="-6" fill="white" />
              <circle r="4" cx="18" cy="-12" fill="white" />
              <circle r="4" cx="18" cy="-18" fill="white" />
            </g>
          </g>
          <rect width="40" height="35" x="12" y="35" fill="white" />

          {/* Face */}
          <ellipse cx="32" cy="30" rx="20" ry="20" fill="white" />
          <circle cx="32" cy="40" r="8" fill="burlywood" />
          {/* Nose */}
          <path d="M30 36 Q30 33 32 33 Q34 33 34 36 Q34 38 32 40 Q30 38 30 36Z" fill="black" />
          {/* Smile */}
          <path d="M28 42 Q32 44 36 42" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="24" cy="28" r="4" fill="#000" className={`llama-blink-eye ${darting ? 'llama-dart-eye' : ''}`} />
          <circle cx="40" cy="28" r="4" fill="#000" className={`llama-blink-eye ${darting ? 'llama-dart-eye' : ''}`} />
        </svg>
      </div>
      <div className="llama-message">
        {greeting}
      </div>
</div>
      <div hidden className="llama-debug">
        <div>Chord: {chordName}</div>
        <div>Notes: {notes}</div>
        <div>Mode: {selectedMode}</div>
        <div>Mode Changed: {hasModeChanged.current ? "Yes" : "No"}</div>
        <div>Chord Changed: {hasChordChanged.current ? "Yes" : "No"}</div>
        <div>Song Changed: {hasSongChanged.current ? "Yes" : "No"}</div>
        <div>Selected Song: {selectedSong?.title} by {selectedSong?.artist}</div>
        <div>Llama Insight: {llamaInsight ? JSON.stringify(llamaInsight) : "None"}</div>
        <div>Insight Changed: {hasInsightChanged.current ? "Yes" : "No"}</div>
        <div>Borrowed Changed: {hasBorrowedChanged.current ? "Yes" : "No"}</div>
        <div>More debug info... </div>
      </div>



    </div>
  );
};

export default InLlama;