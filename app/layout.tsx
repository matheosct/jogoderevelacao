import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Jogo de Revelação – Descubra Imagens Peça por Peça',
    template: '%s | Jogo de Revelação',
  },
  description:
    'Jogo de Revelação: envie suas fotos e descubra-as peça por peça! Cada clique revela uma parte aleatória da imagem. Divertido, gratuito e sem cadastro. — Revelation Game: upload your photos and uncover them piece by piece!',
  keywords: [
    'jogo de revelação',
    'revelar imagem',
    'jogo de descoberta de fotos',
    'revelar foto por partes',
    'quebra-cabeça de imagem',
    'jogo online grátis',
    'jogo de adivinhação de imagem',
    'revelation game',
    'image reveal game',
    'photo reveal puzzle',
    'picture discovery game',
    'online puzzle game free',
  ],
  authors: [{ name: 'Jogo de Revelação' }],
  creator: 'Jogo de Revelação',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    title: 'Jogo de Revelação – Descubra Imagens Peça por Peça',
    description:
      'Envie suas fotos e descubra-as peça por peça! Cada clique revela uma parte aleatória da imagem. Gratuito, rápido e sem cadastro.',
    siteName: 'Jogo de Revelação',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogo de Revelação – Descubra Imagens Peça por Peça',
    description:
      'Envie suas fotos e descubra-as peça por peça! Gratuito, rápido e sem cadastro.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8086241362765434"
     crossorigin="anonymous"></script></head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
