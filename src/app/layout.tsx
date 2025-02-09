'use client';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'A/B Test Dashboard',
  description: 'A NextJS app for managing A/B tests',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const GTM_ID = 'GTM-W6VFGK97';
    if (
      typeof window !== 'undefined' &&
      !document.getElementById('gtm-script')
    ) {
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'gtm.js',
        'gtm.start': new Date().getTime(),
      });
    }
  }, []);

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <NavBar />
        <main className='container mx-auto p-6'>{children}</main>
      </body>
    </html>
  );
}
