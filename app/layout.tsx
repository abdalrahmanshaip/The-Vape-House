import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import './globals.css'
import Category from './components/Category'
import { Toaster } from 'sonner'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The vape house',
  description:
    'Welcome to The Vape House – your ultimate destination for all things vaping! Explore premium vape products, expert advice, and a vast selection of e-liquids in a welcoming atmosphere.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <Category />
        <Toaster />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  )
}
