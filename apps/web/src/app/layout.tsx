import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

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
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <main className="flex-1">
          {children}
        </main>
        <footer className="mt-20 w-full border-t bg-background/50 px-6 py-10 text-center text-sm text-muted-foreground">
          <p className="mb-4">
            <Link href="/about" className="underline hover:text-foreground">About</Link>
          </p>
          <p className="mb-2">
            &copy; {new Date().getFullYear()} My Flea Market. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  )
}
