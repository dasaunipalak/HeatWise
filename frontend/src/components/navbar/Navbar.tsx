'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Flame } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const [isDark, setIsDark] = useState(false);

useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  const shouldUseDark =
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

  setIsDark(shouldUseDark);
  document.documentElement.classList.toggle('dark', shouldUseDark);
}, []);

const toggleTheme = () => {
  const nextIsDark = !isDark;

  setIsDark(nextIsDark);
  localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', nextIsDark);
};
  
  return (
    <header className="fixed top-0 left-0 right-0 h-[49px] bg-[#222732] border-b border-[#2D333E] flex items-center justify-between px-4 z-50 text-slate-200 shadow-md select-none">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[15px] text-white hover:opacity-90 transition-opacity">
          <div className="w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-br from-orange-400 to-[#F05A28] shadow-[0_2px_8px_rgba(240,90,40,0.4)]">
            <Flame size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="tracking-wide">HeatWise</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
  <button
    type="button"
    onClick={toggleTheme}
    aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    className="rounded-md p-2 text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
  >
    {isDark ? <Sun size={18} /> : <Moon size={18} />}
  </button>
</div>
    </header>
  );
}
