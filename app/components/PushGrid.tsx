'use client'

import { useMemo } from 'react'
import { Chord, Note, ScaleType } from '../types/music'
import { generateScale, generatePushGrid } from '../utils/musicTheory'

interface NoteOctave {
  note: Note
  octave: number
}

interface PushGridProps {
  selectedChord: Chord | null
  selectedNoteOctaves: NoteOctave[]
  scale: string
  scaleType: string
  layout: string
  mode: string
}

export default function PushGrid({ selectedChord, selectedNoteOctaves, scale, scaleType, layout, mode }: PushGridProps) {
  const currentScale = useMemo(() => {
    return generateScale(scale as any, scaleType as ScaleType)
  }, [scale, scaleType])

  const gridData = useMemo(() => {
    return generatePushGrid(currentScale, selectedChord, layout, selectedNoteOctaves, mode)
  }, [currentScale, selectedChord, layout, selectedNoteOctaves, mode])

  const getPadColor = (pad: any) => {
    if (pad.isRoot) {
      return 'bg-push-red' // Root notes are red
    } else if (pad.isSelectedNote) {
      return 'bg-yellow-500' // Selected notes are yellow
    } else if (pad.isInScale) {
      return 'bg-push-pad' // Scale notes are beige
    } else {
      return 'bg-gray-600' // Non-scale notes are dark gray (chromatic mode)
    }
  }

  const getPadBrightness = (pad: any) => {
    if (pad.isRoot) {
      return 'brightness-100'
    } else if (pad.isChordTone) {
      return 'brightness-90'
    } else if (pad.isSelectedNote) {
      return 'brightness-95'
    } else {
      return 'brightness-75'
    }
  }

  return (
    <div className="bg-push-grid p-4 rounded-lg">
      <div className="mb-4">
        <p className="text-sm text-gray-300">
          Scale: {scale} {scaleType} | {layout} Layout | {mode} Mode
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {mode === 'chromatic' 
            ? `Move right → +1 semitone | Move up → +${layout === '3rds' ? '3' : '5'} semitones (${layout === '3rds' ? 'minor third' : 'perfect fourth'})`
            : `Move right → next scale note | Move up → ${layout === '3rds' ? 'third interval (2 scale steps)' : 'fourth interval (3 scale steps)'}`
          }
        </p>
      </div>
      
      <div className="grid grid-cols-8 gap-1 max-w-md mx-auto">
        {gridData.map((row, rowIndex) =>
          row.map((pad, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
                             className={`
                 aspect-square rounded-lg shadow-lg border-2 border-gray-700
                 flex items-center justify-center text-xs font-medium
                 transition-all duration-200 hover:scale-105
                 ${getPadColor(pad)}
                 ${getPadBrightness(pad)}
                 ${pad.isRoot ? 'ring-2 ring-red-400' : ''}
                 ${pad.isChordTone ? 'ring-1 ring-orange-400' : ''}
                 ${pad.isSelectedNote && !pad.isChordTone ? 'ring-1 ring-yellow-400' : ''}
               `}
            >
              <div className="text-center">
                <div className="text-black font-bold">
                  {pad.note}
                </div>
                <div className="text-xs text-gray-800">
                  {pad.octave}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-push-red rounded border border-gray-600"></div>
            <span>Root Notes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded border border-gray-600"></div>
            <span>Selected Notes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-push-pad rounded border border-gray-600"></div>
            <span>Scale Notes</span>
          </div>
          {mode === 'chromatic' && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded border border-gray-600"></div>
              <span>Non-Scale Notes</span>
            </div>
          )}
        </div>
      </div>
      
      {selectedChord && (
        <div className="mt-4 bg-gray-800 p-3 rounded">
          <h4 className="font-medium text-white mb-2">Chord Fingering Tips:</h4>
          <p className="text-sm text-gray-300">
            For <span className="font-bold text-orange-400">{selectedChord.name}</span>, 
            look for the highlighted orange pads. Try different octaves and positions 
            to find comfortable fingering patterns.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Red pads show all {currentScale.root} notes for orientation.
          </p>
        </div>
      )}
    </div>
  )
} 