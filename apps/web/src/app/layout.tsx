import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Flea Market',
  description: 'A modern flea market application',
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
