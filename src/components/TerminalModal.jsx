import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Send, Sparkles } from 'lucide-react';
import { playTypewriterSound, playClickSound } from '../utils/sound';

export const TerminalModal = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: "Developer Surprise Console v1.0.0 -- Type 'help' or 'npm run date'!"
    }
  ]);

  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    playClickSound();

    const newHistory = [...history, { type: 'user', text: `$ ${raw}` }];

    const cmd = raw.toLowerCase();

    if (cmd === 'help') {
      newHistory.push({
        type: 'output',
        text: `Available commands:
  - npm run date      Execute main proposal pipeline
  - git status        Check love repository branch status
  - cat secret.txt    Read developer internal notes
  - 404              Query girlfriend status
  - clear             Clear terminal screen
  - exit              Close terminal modal`
      });
    } else if (cmd === 'npm run date' || cmd === 'run date') {
      newHistory.push({
        type: 'output',
        text: `> finding perfect date...

[+] Person found: You
[+] Courage loaded: 100%
[+] Question generated: "Will you go on a date with me?"

> Result: Date status READY!`
      });
    } else if (cmd === 'git status') {
      newHistory.push({
        type: 'output',
        text: `On branch 'in-love'
Your branch is up to date with 'heart/main'.

nothing to commit, working tree clean & overflowing with affection`
      });
    } else if (cmd === '404' || cmd === 'cat 404.txt' || cmd === 'cat secret.txt') {
      newHistory.push({
        type: 'output',
        text: `404: Girlfriend not found.

Just kidding.
She's right here looking at this screen right now.`
      });
    } else if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else {
      newHistory.push({
        type: 'output',
        text: `Command not recognized: '${raw}'. Type 'help' or 'npm run date'!`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl glass-panel rounded-2xl border border-rose-500/40 shadow-2xl overflow-hidden text-left font-mono"
        >
          {/* Header */}
          <div className="bg-[#1C0816] px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-rose-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-200 text-xs sm:text-sm font-semibold">
              <TerminalIcon className="w-4 h-4 text-rose-400" />
              <span>bash - developer_easter_egg</span>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="min-w-[44px] min-h-[44px] p-2 rounded-md text-rose-300 hover:text-white hover:bg-rose-500/20 transition-colors flex items-center justify-center"
              aria-label="Close terminal modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Console Body */}
          <div className="p-4 sm:p-5 bg-[#0B0207]/95 text-[11px] sm:text-sm text-pink-100 min-h-[220px] max-h-[55vh] sm:max-h-[400px] overflow-y-auto space-y-2.5 sm:space-y-3 leading-relaxed">
            {history.map((item, idx) => (
              <div key={idx}>
                {item.type === 'user' ? (
                  <div className="text-rose-400 font-semibold">{item.text}</div>
                ) : item.type === 'system' ? (
                  <div className="text-amber-300/90 italic">{item.text}</div>
                ) : (
                  <div className="text-rose-100/90 whitespace-pre-wrap pl-2 border-l-2 border-rose-500/40">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input Bar (16px text-base on mobile prevents iOS safari auto-zoom) */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#170512] border-t border-rose-500/20 px-3.5 py-2 sm:px-4 sm:py-3 flex items-center gap-2.5"
          >
            <span className="text-rose-400 font-bold text-sm">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                playTypewriterSound();
              }}
              placeholder="Try: npm run date"
              className="flex-1 bg-transparent border-none outline-none text-base sm:text-sm text-white placeholder-rose-300/40 font-mono"
              autoFocus
            />
            <button
              type="submit"
              className="min-w-[44px] min-h-[44px] p-2 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center"
              aria-label="Send command"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
