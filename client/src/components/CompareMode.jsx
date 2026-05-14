import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeftRight, FlaskConical, Thermometer, Box, Info } from 'lucide-react';

const CompareMode = ({ elements, onClose }) => {
  const [el1, setEl1] = useState(null);
  const [el2, setEl2] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-2xl p-4"
    >
      <div className="max-w-6xl w-full glass-card p-10 relative h-[80vh] flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4 mb-10">
          <ArrowLeftRight className="w-8 h-8 text-primary" />
          <h2 className="text-4xl font-black neon-text uppercase tracking-tighter">Element Comparison</h2>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto pr-4">
          {/* Element 1 Selection / Display */}
          <ElementSelector 
            elements={elements} 
            selected={el1} 
            onSelect={setEl1} 
            label="Element A" 
          />
          
          {/* Element 2 Selection / Display */}
          <ElementSelector 
            elements={elements} 
            selected={el2} 
            onSelect={setEl2} 
            label="Element B" 
          />

          {/* Comparison Table */}
          {el1 && el2 && (
            <div className="col-span-2 mt-8 space-y-4">
              <ComparisonRow label="Atomic Number" v1={el1.number} v2={el2.number} />
              <ComparisonRow label="Atomic Mass" v1={el1.atomic_mass.toFixed(3)} v2={el2.atomic_mass.toFixed(3)} />
              <ComparisonRow label="Category" v1={el1.category} v2={el2.category} />
              <ComparisonRow label="Phase" v1={el1.phase} v2={el2.phase} />
              <ComparisonRow label="Density" v1={el1.density || 'N/A'} v2={el2.density || 'N/A'} />
              <ComparisonRow label="Melting Point" v1={el1.melt ? `${el1.melt} K` : 'N/A'} v2={el2.melt ? `${el2.melt} K` : 'N/A'} />
              <ComparisonRow label="Boiling Point" v1={el1.boil ? `${el1.boil} K` : 'N/A'} v2={el2.boil ? `${el2.boil} K` : 'N/A'} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ElementSelector = ({ elements, selected, onSelect, label }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center px-2">
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">{label}</span>
      {selected && (
        <button onClick={() => onSelect(null)} className="text-[10px] text-primary/60 hover:text-primary underline">Change</button>
      )}
    </div>
    
    {!selected ? (
      <select 
        onChange={(e) => onSelect(elements.find(el => el.symbol === e.target.value))}
        className="w-full glass p-5 rounded-2xl border border-glass-border focus:outline-none focus:border-primary appearance-none cursor-pointer"
      >
        <option value="">Select an element...</option>
        {elements.map(el => (
          <option key={el.symbol} value={el.symbol}>{el.name} ({el.symbol})</option>
        ))}
      </select>
    ) : (
      <div className="glass-card p-6 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-3xl font-black text-primary border-primary/30">
            {selected.symbol}
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tight">{selected.name}</h3>
            <p className="text-xs text-gray-500 font-mono">#{selected.number}</p>
          </div>
        </div>
      </div>
    )}
  </div>
);

const ComparisonRow = ({ label, v1, v2 }) => (
  <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr_2fr] gap-2 items-center py-4 border-b border-glass-border">
    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    <div className="flex w-full justify-around md:contents">
      <span className="text-center font-mono text-white text-lg">{v1}</span>
      <span className="text-center font-mono text-white text-lg">{v2}</span>
    </div>
  </div>
);

export default CompareMode;
