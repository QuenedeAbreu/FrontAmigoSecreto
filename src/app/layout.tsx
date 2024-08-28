import type { Metadata } from 'next'

import './globals.css'
import 'primeicons/primeicons.css'
import { GlobalContextProvider } from '@/provider/globlalProvider'
export const runtime = 'edge';
export const metadata: Metadata = {
  title: 'Amigo Secreto',
  description: '',
}

export default function RootLayout({ children, }: {
  children: React.ReactNode
}) {
  return (
    <GlobalContextProvider>
      <html lang="pt-BR"  >
        <body className="bg-gray-950 text-gray-100">{children}</body>
      </html>
    </GlobalContextProvider>
  )
}
