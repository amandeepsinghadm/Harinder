import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar } from 'lucide-react';

const HistoryMode = ({ elements, onClose }) => {
  const sortedElements = [...elements].sort((a, b) => (a.discovered_by === 'Ancient' ? 0 : a.discovered_by || 0) - (b.discovered_by === 'Ancient' ? 0 : b.discovered_by || 0));
  
  // Note: The data I have might not have "year" as a separate field, but "discovered_by" often contains the year or name.
  // I'll group them by period or just show them in a list for now.
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-2xl p-4"
    >
      <div className="max-w-4xl w-full glass-card p-10 relative h-[80vh] flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <Calendar className="w-8 h-8 text-primary" />
          <h2 className="text-4xl font-black neon-text uppercase tracking-tighter">Discovery Timeline</h2>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 space-y-4">
          {elements.filter(el => el.discovered_by).map((el, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={el.symbol}
              className="glass p-6 rounded-2xl flex justify-between items-center border-l-4 border-primary/40 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="text-3xl font-black text-primary/40 w-12">{el.symbol}</div>
                <div>
                  <h3 className="text-xl font-bold">{el.name}</h3>
                  <p className="text-sm text-gray-500 italic">Discovered by: {el.discovered_by}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600 uppercase font-bold tracking-widest">Period {el.period}</div>
                <div className="text-lg font-mono text-primary">#{el.number}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryMode;
