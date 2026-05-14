import React from 'react';
import { motion } from 'framer-motion';

const categoryColors = {
  "diatomic nonmetal": "from-blue-500/40 to-blue-600/10 border-blue-500/50",
  "noble gas": "from-purple-500/40 to-purple-600/10 border-purple-500/50",
  "alkali metal": "from-red-500/40 to-red-600/10 border-red-500/50",
  "alkaline earth metal": "from-orange-500/40 to-orange-600/10 border-orange-500/50",
  "metalloid": "from-emerald-500/40 to-emerald-600/10 border-emerald-500/50",
  "polyatomic nonmetal": "from-cyan-500/40 to-cyan-600/10 border-cyan-500/50",
  "post-transition metal": "from-green-500/40 to-green-600/10 border-green-500/50",
  "transition metal": "from-pink-500/40 to-pink-600/10 border-pink-500/50",
  "lanthanide": "from-teal-500/40 to-teal-600/10 border-teal-500/50",
  "actinide": "from-amber-500/40 to-amber-600/10 border-amber-500/50",
};

const ElementTile = ({ element, onClick, isSelected }) => {
  const colorStyle = categoryColors[element.category] || "from-gray-500/40 to-gray-600/10 border-gray-500/50";

  return (
    <motion.div
      layout
      whileHover={{ 
        scale: 1.08, 
        zIndex: 20,
        y: -5,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(element)}
      className={`relative p-2 h-24 w-full flex flex-col items-center justify-between cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden group ${
        isSelected 
          ? 'ring-4 ring-primary/50 border-primary bg-primary/10 shadow-[0_0_30px_rgba(0,242,255,0.4)]' 
          : `bg-gradient-to-br ${colorStyle} hover:border-white/40 glass`
      }`}
      style={{
        gridColumn: element.xpos,
        gridRow: element.ypos,
      }}
    >
      {/* HUD Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/20 group-hover:border-primary transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/20 group-hover:border-primary transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/20 group-hover:border-primary transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/20 group-hover:border-primary transition-colors" />

      {/* Atomic Number */}
      <span className="absolute top-1 right-2 text-[10px] font-mono font-bold text-white/40 group-hover:text-primary transition-colors">
        {element.number}
      </span>
      
      {/* Symbol */}
      <span className="text-2xl font-black font-orbitron tracking-tighter mt-1 group-hover:scale-110 transition-transform duration-300">
        {element.symbol}
      </span>
      
      {/* Details */}
      <div className="flex flex-col items-center w-full">
        <span className="text-[9px] font-rajdhani font-bold uppercase tracking-[0.1em] truncate w-full text-center text-white/80">
          {element.name}
        </span>
        <span className="text-[8px] font-mono text-white/30 group-hover:text-white/60">
          {element.atomic_mass.toFixed(2)}
        </span>
      </div>

      {/* Background Animated Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default ElementTile;
