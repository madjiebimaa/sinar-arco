'use client';

import { LogOut, PanelLeftClose } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { logout } from '@/actions/auth';
import { cn } from '@/lib/utils';
import { useIsSidebarOpen, useLayoutActions } from '@/store/layout';

export default function Sidebar() {
  const isSidebarOpen = useIsSidebarOpen();
  const layoutActions = useLayoutActions();

  return (
    <aside
      className={cn(
        'shrink-0 z-20 flex flex-col fixed md:static h-screen w-[260px] max-w-[260px] bg-white border-r border-r-slate-100 transition-all duration-300',
        !isSidebarOpen && '-ml-[260px]'
      )}
    >
      <div className="flex items-center gap-2 p-4 border-b border-b-slate-200 bg-slate-100">
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 h-fit w-fit p-2"
          onClick={() => layoutActions.toggleSidebar()}
        >
          <PanelLeftClose className="shrink-0 h-6 w-6 text-slate-400" />
        </Button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mt-auto">
          <form action={logout}>
            <Button type="submit" variant="ghost" className="shrink-0 w-full">
              <LogOut className="shrink-0 h-4 w-4 mr-2 text-slate-400" />
              <span className="text-slate-400">Sign out</span>
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
