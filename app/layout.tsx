import './globals.css'

export const metadata = {
  title: 'Ableton Push 2 Chord Translator',
  description: 'Translate piano chords to Ableton Push 2 pad layouts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 