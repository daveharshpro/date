import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, UserCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { playClickSound, playPingSound } from '../utils/sound';

export const NamePersonalization = ({ config, onSubmit }) => {
  const [partnerName, setPartnerName] = useState('');
  const [myName, setMyName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanPartner = partnerName.trim();
    const cleanMy = myName.trim();

    if (!cleanPartner || !cleanMy) {
      playPingSound();
      setErrorMsg("Please enter both names first.");
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);
    playClickSound();

    onSubmit({
      partnerName: cleanPartner.slice(0, 40),
      myName: cleanMy.slice(0, 40)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-16 z-10 max-w-xl mx-auto text-center"
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-72 h-72 sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-tr from-rose-600/30 via-pink-600/20 to-purple-600/20 blur-3xl animate-ambient pointer-events-none -z-10" />

      {/* Main Glass Card */}
      <div className="w-full glass-card p-6 sm:p-10 rounded-3xl border border-rose-500/30 shadow-2xl space-y-6 relative overflow-hidden text-left">
        {/* Shimmer line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent" />

        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>One Quick Detail</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-romantic text-white text-glow">
            Before We Begin...
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/80">
            Let's make it special for us.
          </p>
        </div>

        {/* Name Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Question 1 */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-semibold text-rose-100 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
              <span>What should I call you on our date?</span>
            </label>
            <input
              type="text"
              maxLength={40}
              value={partnerName}
              onChange={(e) => {
                setPartnerName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Nickname you want me to call you..."
              className="w-full px-4 py-3.5 rounded-2xl glass-panel border border-rose-500/30 text-white placeholder-rose-300/40 text-base focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30 transition-all"
            />
          </div>

          {/* Question 2 */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-semibold text-rose-100 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>And what will you call me?</span>
            </label>
            <input
              type="text"
              maxLength={40}
              value={myName}
              onChange={(e) => {
                setMyName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Nickname that you'll call me..."
              className="w-full px-4 py-3.5 rounded-2xl glass-panel border border-rose-500/30 text-white placeholder-rose-300/40 text-base focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30 transition-all"
            />
          </div>

          {/* Gentle Error Validation Notice */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs sm:text-sm flex items-center justify-center gap-2 font-medium text-center"
              >
                <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] px-6 py-4 rounded-2xl glass-button text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
            >
              <span>Continue to Date Details</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
