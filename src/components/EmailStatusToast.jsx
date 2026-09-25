import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailCheck, MailX, Sparkles, Check, AlertCircle } from 'lucide-react';

export const EmailStatusToast = ({ status, onDismiss }) => {
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        if (onDismiss) onDismiss();
      }, 5000); // Vanishes after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [status, onDismiss]);

  if (!status) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.3, y: -20 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 pointer-events-none"
      >
        <div className="relative group flex items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-black/75 backdrop-blur-2xl border border-rose-500/40 shadow-[0_0_25px_rgba(255,77,109,0.35)] overflow-visible">
          {/* Ambient Glowing Background Light */}
          <div
            className={`absolute inset-0 rounded-2xl blur-md transition-all duration-500 -z-10 ${
              status === 'success'
                ? 'bg-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                : status === 'error'
                ? 'bg-rose-600/40 shadow-[0_0_30px_rgba(225,29,72,0.4)]'
                : 'bg-rose-500/30 animate-pulse'
            }`}
          />

          {/* 1. SENDING ANIMATION */}
          {status === 'sending' && (
            <div className="relative flex items-center justify-center p-1">
              <motion.div
                animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="text-rose-300"
              >
                <Mail className="w-6 h-6 text-rose-400" />
              </motion.div>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1.5 -right-1.5 animate-spin-slow" />
            </div>
          )}

          {/* 2. SUCCESS ANIMATION */}
          {status === 'success' && (
            <div className="relative flex items-center justify-center p-1">
              <motion.div
                initial={{ scale: 0.4 }}
                animate={{ scale: [0.4, 1.3, 1] }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 400 }}
                className="relative flex items-center justify-center"
              >
                <MailCheck className="w-6.5 h-6.5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

                {/* Corner Checkmark Badge */}
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-black flex items-center justify-center border border-black shadow">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </motion.div>

              {/* Animated Floating Heart Burst */}
              <motion.span
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], y: [-4, -22], scale: [0.5, 1.3, 0.8] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.4 }}
                className="absolute -top-3 text-rose-400 pointer-events-none text-xs"
              >
                ❤️
              </motion.span>
            </div>
          )}

          {/* 3. ERROR ANIMATION */}
          {status === 'error' && (
            <motion.div
              animate={{ x: [-4, 4, -4, 4, 0] }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center p-1"
            >
              <MailX className="w-6 h-6 text-rose-400" />
              <AlertCircle className="w-3 h-3 text-amber-400 absolute -bottom-1 -right-1" />
            </motion.div>
          )}

          {/* 5-Second Circular Progress Border Indicator */}
          {(status === 'success' || status === 'error') && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 5, ease: 'easeIn' }}
              className="absolute -bottom-1 left-2 right-2 h-[2px] bg-gradient-to-r from-emerald-400 via-rose-400 to-amber-300 rounded-full"
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
