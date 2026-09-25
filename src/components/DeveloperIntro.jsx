import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { playClickSound, playTypewriterSound } from '../utils/sound';

export const DeveloperIntro = ({ config, onNext }) => {
  const codeText = config.codeSnippet;
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    let index = 0;
    setDisplayedCode('');
    setIsTypingComplete(false);

    const interval = setInterval(() => {
      if (index < codeText.length) {
        setDisplayedCode(codeText.slice(0, index + 1));
        if (index % 4 === 0) {
          playTypewriterSound();
        }
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [codeText]);

  const handleContinue = () => {
    playClickSound();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-16 z-10 max-w-2xl mx-auto text-center"
    >
      {/* Top Playful Text */}
      <div className="space-y-2 mb-6 sm:mb-8 w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-2xl text-rose-200 font-light"
        >
          {config.introSubtext1 || "I could have just texted you..."}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-clamp-heading font-bold font-romantic bg-gradient-to-r from-rose-200 via-pink-300 to-rose-400 bg-clip-text text-transparent"
        >
          {config.introSubtext2 || "But where's the fun in that?"}
        </motion.h2>
      </div>

      {/* Code Editor Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="w-full glass-panel rounded-2xl border border-rose-500/30 overflow-hidden shadow-2xl text-left mb-6 sm:mb-8"
      >
        {/* Editor Titlebar */}
        <div className="bg-[#1A0914]/90 px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-950/40 border border-rose-500/20 text-[11px] sm:text-xs font-mono text-rose-300/80">
            <Code className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
            <span>date_proposal.js</span>
          </div>

          <div className="text-[10px] font-mono text-rose-400/50 hidden sm:block">
            UTF-8 | JS
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 bg-[#0E0308]/95 font-mono text-[11px] sm:text-sm text-pink-100/90 leading-relaxed overflow-x-auto min-h-[180px] max-w-full">
          <pre className="whitespace-pre-wrap break-words">
            <code>
              {displayedCode}
              {!isTypingComplete && (
                <span className="inline-block w-1.5 h-3.5 sm:w-2 sm:h-4 ml-0.5 bg-rose-400 animate-pulse align-middle" />
              )}
            </code>
          </pre>
        </div>

        {/* Output Console Footer */}
        {isTypingComplete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="bg-[#1F0815] border-t border-rose-500/30 px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-2 font-mono text-[11px] sm:text-sm text-emerald-400"
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span>&gt; Output: Perfect plan detected</span>
          </motion.div>
        )}
      </motion.div>

      {/* Conclusion Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-base sm:text-xl text-rose-200/90 mb-6 sm:mb-8 font-medium"
      >
        {config.introConclusion || "So I decided to build something instead."}
      </motion.p>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        onClick={handleContinue}
        className="min-h-[48px] w-full sm:w-auto px-8 py-3.5 rounded-2xl glass-button text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <span>Continue</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};
