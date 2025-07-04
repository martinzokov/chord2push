import { Note, Chord, Scale, ScaleType, PushPad } from '../types/music'

export const NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const SCALE_INTERVALS: Record<ScaleType, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  pentatonic_minor: [0, 3, 5, 7, 10],
  pentatonic_major: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
  melodic_minor: [0, 2, 3, 5, 7, 9, 11],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11]
}

export const CHORD_PATTERNS = [
  { name: 'Major', intervals: [0, 4, 7] },
  { name: 'Minor', intervals: [0, 3, 7] },
  { name: 'Diminished', intervals: [0, 3, 6] },
  { name: 'Augmented', intervals: [0, 4, 8] },
  { name: 'Major 7', intervals: [0, 4, 7, 11] },
  { name: 'Minor 7', intervals: [0, 3, 7, 10] },
  { name: 'Dominant 7', intervals: [0, 4, 7, 10] },
  { name: 'Minor 7b5', intervals: [0, 3, 6, 10] },
  { name: 'Major 9', intervals: [0, 4, 7, 11, 14] },
  { name: 'Minor 9', intervals: [0, 3, 7, 10, 14] },
]

export function getNoteIndex(note: Note): number {
  return NOTES.indexOf(note)
}

export function getNote(index: number): Note {
  return NOTES[((index % 12) + 12) % 12]
}

export function generateScale(root: Note, type: ScaleType): Scale {
  const rootIndex = getNoteIndex(root)
  const intervals = SCALE_INTERVALS[type]
  
  const notes: Note[] = intervals.map(interval => 
    getNote(rootIndex + interval)
  )
  
  return {
    root,
    type,
    notes
  }
}

export function detectChord(selectedNotes: Note[]): Chord | null {
  if (selectedNotes.length < 3) return null
  
  // Try each note as the root
  for (const root of selectedNotes) {
    const rootIndex = getNoteIndex(root)
    const intervals = selectedNotes.map(note => {
      const noteIndex = getNoteIndex(note)
      return ((noteIndex - rootIndex) + 12) % 12
    }).sort((a, b) => a - b)
    
    // Find matching chord pattern
    for (const pattern of CHORD_PATTERNS) {
      if (arraysEqual(intervals, pattern.intervals)) {
        return {
          name: `${root} ${pattern.name}`,
          notes: selectedNotes,
          root
        }
      }
    }
  }
  
  return {
    name: selectedNotes.join('-'),
    notes: selectedNotes,
    root: selectedNotes[0]
  }
}

function arraysEqual(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((val, i) => val === b[i])
}

interface NoteOctave {
  note: Note
  octave: number
}

// Generate Push 2 grid in 4ths or 3rds mode
export function generatePushGrid(scale: Scale, selectedChord: Chord | null, layout: string, selectedNoteOctaves: NoteOctave[] = []): PushPad[][] {
  const grid: PushPad[][] = []
  const scaleNotes = scale.notes
  const startingOctave = 1
  
  // Define root note patterns for both layouts (used for highlighting only)
  const rootPattern4ths = [
    [1,0,0,0,0,0,0,1],  // Row 0: 10000001
    [0,0,0,1,0,0,0,0],  // Row 1: 00010000
    [0,0,0,0,0,0,1,0],  // Row 2: 00000010
    [0,0,1,0,0,0,0,0],  // Row 3: 00100000
    [0,0,0,0,0,1,0,0],  // Row 4: 00000100
    [0,1,0,0,0,0,0,0],  // Row 5: 01000000
    [0,0,0,0,1,0,0,0],  // Row 6: 00001000
    [1,0,0,0,0,0,0,1]   // Row 7: 10000001
  ]
  
  const rootPattern3rds = [
    [1,0,0,0,0,0,0,1],  // Row 0: 10000001
    [0,0,1,0,0,0,0,0],  // Row 1: 00100000
    [0,0,0,0,1,0,0,0],  // Row 2: 00001000
    [0,0,0,0,0,0,1,0],  // Row 3: 00000010
    [0,1,0,0,0,0,0,0],  // Row 4: 01000000
    [0,0,0,1,0,0,0,0],  // Row 5: 00010000
    [0,0,0,0,0,1,0,0],  // Row 6: 00000100
    [1,0,0,0,0,0,0,1]   // Row 7: 10000001
  ]
  
  // Select the appropriate pattern based on layout
  const rootPattern = layout === '3rds' ? rootPattern3rds : rootPattern4ths
  
  // Determine interval step based on layout
  const intervalStep = layout === '3rds' ? 2 : 3 // 3rds = +2 scale steps up, 4ths = +3 scale steps up
  
  // Build the grid using proper Push 2 logic
  for (let row = 0; row < 8; row++) {
    const gridRow: PushPad[] = []
    
    for (let col = 0; col < 8; col++) {
      // In Push 2 grid:
      // - Each column represents the next scale note (C, D, E, F, G, A, B, C)
      // - Each row represents moving up by the interval (4th or 3rd)
      // - Bottom row (row 7) is lowest octave, top row (row 0) is highest
      
      const invertedRow = 7 - row // Invert so bottom row = 0, top row = 7
      
      // Calculate the scale position for this grid position
      // Base position from column, plus interval steps from row
      const totalScaleSteps = col + (invertedRow * intervalStep)
      const scalePosition = totalScaleSteps % scaleNotes.length
      const note = scaleNotes[scalePosition]
      
      // Calculate octave based on how many complete scales we've traversed
      const octaveSteps = Math.floor(totalScaleSteps / scaleNotes.length)
      const octave = startingOctave + octaveSteps
      
      // Determine if this is a root note for highlighting
      const isRoot = rootPattern[row][col] === 1
      const isSelectedNote = selectedNoteOctaves.some(noteOctave => noteOctave.note === note && noteOctave.octave === octave)
      // Simplify: no special chord tone highlighting, just selected notes in yellow
      const isChordTone = false
      const isActive = isChordTone || isRoot || isSelectedNote
      
      gridRow.push({
        note,
        octave,
        isRoot,
        isChordTone,
        isSelectedNote,
        isActive
      })
    }
    
    grid.push(gridRow)
  }
  
  return grid
}

export function getChordSuggestions(scale: Scale): Chord[] {
  const suggestions: Chord[] = []
  
  // Generate triads for each scale degree
  for (let i = 0; i < scale.notes.length; i++) {
    const root = scale.notes[i]
    const third = scale.notes[(i + 2) % scale.notes.length]
    const fifth = scale.notes[(i + 4) % scale.notes.length]
    
    const rootIndex = getNoteIndex(root)
    const thirdIndex = getNoteIndex(third)
    const fifthIndex = getNoteIndex(fifth)
    
    const thirdInterval = ((thirdIndex - rootIndex) + 12) % 12
    const fifthInterval = ((fifthIndex - rootIndex) + 12) % 12
    
    let chordType = 'Major'
    if (thirdInterval === 3 && fifthInterval === 7) {
      chordType = 'Minor'
    } else if (thirdInterval === 3 && fifthInterval === 6) {
      chordType = 'Diminished'
    }
    
    suggestions.push({
      name: `${root} ${chordType}`,
      notes: [root, third, fifth],
      root
    })
  }
  
  return suggestions
} 