'use client';

import { cn } from '@/lib/utils';
import { useIsSidebarOpen, useLayoutActions } from '@/store/layout';

export default function Overlay() {
  const isSidebarOpen = useIsSidebarOpen();
  const layoutActions = useLayoutActions();

  return (
    <div
      className={cn(
        'absolute top-0 left-0 z-10 h-screen w-screen bg-black/50 opacity-0 invisible transition-all duration-300',
        isSidebarOpen && 'opacity-100 md:opacity-0 visible md:invisible'
      )}
      onClick={() => layoutActions.toggleSidebar()}
    />
  );
}
