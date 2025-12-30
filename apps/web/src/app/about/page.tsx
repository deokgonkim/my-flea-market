import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="rounded-full">
              ← Back to inventory
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to My Flea Market
        </h1>
        <p className="text-center text-lg mb-8">
          A modern marketplace built with Next.js and TypeScript
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Frontend 🎨</h2>
            <p className="text-sm">
              Built with Next.js 14, React 18, and Tailwind CSS for a modern, responsive UI.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Backend ⚡</h2>
            <p className="text-sm">
              Powered by TypeScript Lambda functions for serverless, scalable API endpoints.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/item/example-item" className="text-blue-500 hover:underline text-xl">
            View an Example Item Page
          </Link>
        </div>
      </div>
      <footer className="mt-20 w-full border-t bg-background/50 px-6 py-10 text-center text-sm text-muted-foreground">
        <p className="mb-4">
          <Link href="/about" className="underline hover:text-foreground">About</Link>
        </p>
        <p className="mb-2">
          &copy; {new Date().getFullYear()} My Flea Market. All rights reserved.
        </p>
      </footer>
    </main>
  )
}