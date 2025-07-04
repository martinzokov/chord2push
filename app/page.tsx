'use client'

import { useState } from 'react'
import PianoRoll from './components/PianoRoll'
import PushGrid from './components/PushGrid'
import { Note, Chord } from './types/music'

interface NoteOctave {
  note: Note
  octave: number
}

export default function Home() {
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null)
  const [selectedNoteOctaves, setSelectedNoteOctaves] = useState<NoteOctave[]>([])
  const [currentScale, setCurrentScale] = useState('C')
  const [scaleType, setScaleType] = useState('major')
  const [layout, setLayout] = useState('4ths')
  const [mode, setMode] = useState('in-key')

  const handleChordChange = (chord: Chord | null) => {
    setSelectedChord(chord)
  }

  const handleNotesChange = (noteOctaves: NoteOctave[]) => {
    setSelectedNoteOctaves(noteOctaves)
  }

  const handleScaleChange = (scale: string, type: string) => {
    setCurrentScale(scale)
    setScaleType(type)
  }

  return (
    <div className="min-h-screen bg-push-dark p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Ableton Push 2 Chord Translator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Piano Roll Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Piano Roll - Select Chord</h2>
            <PianoRoll 
              onChordChange={handleChordChange} 
              onNotesChange={handleNotesChange}
              scale={currentScale} 
              scaleType={scaleType} 
            />
          </div>

          {/* Push Grid Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Push 2 Grid ({layout} - {mode})</h2>
            
            {/* Scale Controls */}
            <div className="mb-4 flex gap-4 flex-wrap">
              <select 
                value={currentScale} 
                onChange={(e) => handleScaleChange(e.target.value, scaleType)}
                className="px-3 py-2 bg-gray-700 rounded text-white"
              >
                <option value="C">C</option>
                <option value="C#">C# / Db</option>
                <option value="D">D</option>
                <option value="D#">D# / Eb</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="F#">F# / Gb</option>
                <option value="G">G</option>
                <option value="G#">G# / Ab</option>
                <option value="A">A</option>
                <option value="A#">A# / Bb</option>
                <option value="B">B</option>
              </select>
              
              <select 
                value={scaleType} 
                onChange={(e) => handleScaleChange(currentScale, e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded text-white"
              >
                <option value="major">Major</option>
                <option value="minor">Minor</option>
                <option value="harmonic_minor">Harmonic Minor</option>
                <option value="melodic_minor">Melodic Minor</option>
                <option value="pentatonic_major">Pentatonic Major</option>
                <option value="pentatonic_minor">Pentatonic Minor</option>
                <option value="blues">Blues</option>
                <option value="dorian">Dorian</option>
                <option value="phrygian">Phrygian</option>
                <option value="lydian">Lydian</option>
                <option value="mixolydian">Mixolydian</option>
              </select>
              
              <select 
                value={layout} 
                onChange={(e) => setLayout(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded text-white"
              >
                <option value="4ths">4ths Layout</option>
                <option value="3rds">3rds Layout</option>
              </select>
              
              <select 
                value={mode} 
                onChange={(e) => setMode(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded text-white"
              >
                <option value="in-key">In Key</option>
                <option value="chromatic">Chromatic</option>
              </select>
            </div>

            <PushGrid 
              selectedChord={selectedChord} 
              selectedNoteOctaves={selectedNoteOctaves}
              scale={currentScale} 
              scaleType={scaleType}
              layout={layout}
              mode={mode}
            />
          </div>
        </div>

        {/* Chord Info */}
        {(selectedChord || selectedNoteOctaves.length > 0) && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            {selectedChord ? (
              <>
                <h3 className="text-lg font-semibold mb-2">Selected Chord</h3>
                <p className="text-gray-300">
                  {selectedChord.name} - Notes: {selectedChord.notes.join(', ')}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">Selected Notes</h3>
                <p className="text-gray-300">
                  Notes: {selectedNoteOctaves.map(noteOctave => `${noteOctave.note}${noteOctave.octave}`).join(', ')} 
                  {selectedNoteOctaves.length > 0 && selectedNoteOctaves.length < 3 && 
                    ` (Need ${3 - selectedNoteOctaves.length} more for chord detection)`
                  }
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 