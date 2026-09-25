import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import { playClickSound, playDodgeSound } from '../utils/sound';

export const DateProposal = ({ config, onYes }) => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const containerRef = useRef(null);

  const phrases = config.noButtonPhrases || [
    "Are you sure? 🥺",
    "Really sure? 😭",
    "Think again... 👀",
    "Wait, look at the YES button! 💖",
    "Nice try! 💨",
    "Error 404: 'No' unavailable! 😂"
  ];

  const getNoButtonText = () => {
    if (noCount === 0) return config.noButtonText || "NO 🙈";
    const idx = Math.min(noCount - 1, phrases.length - 1);
    return phrases[idx];
  };

  // Move button to a safe random position within container bounds
  const moveNoButton = () => {
    playDodgeSound();
    setIsDodging(true);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 640;

      // Safe boundaries inside container depending on screen size
      const maxOffsetHorizontal = isMobile ? Math.min((rect.width / 2) - 70, 90) : (rect.width / 2) - 90;
      const maxOffsetVertical = isMobile ? 65 : 110;

      const randomX = Math.floor((Math.random() * 2 - 1) * maxOffsetHorizontal);
      const randomY = Math.floor((Math.random() * 2 - 1) * maxOffsetVertical);

      setNoPosition({ x: randomX, y: randomY });
    } else {
      // Fallback relative move
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 100;
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  const handleNoClick = (e) => {
    e?.preventDefault();
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 3) {
      moveNoButton();
    } else {
      playDodgeSound();
    }
  };

  const handleNoHoverOrTouch = (e) => {
    if (noCount >= 3) {
      e?.preventDefault();
      moveNoButton();
    }
  };

  const handleYes = () => {
    playClickSound();
    onYes();
  };

  // Calculate scaling for YES button as user tries NO (slightly dampened on mobile to fit nicely)
  const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 640;
  const yesScale = Math.min(1 + noCount * (isMobileScreen ? 0.08 : 0.12), isMobileScreen ? 1.35 : 1.6);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-16 z-10 max-w-3xl mx-auto text-center"
      ref={containerRef}
    >
      {/* Background Romantic Ambient Glow */}
      <div className="absolute w-72 h-72 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-r from-rose-600/30 via-pink-600/20 to-purple-600/20 blur-3xl animate-ambient pointer-events-none -z-10" />

      {/* Main Proposal Card */}
      <div className="w-full glass-card p-5 sm:p-10 md:p-14 rounded-3xl border border-rose-500/30 shadow-2xl relative space-y-6 sm:space-y-8 overflow-hidden">
        {/* Shimmer line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent" />

        {/* Lead-in Lines */}
        <div className="space-y-2 sm:space-y-3">
          {(config.proposalLeadIn || [
            "Okay...",
            "I've spent enough time writing code.",
            "Here's the real question."
          ]).map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.4, duration: 0.5 }}
              className="text-sm sm:text-xl text-rose-200/90 font-light"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Big Romantic Question */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="pt-2 sm:pt-4 pb-1 sm:pb-2 space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-spin-slow" />
            <span>The Moment of Truth</span>
          </div>

          <h1 className="text-clamp-title font-extrabold font-romantic leading-tight bg-gradient-to-r from-white via-rose-100 to-pink-200 bg-clip-text text-transparent text-glow">
            {config.dateQuestion || "Will you go on a date with me? ❤️"}
          </h1>
        </motion.div>

        {/* Action Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="pt-4 sm:pt-6 pb-2 sm:pb-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 min-h-[150px] relative"
        >
          {/* YES BUTTON (Grows as NO is attempted) */}
          <motion.button
            onClick={handleYes}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.04 }}
            whileTap={{ scale: yesScale * 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="z-20 min-h-[48px] px-8 py-3.5 sm:px-10 sm:py-5 rounded-2xl glass-button text-white font-bold text-lg sm:text-2xl flex items-center gap-2.5 sm:gap-3 shadow-[0_0_30px_rgba(244,63,94,0.6)] cursor-pointer hover:shadow-[0_0_40px_rgba(244,63,94,0.9)]"
          >
            <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-white fill-white animate-pulse" />
            <span>{config.yesButtonText || "YES ❤️"}</span>
          </motion.button>

          {/* NO BUTTON (Runaway logic with pointer/touch support) */}
          <motion.button
            onClick={handleNoClick}
            onPointerEnter={handleNoHoverOrTouch}
            onTouchStart={handleNoHoverOrTouch}
            animate={{
              x: noPosition.x,
              y: noPosition.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
            className={`min-h-[44px] px-6 py-3 sm:px-8 sm:py-4 rounded-2xl glass-panel border border-white/20 text-rose-200/90 font-semibold text-base sm:text-lg hover:border-rose-400/40 hover:text-white transition-colors duration-200 cursor-pointer select-none ${
              isDodging ? 'z-30 shadow-2xl' : 'z-10'
            }`}
          >
            <span>{getNoButtonText()}</span>
          </motion.button>
        </motion.div>

        {/* Accessible Helper / Hint for persistent NO attempts */}
        {noCount >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-2 text-xs text-rose-300/80 flex items-center justify-center gap-1.5"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Psst... Notice how big the YES button is getting? 😉</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
