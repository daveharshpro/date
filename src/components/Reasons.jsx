import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Laugh, Sparkles, Smile, Gift, ArrowRight } from 'lucide-react';
import { playClickSound } from '../utils/sound';

const iconMap = {
  Heart: Heart,
  Laugh: Laugh,
  Sparkles: Sparkles,
  Smile: Smile,
  Gift: Gift
};

export const Reasons = ({ config, onNext }) => {
  const handleProceed = () => {
    playClickSound();
    onNext();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-16 z-10 max-w-4xl mx-auto text-center"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2 sm:space-y-3 mb-8 sm:mb-10 w-full"
      >
        <span className="px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium uppercase tracking-widest">
          Why You?
        </span>
        <h2 className="text-clamp-heading font-bold font-romantic bg-gradient-to-r from-rose-100 via-pink-200 to-rose-300 bg-clip-text text-transparent">
          {config.reasonsTitle || 'A few (of many) reasons why...'}
        </h2>
      </motion.div>

      {/* Grid of Reasons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full mb-8 sm:mb-12"
      >
        {config.reasons.map((reason, idx) => {
          const IconComponent = iconMap[reason.icon] || Heart;
          const isLastSingle =
            config.reasons.length % 3 === 1 && idx === config.reasons.length - 1;

          return (
            <motion.div
              key={reason.id || idx}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`glass-card p-5 sm:p-6 rounded-2xl text-left border border-rose-500/20 hover:border-rose-400/50 transition-all duration-300 group flex flex-col justify-between ${
                isLastSingle ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''
              }`}
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-rose-500/20 to-pink-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300 group-hover:scale-110 group-hover:text-rose-200 transition-transform duration-300">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-rose-100 font-romantic group-hover:text-white transition-colors">
                  {reason.title}
                </h3>

                <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed">
                  {reason.desc}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end text-rose-400/40 group-hover:text-rose-400 transition-colors">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Button to proceed to main question */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={handleProceed}
        className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl glass-button text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-2xl"
      >
        <span>Wait, there's one more thing... 💖</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};
