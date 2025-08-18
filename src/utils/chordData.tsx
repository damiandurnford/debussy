export const groupedChordSuffixes: { group: string, chords: { label: string, suffix: string }[] }[] = [
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