# Ableton Push Chord Translator

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://chord2push.vercel.app/)

A Next.js web application that helps musicians translate piano chords to Ableton Push pad layouts. This tool provides visual mapping between traditional piano chord fingerings and Push's 8x8 grid in both Scale Mode layouts (4ths and 3rds).

⚠️ NB: This project was vibe-coded entirely so I shift all responsibility for bad code to Claude 4 :) 

## Features

### Piano Roll Interface
- **Interactive Piano Keyboard**: Click notes to build chords across 2 octaves
- **Dual Mode Support**:
  - **In Key Mode**: Only scale notes are clickable
  - **Chromatic Mode**: All 12 notes are selectable
- **Octave Navigation**: Navigate through octaves 0-5
- **Quick Chord Presets**: One-click chord suggestions based on selected scale
- **Visual Feedback**: Clear distinction between scale notes, chromatic notes, and selected notes

### Push 2 Grid Visualization
- **Accurate 8x8 Grid**: Mirrors your Push 2 hardware layout
- **Multiple Layout Modes**:
  - **4ths Layout**: Traditional 4ths interval pattern
  - **3rds Layout**: Alternative 3rds interval pattern
- **Dual Mode Support**:
  - **In Key Mode**: Shows only scale notes
  - **Chromatic Mode**: Shows all 12 notes with proper chromatic progression
- **Color-Coded Display**:
  - **Red**: Root notes
  - **Yellow**: Selected notes
  - **Beige**: Available scale notes
- **Interactive Legend**: Clear visual reference for pad colors

### Scale Support
- **12 Popular Scales**:
  - Major, Minor, Harmonic Minor, Melodic Minor
  - Pentatonic Major, Pentatonic Minor, Blues
  - Dorian, Phrygian, Lydian, Mixolydian
- **All 12 Keys**: Complete chromatic key support with enharmonic equivalents
- **Real-time Updates**: Grid updates automatically when scale changes

### Music Theory Integration
- **Automatic Chord Detection**: Detects chord names from selected notes
- **Scale-aware Chord Suggestions**: Context-appropriate chord presets
- **Interval Calculations**: Accurate music theory computations

## Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd ableton-notes
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:3000` (or `http://localhost:3001` if port 3000 is in use)

## Usage

### Basic Workflow
1. **Select your scale** using the key and scale type dropdowns
2. **Choose your layout** (4ths or 3rds) to match your Push 2 settings
3. **Select push grid mode** (In Key or Chromatic)
4. **Set piano roll mode** (In Key or Chromatic) 
5. **Click notes** on the piano roll to build your chord
6. **View the mapping** on the Push 2 grid visualization

### Piano Roll Modes
- **In Key Mode**: Only notes from the selected scale are clickable (shown in white/black)
- **Chromatic Mode**: All 12 notes are selectable (scale notes in white/black, chromatic notes in gray)

### Push Grid Modes
- **In Key Mode**: 
  - Shows only scale notes arranged in the selected layout pattern
  - Root notes follow the traditional Push 2 scale mode patterns
- **Chromatic Mode**: 
  - Shows all 12 notes in chromatic progression
  - Root notes positioned according to Push 2's chromatic layout patterns
  - Each column = +1 semitone, each row = +4 semitones (3rds) or +5 semitones (4ths)

### Layout Patterns

#### 4ths Layout Root Positions
- **In Key**: Traditional Push 2 scale mode pattern
- **Chromatic**: Root notes at positions matching Push 2's chromatic 4ths layout

#### 3rds Layout Root Positions  
- **In Key**: Traditional Push 2 scale mode pattern
- **Chromatic**: Root notes at specific grid positions (1,1), (3,5), (4,1), (6,5), (7,1)

## Technical Details

### Built With
- **Next.js 14**: React framework with TypeScript
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript

### Key Components
- `PianoRoll.tsx`: Interactive piano keyboard component
- `PushGrid.tsx`: Push 2 grid visualization component
- `musicTheory.ts`: Music theory utilities and calculations

### Music Theory Implementation
- **Note System**: 12-tone equal temperament
- **Scale Generation**: Algorithmic scale construction
- **Chord Detection**: Pattern-based chord recognition
- **Interval Calculations**: Semitone-based interval arithmetic

## Project Structure

```
ableton-notes/
├── app/
│   ├── components/
│   │   ├── PianoRoll.tsx    # Piano keyboard interface
│   │   └── PushGrid.tsx     # Push 2 grid visualization
│   ├── types/
│   │   └── music.ts         # TypeScript type definitions
│   ├── utils/
│   │   └── musicTheory.ts   # Music theory calculations
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application page
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
