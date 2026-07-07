import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Council of Indifference',
  description: 'Six tragicomic personas analyze your reality. None are optimistic. All of them are damn funny.',
  openGraph: {
    title: 'Council of Indifference',
    description: 'The only assembly that doesn\'t care about anything. And it tells you to your face.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="crt antialiased">{children}</body>
    </html>
  )
}
