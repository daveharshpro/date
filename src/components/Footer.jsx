import React from 'react';
import { Heart, Terminal, Code2 } from 'lucide-react';
import { playClickSound } from '../utils/sound';

export const Footer = ({ config, onOpenTerminal }) => {
  return (
    <footer className="w-full pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] px-4 border-t border-rose-500/10 text-center text-xs text-rose-300/60 space-y-2.5 z-10 relative">
      <div className="flex items-center justify-center gap-1.5 font-mono text-[11px] sm:text-xs">
        <Code2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
        <span>{config.footerCredit || "Built with ❤️, JavaScript & questionable confidence."}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
        <span className="text-rose-300/50">
          {config.notFoundJoke || "404: Girlfriend not found. Just kidding. She's right here. ❤️"}
        </span>

        <button
          onClick={() => {
            playClickSound();
            onOpenTerminal();
          }}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-200 transition-colors font-mono underline decoration-rose-500/40 cursor-pointer px-2"
        >
          <Terminal className="w-3 h-3" />
          <span>Open Terminal Easter Egg</span>
        </button>
      </div>
    </footer>
  );
};
