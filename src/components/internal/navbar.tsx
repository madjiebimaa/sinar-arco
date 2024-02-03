'use client';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useIsSidebarOpen, useLayoutActions } from '@/store/layout';

export default function Navbar() {
  const isSidebarOpen = useIsSidebarOpen();
  const layoutActions = useLayoutActions();

  const SidebarIcon = isSidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <nav className="flex items-center justify-between p-4 border-b shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'shrink-0 h-fit w-fit p-2 transition-all duration-300',
          isSidebarOpen && 'opacity-0 invisible'
        )}
        onClick={() => layoutActions.toggleSidebar()}
      >
        <SidebarIcon className="shrink-0 h-6 w-6 text-slate-400" />
      </Button>
    </nav>
  );
}
