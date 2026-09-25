import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailCheck, MailX, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

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
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 max-w-xs sm:max-w-sm pointer-events-auto"
      >
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl shadow-2xl border transition-all ${
            status === 'sending'
              ? 'bg-rose-950/80 border-rose-500/40 text-rose-100 shadow-rose-900/30'
              : status === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-100 shadow-emerald-900/40'
              : 'bg-rose-950/90 border-rose-500/60 text-rose-200 shadow-rose-950/50'
          }`}
        >
          {/* Status Icon */}
          <div className="shrink-0 flex items-center justify-center">
            {status === 'sending' && (
              <Loader2 className="w-5 h-5 text-rose-400 animate-spin" />
            )}
            {status === 'success' && (
              <div className="relative flex items-center justify-center">
                <MailCheck className="w-5 h-5 text-emerald-400 animate-bounce" />
                <CheckCircle2 className="w-3 h-3 text-emerald-300 absolute -bottom-1 -right-1" />
              </div>
            )}
            {status === 'error' && (
              <div className="relative flex items-center justify-center">
                <MailX className="w-5 h-5 text-rose-400" />
                <AlertCircle className="w-3 h-3 text-rose-300 absolute -bottom-1 -right-1" />
              </div>
            )}
          </div>

          {/* Text Message */}
          <div className="flex-1 text-xs sm:text-sm font-medium">
            {status === 'sending' && (
              <span>Sending notification email...</span>
            )}
            {status === 'success' && (
              <span>Notification email sent successfully! ✉️❤️</span>
            )}
            {status === 'error' && (
              <span>Email notification failed to send</span>
            )}
          </div>

          {/* 5-Second Animated Dismiss Bar */}
          {(status === 'success' || status === 'error') && (
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: 'linear' }}
              className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full origin-left ${
                status === 'success' ? 'bg-emerald-400/70' : 'bg-rose-400/70'
              }`}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
