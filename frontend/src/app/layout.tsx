import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'HeatWise AI - Urban Heat Mitigation Platform',
  description: 'AI-powered Urban Heat Mitigation Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-50 overflow-hidden h-screen w-screen flex flex-col`}>
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
