import type { Metadata } from 'next';

import Navbar from '@/components/internal/navbar';
import { Toaster } from '@/components/ui/toaster';

import { inter } from './fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Sinar Arco',
  description: `
    Discover unparalleled construction solutions at Sinar Arco, your premier material store nestled in the heart of Arco.
    Explore a vast selection of top-quality construction materials, vibrant paints, and reliable plumbing essentials. 
    Elevate your projects with our extensive range, guided by the latest industry trends. 
    Your one-stop destination for all things construction – Sinar Arco, where excellence meets expertise. 
    Unlock the power of precision with our comprehensive business data and user-friendly dashboard, providing you with insights to fuel your success.
  `,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
