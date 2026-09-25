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
import { NamePersonalization } from './components/NamePersonalization';
import { Celebration } from './components/Celebration';
import { DateCard } from './components/DateCard';
import { TerminalModal } from './components/TerminalModal';
import { Footer } from './components/Footer';
import { EmailStatusToast } from './components/EmailStatusToast';
import { getSoundMuted } from './utils/sound';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isMuted, setIsMuted] = useState(getSoundMuted());
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [myName, setMyName] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);

  // Always reset window scroll to top when changing screens (fixes Part 1 & Part 2 scroll alignment)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentScreen]);

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

  const resetScreens = () => {
    setPartnerName('');
    setMyName('');
    setEmailStatus(null);
    setCurrentScreen(0);
  };

  // Trigger serverless email notification in background
  const sendEmailNotification = async (partner, me) => {
    setEmailStatus('sending');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partnerName: partner, myName: me })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setEmailStatus('success');
      } else {
        setEmailStatus('error');
      }
    } catch (err) {
      console.error('[Client] Email notification error:', err);
      setEmailStatus('error');
    }
  };

  const handleNamesSubmitted = ({ partnerName: partner, myName: me }) => {
    setPartnerName(partner);
    setMyName(me);
    sendEmailNotification(partner, me);
    setCurrentScreen(6); // Move to Celebration screen
  };

  return (
    <div className="min-h-screen bg-[#12030A] text-rose-50 flex flex-col justify-between relative overflow-x-hidden">
      {/* Email Status Toast Notification */}
      <EmailStatusToast
        status={emailStatus}
        onDismiss={() => setEmailStatus(null)}
      />

      {/* Dynamic Background Floating Hearts Canvas */}
      <FloatingHearts intensity={currentScreen === 6 ? 'high' : 'normal'} />

      {/* Header Controls (Sound & Terminal) */}
      <HeaderControls
        currentScreen={currentScreen}
        totalScreens={7}
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
            <NamePersonalization
              key="names"
              config={dateConfig}
              onSubmit={handleNamesSubmitted}
            />
          )}

          {currentScreen === 6 && (
            <Celebration
              key="celebration"
              config={dateConfig}
              partnerName={partnerName}
              myName={myName}
              onViewDetails={() => setCurrentScreen(7)}
            />
          )}

          {currentScreen === 7 && (
            <DateCard
              key="card"
              config={dateConfig}
              partnerName={partnerName}
              myName={myName}
              onReset={resetScreens}
            />
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
