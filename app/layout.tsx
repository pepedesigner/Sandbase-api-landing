import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

import { themeInitScript } from '@/components/theme-toggle'
import { TOTAL_ENDPOINTS } from '@/lib/vendors'

import './globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const nf = new Intl.NumberFormat('en-US')

export const metadata: Metadata = {
  title: `SandBase APIs — ${nf.format(TOTAL_ENDPOINTS)} real-world APIs, one key`,
  description:
    'Call social, search, scraping, data and SaaS APIs from your product or your agent. Every endpoint shows its price next to a working request.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Light is the default, matching sandbase.ai. The inline script below
    // rewrites this before paint if the visitor chose dark.
    <html lang='en' data-theme='light' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/*
          Clash Grotesk is self-hosted from /public (see globals.css), matching
          the live site. Only JetBrains Mono comes from Google Fonts here, so
          preconnect just that origin.
        */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap'
        />
        <link
          rel='preload'
          href='/fonts/ClashGrotesk-Variable.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </head>
      <body className={jetbrains.variable}>{children}</body>
    </html>
  )
}
