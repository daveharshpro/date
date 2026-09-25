import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, Rocket, Loader2, Sparkles } from 'lucide-react';
import { playPingSound } from '../utils/sound';

export const BuildSequence = ({ config, onNext }) => {
  const steps = config.buildSteps || [
    { text: "Initializing Date.exe...", icon: "Terminal" },
    { text: "Finding perfect person...", success: true, detail: "Person found: YOU" },
    { text: "Checking compatibility...", success: true, detail: "100% Match!" },
    { text: "Preparing courage...", progress: 87 },
    { text: "Generating confidence...", progress: 100 },
    { text: "Deploying question...", icon: "Rocket" }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [courageProgress, setCourageProgress] = useState(0);
  const [confidenceProgress, setConfidenceProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Step advancement timer sequence
    const timers = [];

    // Step 0: Initializing
    timers.push(
      setTimeout(() => {
        setCurrentStepIndex(1);
        playPingSound();
      }, 1000)
    );

    // Step 1: Finding person
    timers.push(
      setTimeout(() => {
        setCurrentStepIndex(2);
        playPingSound();
      }, 2200)
    );

    // Step 2: Compatibility check
    timers.push(
      setTimeout(() => {
        setCurrentStepIndex(3);
        // Start courage progress bar
        let p = 0;
        const courageInterval = setInterval(() => {
          p += 5;
          if (p >= 87) {
            setCourageProgress(87);
            clearInterval(courageInterval);
          } else {
            setCourageProgress(p);
          }
        }, 30);
      }, 3400)
    );

    // Step 3: Preparing courage -> Step 4
    timers.push(
      setTimeout(() => {
        setCurrentStepIndex(4);
        let p = 0;
        const confidenceInterval = setInterval(() => {
          p += 5;
          if (p >= 100) {
            setConfidenceProgress(100);
            clearInterval(confidenceInterval);
          } else {
            setConfidenceProgress(p);
          }
        }, 25);
      }, 4800)
    );

    // Step 4: Generating confidence -> Step 5: Deploying
    timers.push(
      setTimeout(() => {
        setCurrentStepIndex(5);
        playPingSound();
      }, 6000)
    );

    // Done signal & auto proceed
    timers.push(
      setTimeout(() => {
        setIsDone(true);
      }, 7200)
    );

    timers.push(
      setTimeout(() => {
        onNext();
      }, 8800)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-16 z-10 max-w-xl mx-auto text-center"
    >
      <div className="w-full glass-card p-5 sm:p-8 rounded-3xl border border-rose-500/30 shadow-2xl space-y-5 sm:space-y-6">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-rose-500/20">
          <div className="flex items-center gap-2 text-rose-300 font-mono text-[11px] sm:text-sm">
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 animate-pulse" />
            <span>Deployment Console v2.0</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-200 border border-rose-500/30">
            BUILD_IN_PROGRESS
          </span>
        </div>

        {/* Build Logs Container */}
        <div className="space-y-3.5 sm:space-y-4 text-left font-mono text-xs sm:text-sm text-pink-100 min-h-[240px] sm:min-h-[260px] flex flex-col justify-center">
          {steps.map((step, idx) => {
            const isVisible = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex && !isDone;

            if (!isVisible) return null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {step.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-rose-400 animate-spin shrink-0" />
                    ) : idx < currentStepIndex ? (
                      <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : (
                      <Rocket className="w-4 h-4 text-pink-400 shrink-0" />
                    )}
                    <span className="text-rose-100 font-medium text-[11px] sm:text-sm leading-tight break-words">
                      {step.text}
                    </span>
                  </div>

                  {step.progress !== undefined && (
                    <span className="text-rose-300 font-semibold text-xs sm:text-sm shrink-0">
                      {idx === 3 ? courageProgress : confidenceProgress}%
                    </span>
                  )}
                </div>

                {/* Progress Bar for Steps with percentage */}
                {step.progress !== undefined && (
                  <div className="w-full h-2 bg-rose-950/60 rounded-full overflow-hidden border border-rose-500/20">
                    <motion.div
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full"
                      style={{
                        width: `${idx === 3 ? courageProgress : confidenceProgress}%`
                      }}
                    />
                  </div>
                )}

                {/* Extra Detail Tag */}
                {step.detail && (
                  <p className="text-[10px] sm:text-[11px] text-emerald-300/90 pl-6">
                    -&gt; {step.detail}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Success Banner */}
        <AnimatePresence>
          {isDone && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-600/20 border border-rose-400/40 text-center space-y-1.5"
            >
              <div className="inline-flex items-center gap-2 text-rose-200 font-bold text-base sm:text-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-bounce" />
                <span>Deployment successful!</span>
              </div>
              <p className="text-[11px] sm:text-xs text-rose-300/80">
                Redirecting to main question...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
