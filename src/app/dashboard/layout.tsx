import React from 'react';

import Navbar from '@/components/internal/navbar';
import Overlay from '@/components/internal/overlay';
import Sidebar from '@/components/internal/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <section className="flex flex-1 flex-col bg-slate-100 overflow-x-hidden">
        <Navbar />
        {children}

        <Overlay />
      </section>
    </div>
  );
}
