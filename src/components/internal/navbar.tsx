import { Menu } from 'lucide-react';

import { singleDay } from '@/app/fonts';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b shadow-sm">
      <div className="shrink-0 grid place-content-center h-8 w-8 bg-gray-200 rounded-full">
        <h1 className={`${singleDay.className} font-semibold text-slate-900`}>
          SA
        </h1>
      </div>
      <Button
        variant="ghost"
        className="shrink-0 h-auto w-auto p-2 rounded-full"
      >
        <Menu className="shrink-0 h-6 w-6 text-slate-400" />
      </Button>
    </nav>
  );
}
