import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sustain X : Building Tomorrow',
  description: 'An initiate by IGBCCUSAT to promote sustainable living, Visit us at www.igbccusat.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
