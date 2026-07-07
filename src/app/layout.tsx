import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Council of Indifference',
  description: 'Sei personaggi tragicomici analizzano la tua realtà. Nessuno è ottimista. Sono tutti dannatamente divertenti.',
  openGraph: {
    title: 'Council of Indifference',
    description: 'L\'unica assemblea che non si preoccupa di niente. E te lo dice in faccia.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="crt antialiased">{children}</body>
    </html>
  )
}
