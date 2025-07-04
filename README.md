# Ableton Push 2 Chord Translator

A Next.js web application that helps musicians translate piano chords to Ableton Push 2 pad layouts in Scale Mode (4ths layout).

## Features

- **Interactive Piano Roll**: Click on piano keys to select chord notes
- **Real-time Chord Detection**: Automatically detects and names chords as you select notes
- **Push 2 Grid Visualization**: Shows the 8x8 Push grid in 4ths mode layout
- **Scale Mode Support**: Works with Major, Minor, Dorian, and Mixolydian scales
- **Root Note Highlighting**: Red pads show all root notes for orientation
- **Chord Tone Highlighting**: Orange pads show chord tones on the Push grid
- **Quick Chord Presets**: Common chords available with one click

## How It Works

### Scale Mode (4ths Layout)
In Scale Mode, the Push 2's 8×8 grid shows only notes from the selected scale:
- **Move right →** = next note in the scale
- **Move up ↑** = a fourth up in the scale (5 scale steps higher)
- **No wrong notes** — only scale notes are available
- **Consistent patterns** — chord shapes stay the same across all keys

### Color Coding
- **Red pads**: Root notes (e.g., all C's in C major scale)
- **Orange pads**: Chord tones from your selected chord
- **Beige pads**: Other scale notes

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. **Select a Scale**: Use the dropdown menus to choose your root note and scale type
2. **Input a Chord**: 
   - Click on piano keys to select notes
   - Use the quick chord presets for common chords
   - The app will automatically detect and name your chord
3. **View on Push Grid**: See how to play the chord on your Push 2 in the grid visualization
4. **Learn the Layout**: Red pads show root notes, orange pads show your chord tones

## Example Workflow

1. Set scale to "C Major"
2. Click on C, E, G keys in the piano roll
3. App detects "C Major" chord
4. Push grid shows C Major chord tones highlighted in orange
5. All C notes are highlighted in red for orientation

## Technical Details

- Built with Next.js 14 and TypeScript
- Uses Tailwind CSS for styling
- Implements music theory algorithms for chord detection
- Calculates Push 2 4ths mode layout mathematically
- Responsive design works on desktop and mobile

## Supported Scales

- Major
- Minor  
- Dorian
- Mixolydian

## Supported Chords

- Major and Minor triads
- Diminished and Augmented triads
- 7th chords (Major 7, Minor 7, Dominant 7, Minor 7b5)
- Extended chords (Major 9, Minor 9)

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Contributing

This app is designed to help musicians bridge the gap between traditional piano knowledge and the Push 2's unique layout. Contributions welcome!

## License

MIT License 