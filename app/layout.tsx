import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ayron Rivero - Portfólio',
  description: 'Meu portfólio pessoal, onde compartilho meus projetos e experiências.',
  generator: 'Ayron Rivero',
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
