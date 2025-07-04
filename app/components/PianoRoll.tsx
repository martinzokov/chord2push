'use client'

import { useState, useEffect, useMemo } from 'react'
import { Note, Chord, ScaleType } from '../types/music'
import { NOTES, detectChord, generateScale, getChordSuggestions } from '../utils/musicTheory'

interface PianoRollProps {
  onChordChange: (chord: Chord | null) => void
  onNotesChange: (noteOctaves: NoteOctave[]) => void
  scale: string
  scaleType: string
  mode: string
}

interface NoteOctave {
  note: Note
  octave: number
}

export default function PianoRoll({ onChordChange, onNotesChange, scale, scaleType, mode }: PianoRollProps) {
  const [selectedNoteOctaves, setSelectedNoteOctaves] = useState<NoteOctave[]>([])
  const [currentOctave, setCurrentOctave] = useState(3)
  
  // Generate 2 octaves of notes around current octave
  const octaves = [currentOctave, currentOctave + 1]
  const allNotes = octaves.flatMap(octave => 
    NOTES.map(note => ({ note, octave }))
  )

  // Generate current scale and chord suggestions
  const currentScale = useMemo(() => {
    return generateScale(scale as Note, scaleType as ScaleType)
  }, [scale, scaleType])

  const chordSuggestions = useMemo(() => {
    return getChordSuggestions(currentScale)
  }, [currentScale])

  // Check if a note is in the current scale
  const isNoteInScale = (note: Note) => {
    return currentScale.notes.includes(note)
  }

  useEffect(() => {
    // Pass the selected note-octave pairs to the parent
    onNotesChange(selectedNoteOctaves)
    
    // Extract just the notes for chord detection
    const justNotes = selectedNoteOctaves.map(noteOctave => noteOctave.note)
    
    // Handle chord detection
    if (justNotes.length >= 3) {
      const chord = detectChord(justNotes)
      if (chord) {
        onChordChange(chord)
      }
    } else {
      // Clear the chord when fewer than 3 notes are selected
      onChordChange(null)
    }
  }, [selectedNoteOctaves, onChordChange, onNotesChange])

  const toggleNote = (note: Note, octave: number) => {
    // In chromatic mode, allow all notes; in in-key mode, only allow scale notes
    if (mode === 'in-key' && !isNoteInScale(note)) return
    
    setSelectedNoteOctaves(prev => {
      const existingIndex = prev.findIndex(noteOctave => noteOctave.note === note && noteOctave.octave === octave)
      if (existingIndex !== -1) {
        // Remove if already selected
        return prev.filter((_, index) => index !== existingIndex)
      } else {
        // Add if not selected
        return [...prev, { note, octave }]
      }
    })
  }

  const clearNotes = () => {
    setSelectedNoteOctaves([])
  }

  const isBlackKey = (note: Note) => {
    return note.includes('#')
  }

  const getKeyPosition = (note: Note, octave: number) => {
    const noteIndex = NOTES.indexOf(note)
    const octaveOffset = octave * 7 // 7 white keys per octave
    
    // White key positions (C, D, E, F, G, A, B)
    const whiteKeyPositions = [0, 1, 2, 3, 4, 5, 6]
    const whiteKeyMap = [0, 2, 4, 5, 7, 9, 11] // C, D, E, F, G, A, B
    
    if (!isBlackKey(note)) {
      const whiteKeyIndex = whiteKeyMap.indexOf(noteIndex)
      return octaveOffset + whiteKeyIndex
    }
    
    return -1 // Will be handled separately for black keys
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={clearNotes}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear All
          </button>
          <span className="text-gray-300">
            Selected: {selectedNoteOctaves.map(noteOctave => `${noteOctave.note}${noteOctave.octave}`).join(', ')}
          </span>
        </div>
        
        {/* Octave Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentOctave(prev => Math.max(0, prev - 1))}
            disabled={currentOctave <= 0}
            className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↓
          </button>
          <span className="text-gray-300 min-w-[80px] text-center">
            Octave {currentOctave}
          </span>
          <button
            onClick={() => setCurrentOctave(prev => Math.min(5, prev + 1))}
            disabled={currentOctave >= 5}
            className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↑
          </button>
        </div>
      </div>
      
      <div className="relative h-32 bg-gray-300 rounded overflow-hidden">
        {/* White Keys */}
        <div className="flex h-full">
          {allNotes.filter(({ note }) => !isBlackKey(note)).map(({ note, octave }, index) => {
            const inScale = isNoteInScale(note)
            const isClickable = mode === 'chromatic' || inScale
            return (
              <button
                key={`${note}${octave}`}
                onClick={() => isClickable && toggleNote(note, octave)}
                disabled={!isClickable}
                className={`
                  flex-1 h-full border-r border-gray-400 flex items-end justify-center pb-2 text-xs font-medium
                  ${!isClickable 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : selectedNoteOctaves.some(noteOctave => noteOctave.note === note && noteOctave.octave === octave) 
                      ? 'bg-blue-500 text-white' 
                      : inScale 
                        ? 'bg-white text-black hover:bg-gray-100 cursor-pointer'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'
                  }
                `}
              >
                {note}{octave}
              </button>
            )
          })}
        </div>
        
        {/* Black Keys */}
        <div className="absolute top-0 left-0 h-20 w-full">
          {allNotes.filter(({ note }) => isBlackKey(note)).map(({ note, octave }) => {
            const noteIndex = NOTES.indexOf(note)
            // Standard black key positions relative to white keys in each octave
            const blackKeyPositions = [0.95, 1.95, 3.95, 4.95, 5.95] // C#, D#, F#, G#, A#
            const blackKeyMap = [1, 3, 6, 8, 10] // C#, D#, F#, G#, A#
            
            const blackKeyIndex = blackKeyMap.indexOf(noteIndex)
            if (blackKeyIndex === -1) return null
            
            const inScale = isNoteInScale(note)
            const isClickable = mode === 'chromatic' || inScale
            
            // Calculate position based on which octave this is in the current view
            const octaveInView = octave - currentOctave // 0 for first octave, 1 for second octave
            const leftOffset = (octaveInView * 7) + blackKeyPositions[blackKeyIndex]
            
            return (
              <button
                key={`${note}${octave}`}
                onClick={() => isClickable && toggleNote(note, octave)}
                disabled={!isClickable}
                className={`
                  absolute w-6 h-20 rounded-b text-xs font-medium flex items-end justify-center pb-1 border border-gray-600
                  ${!isClickable 
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed border-gray-500' 
                    : selectedNoteOctaves.some(noteOctave => noteOctave.note === note && noteOctave.octave === octave) 
                      ? 'bg-blue-600 text-white border-blue-400' 
                      : inScale 
                        ? 'bg-black text-white hover:bg-gray-900 cursor-pointer'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-700 cursor-pointer border-gray-500'
                  }
                `}
                style={{
                  left: `${leftOffset * (100 / 14)}%`,
                  transform: 'translateX(-50%)',
                  zIndex: 10
                }}
              >
                <span className="text-xs">{note.replace('#', '♯')}{octave}</span>
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Chord Suggestions */}
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Quick Chord Presets ({scale} {scaleType}):</h3>
        <div className="grid grid-cols-2 gap-2">
          {chordSuggestions.map((chord) => (
            <button
              key={chord.name}
              onClick={() => setSelectedNoteOctaves(chord.notes.map(note => ({ note, octave: currentOctave })))}
              className="px-3 py-1 bg-gray-700 text-sm rounded hover:bg-gray-600"
            >
              {chord.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 