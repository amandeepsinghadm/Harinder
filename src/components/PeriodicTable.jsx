import React from 'react';
import ElementTile from './ElementTile';

const PeriodicTable = ({ elements, onElementClick, selectedElement }) => {
  return (
    <div className="periodic-table-wrapper">
      <div className="periodic-table-grid">
        {elements.map((element) => (
          <ElementTile 
            key={element.number} 
            element={element} 
            onClick={onElementClick}
            isSelected={selectedElement?.number === element.number}
          />
        ))}
        
        {/* Background Decorative HUD Text */}
        <div className="col-start-3 col-end-13 row-start-1 row-end-4 flex flex-col items-center justify-center pointer-events-none select-none">
          <div className="text-7xl font-black font-orbitron opacity-5 neon-text tracking-tighter">
            ELEMENTAL
          </div>
          <div className="text-sm font-mono tracking-[1.5em] text-primary/30 mt-[-10px] uppercase">
            Simulation System v2.0
          </div>
          <div className="mt-4 flex gap-8">
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-primary/20" />
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-primary/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;
