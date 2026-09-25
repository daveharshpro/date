import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { playClickSound } from '../utils/sound';

export const Welcome = ({ config, onNext }) => {
  const handleOpen = () => {
    playClickSound();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-16 text-center relative z-10"
    >
      {/* Decorative Glow Circle */}
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-rose-600/20 via-pink-500/20 to-purple-600/10 blur-3xl animate-ambient pointer-events-none -z-10" />

      {/* Romantic Greeting Container */}
      <div className="max-w-md w-full space-y-6 sm:space-y-8 glass-card p-6 sm:p-10 rounded-3xl border border-pink-500/20 shadow-2xl relative overflow-hidden">
        {/* Shimmer line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-60" />

        {/* Floating Heart Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium tracking-wider uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 animate-spin-slow" />
          <span>A Surprise Awaits</span>
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400 fill-rose-400" />
        </motion.div>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="text-clamp-title font-extrabold tracking-tight font-romantic bg-gradient-to-r from-white via-rose-100 to-pink-200 bg-clip-text text-transparent text-glow">
            {config.welcomeTitle || 'Hey ❤️'}
          </h1>

          <p className="text-clamp-body text-rose-200/90 font-light leading-relaxed">
            {config.openingMessage || 'I made something for you...'}
          </p>
        </motion.div>

        {/* Envelope / Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pt-2 sm:pt-4"
        >
          <button
            onClick={handleOpen}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-2xl glass-button text-white font-semibold text-base sm:text-xl flex items-center justify-center gap-3 mx-auto transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group cursor-pointer"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-rose-200 group-hover:scale-110 transition-transform duration-300" />
            <span>{config.openButtonText || 'Open it 💌'}</span>
          </button>
        </motion.div>

        {/* Cute Developer Hint Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-[11px] sm:text-xs text-rose-300/60 font-mono tracking-wide pt-1"
        >
          // Crafted with line-by-line affection
        </motion.p>
      </div>
    </motion.div>
  );
};
