import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/app/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PromptForge - Interactive AI Training Platform',
  description: 'Learn prompt engineering through hands-on challenges, real-time feedback, and beautiful visualizations',
  keywords: ['AI', 'prompt engineering', 'training', 'interactive learning', 'GPT', 'LLM'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
