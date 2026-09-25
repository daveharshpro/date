import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { dateConfig } from './config/dateConfig';

import { FloatingHearts } from './components/FloatingHearts';
import { HeaderControls } from './components/HeaderControls';
import { Welcome } from './components/Welcome';
import { DeveloperIntro } from './components/DeveloperIntro';
import { BuildSequence } from './components/BuildSequence';
import { Reasons } from './components/Reasons';
import { DateProposal } from './components/DateProposal';
import { Celebration } from './components/Celebration';
import { DateCard } from './components/DateCard';
import { TerminalModal } from './components/TerminalModal';
import { Footer } from './components/Footer';
import { getSoundMuted } from './utils/sound';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isMuted, setIsMuted] = useState(getSoundMuted());
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Keyboard shortcut for Terminal Easter Egg (Press ~ key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextScreen = () => setCurrentScreen((prev) => prev + 1);
  const resetScreens = () => setCurrentScreen(0);

  return (
    <div className="min-h-screen bg-[#12030A] text-rose-50 flex flex-col justify-between relative overflow-x-hidden">
      {/* Dynamic Background Floating Hearts Canvas */}
      <FloatingHearts intensity={currentScreen === 5 ? 'high' : 'normal'} />

      {/* Header Controls (Sound & Terminal) */}
      <HeaderControls
        currentScreen={currentScreen}
        totalScreens={6}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Screen Transition Container */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {currentScreen === 0 && (
            <Welcome key="welcome" config={dateConfig} onNext={nextScreen} />
          )}

          {currentScreen === 1 && (
            <DeveloperIntro key="intro" config={dateConfig} onNext={nextScreen} />
          )}

          {currentScreen === 2 && (
            <BuildSequence key="build" config={dateConfig} onNext={nextScreen} />
          )}

          {currentScreen === 3 && (
            <Reasons key="reasons" config={dateConfig} onNext={nextScreen} />
          )}

          {currentScreen === 4 && (
            <DateProposal
              key="proposal"
              config={dateConfig}
              onYes={() => setCurrentScreen(5)}
            />
          )}

          {currentScreen === 5 && (
            <Celebration
              key="celebration"
              config={dateConfig}
              onViewDetails={() => setCurrentScreen(6)}
            />
          )}

          {currentScreen === 6 && (
            <DateCard key="card" config={dateConfig} onReset={resetScreens} />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        config={dateConfig}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Developer Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
