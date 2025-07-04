export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

export interface Chord {
  name: string
  notes: Note[]
  root: Note
}

export interface PushPad {
  note: Note
  octave: number
  isRoot: boolean
  isChordTone: boolean
  isSelectedNote: boolean
  isActive: boolean
}

export interface Scale {
  root: Note
  type: string
  notes: Note[]
}

export type ScaleType = 'major' | 'minor' | 'dorian' | 'mixolydian' | 'pentatonic_minor' | 'pentatonic_major' | 'blues' | 'harmonic_minor' | 'melodic_minor' | 'phrygian' | 'lydian' 