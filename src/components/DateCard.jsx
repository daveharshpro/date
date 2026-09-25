import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Utensils, Music, Heart, RotateCcw, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/sound';

export const DateCard = ({ config, onReset }) => {
  const handleReplay = () => {
    playClickSound();
    onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-16 z-10 max-w-xl mx-auto text-center"
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-72 h-72 sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-tr from-rose-600/30 via-pink-600/20 to-purple-600/20 blur-3xl animate-ambient pointer-events-none -z-10" />

      {/* Romantic Date Ticket / Card */}
      <div className="w-full glass-card p-5 sm:p-10 rounded-3xl border border-rose-400/40 shadow-2xl space-y-6 sm:space-y-8 relative overflow-hidden">
        {/* Ticket Header Bar */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-rose-500/20">
          <div className="flex items-center gap-1.5 sm:gap-2 text-rose-200">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            <span className="font-semibold text-base sm:text-lg font-romantic">Official Ticket</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-[10px] sm:text-xs font-mono text-rose-200 uppercase tracking-widest">
            {config.coupleText || "You + Me"}
          </div>
        </div>

        {/* Big Header */}
        <div className="space-y-1.5 sm:space-y-2">
          <h2 className="text-clamp-heading font-extrabold font-romantic bg-gradient-to-r from-white via-rose-100 to-pink-200 bg-clip-text text-transparent text-glow">
            {config.dateCardTitle || "It's a date! ❤️"}
          </h2>
          <p className="text-xs sm:text-base text-rose-200/80">
            Your pass to an unforgettable experience.
          </p>
        </div>

        {/* Date Details List */}
        <div className="space-y-3.5 sm:space-y-4 text-left glass-panel p-4 sm:p-6 rounded-2xl border border-white/10">
          {/* Date */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-300 shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-rose-300/70 font-mono uppercase tracking-wider">
                Date & Time
              </div>
              <div className="text-sm sm:text-lg font-semibold text-white">
                {config.dateDateTime || "Coming soon..."}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-2.5 rounded-xl bg-pink-500/20 border border-pink-400/30 text-pink-300 shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-rose-300/70 font-mono uppercase tracking-wider">
                Location
              </div>
              <div className="text-sm sm:text-lg font-semibold text-white">
                {config.dateLocation || "Secret for now 👀"}
              </div>
            </div>
          </div>

          {/* Food */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 shrink-0">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-rose-300/70 font-mono uppercase tracking-wider">
                Food
              </div>
              <div className="text-sm sm:text-lg font-semibold text-white">
                {config.dateFood || "Definitely involved 🍕🍷"}
              </div>
            </div>
          </div>

          {/* Vibes */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-2.5 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300 shrink-0">
              <Music className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-rose-300/70 font-mono uppercase tracking-wider">
                Vibes
              </div>
              <div className="text-sm sm:text-lg font-semibold text-white">
                {config.dateVibes || "Immaculate ✨"}
              </div>
            </div>
          </div>
        </div>

        {/* Sweet Closing Text */}
        <p className="text-base sm:text-xl font-romantic text-rose-200/90 italic">
          "{config.finalMessage || "Can't wait to spend some time with you. ❤️"}"
        </p>

        {/* Replay Button */}
        <div className="pt-2">
          <button
            onClick={handleReplay}
            className="w-full min-h-[48px] py-3.5 sm:py-4 rounded-2xl glass-panel border border-rose-500/30 text-rose-200 font-semibold text-base sm:text-lg flex items-center justify-center gap-2 hover:border-rose-400 hover:text-white hover:bg-rose-500/20 transition-all duration-300 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Replay the whole thing ↻</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
