import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Unlock, Calendar, ArrowRight } from 'lucide-react';
import { playCelebrationSound, playClickSound } from '../utils/sound';

export const Celebration = ({ config, partnerName, myName, onViewDetails }) => {
  useEffect(() => {
    // Play audio fanfare
    playCelebrationSound();

    // Trigger rich multi-stage confetti
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    // Heart shapes confetti or colorful bursts
    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF7597', '#FF4D6D', '#FFB3C1', '#FBBF24', '#FFFFFF']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF7597', '#FF4D6D', '#FFB3C1', '#FBBF24', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Extra center fireworks burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#E11D48', '#FF7597', '#FBBF24', '#38BDF8']
      });
    }, 600);
  }, []);

  const handleSeeDetails = () => {
    playClickSound();
    onViewDetails();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-16 z-10 max-w-2xl mx-auto text-center"
    >
      {/* Glow Effect */}
      <div className="absolute w-72 h-72 sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-tr from-rose-500/30 via-pink-500/20 to-amber-500/20 blur-3xl animate-ambient pointer-events-none -z-10" />

      {/* Main Victory Card */}
      <div className="w-full glass-card p-6 sm:p-12 rounded-3xl border border-rose-400/40 shadow-2xl space-y-6 sm:space-y-8 relative overflow-hidden">
        {/* Shimmer Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

        {/* Floating Heart Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 border-2 border-rose-300 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(244,63,94,0.7)]"
        >
          <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-white fill-white animate-pulse" />
        </motion.div>

        {/* Texts */}
        <div className="space-y-3 sm:space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-clamp-title font-extrabold font-romantic bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow"
          >
            {config.celebrationTitle || "YAY! ❤️"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-2xl text-rose-200 font-light"
          >
            {config.celebrationSubtext || "I knew you'd say yes. 😌"}
          </motion.p>
        </div>

        {/* Personalized Names Display Box */}
        {partnerName && myName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm sm:text-base space-y-1"
          >
            <p className="font-semibold text-rose-300 font-romantic">
              It's officially a date! ❤️
            </p>
            <p className="text-xs sm:text-sm text-rose-200/90">
              I'll call you <span className="font-bold text-white px-1.5 py-0.5 rounded bg-rose-500/30 border border-rose-400/40">{partnerName}</span>
              ... and you'll call me <span className="font-bold text-white px-1.5 py-0.5 rounded bg-pink-500/30 border border-pink-400/40">{myName}</span> 😌
            </p>
          </motion.div>
        )}

        {/* Unlocked Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-semibold text-sm sm:text-lg shadow-[0_0_20px_rgba(52,211,153,0.2)]"
        >
          <Unlock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 animate-bounce" />
          <span>{config.celebrationBadge || "Date officially unlocked 🔓❤️"}</span>
        </motion.div>

        {/* View Details Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="pt-2 sm:pt-4"
        >
          <button
            onClick={handleSeeDetails}
            className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl glass-button text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-3 mx-auto hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-2xl"
          >
            <Calendar className="w-5 h-5" />
            <span>See Date Details 🎟️</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
