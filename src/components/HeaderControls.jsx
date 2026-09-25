import React from 'react';
import { Volume2, VolumeX, Terminal, Heart } from 'lucide-react';
import { getSoundMuted, setSoundMuted, playClickSound } from '../utils/sound';

export const HeaderControls = ({
  currentScreen,
  totalScreens = 5,
  isMuted,
  setIsMuted,
  onOpenTerminal
}) => {
  const toggleMute = () => {
    const nextState = !isMuted;
    setSoundMuted(nextState);
    setIsMuted(nextState);
    if (!nextState) playClickSound();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 py-3 sm:px-8 sm:py-4 flex items-center justify-between pointer-events-none pt-[calc(0.75rem+env(safe-area-inset-top))]">
      {/* Left: Romantic Logo / Brand */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full glass-panel border border-rose-500/20 text-xs sm:text-sm text-rose-200">
        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500 animate-pulse" />
        <span className="font-semibold tracking-wide bg-gradient-to-r from-rose-200 to-pink-300 bg-clip-text text-transparent">
          Date.exe
        </span>
      </div>

      {/* Middle: Step Dots Indicator (Compact on mobile) */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full glass-panel border border-white/10">
        {Array.from({ length: totalScreens }).map((_, idx) => {
          const isActive = idx === currentScreen;
          const isPassed = idx < currentScreen;
          return (
            <div
              key={idx}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                isActive
                  ? 'w-4 sm:w-6 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                  : isPassed
                  ? 'w-1.5 sm:w-2 bg-rose-300/60'
                  : 'w-1.5 sm:w-2 bg-white/20'
              }`}
            />
          );
        })}
      </div>

      {/* Right Controls: Sound Toggle & Terminal Easter Egg */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-3">
        {/* Terminal Easter Egg Toggle */}
        <button
          onClick={() => {
            playClickSound();
            onOpenTerminal();
          }}
          className="min-w-[44px] min-h-[44px] p-2 rounded-full glass-panel border border-rose-500/30 text-rose-200 hover:text-white hover:border-rose-400 hover:bg-rose-500/20 transition-all duration-300 flex items-center justify-center relative group"
          title="Developer Terminal (~)"
          aria-label="Open developer terminal easter egg"
        >
          <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-rose-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Terminal
          </span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleMute}
          className={`min-w-[44px] min-h-[44px] p-2 rounded-full glass-panel border transition-all duration-300 flex items-center justify-center relative group ${
            isMuted
              ? 'border-white/20 text-gray-400 hover:text-white'
              : 'border-rose-500/40 text-rose-300 hover:text-rose-100 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
          }`}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
          )}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-rose-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {isMuted ? 'Muted' : 'Sound On'}
          </span>
        </button>
      </div>
    </header>
  );
};
