import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SMS Debt Bot',
  description: 'Una aplicación para enviar mensajes de texto a deudores, usando la API de Twilio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen`}>{children}</body>
    </html>
  )
}
