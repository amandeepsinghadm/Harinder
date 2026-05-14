import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Info, FlaskConical, Thermometer, Box, History, Zap, Atom, Globe, Shield, BookOpen, Bookmark, Volume2, ExternalLink, Layers, Target } from 'lucide-react';
import AtomViewer from './AtomViewer';

const categoryColorMap = {
  "diatomic nonmetal": "#3b82f6",
  "noble gas": "#a855f7",
  "alkali metal": "#ef4444",
  "alkaline earth metal": "#f97316",
  "metalloid": "#10b981",
  "polyatomic nonmetal": "#06b6d4",
  "post-transition metal": "#22c55e",
  "transition metal": "#ec4899",
  "lanthanide": "#14b8a6",
  "actinide": "#f59e0b",
  "unknown, probably transition metal": "#6b7280",
  "unknown, probably post-transition metal": "#6b7280",
  "unknown, probably metalloid": "#6b7280",
  "unknown, predicted to be noble gas": "#6b7280",
};

const Sidebar = ({ element, onClose }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const catColor = categoryColorMap[element.category] || '#6b7280';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'properties', label: 'Properties', icon: <FlaskConical className="w-3.5 h-3.5" /> },
    { id: 'history', label: 'History', icon: <History className="w-3.5 h-3.5" /> },
    { id: 'uses', label: 'Uses & Safety', icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  const handleSpeak = () => {
    window.speechSynthesis.cancel();
    const text = `${element.name}. Symbol: ${element.symbol}. Atomic number: ${element.number}. ${element.summary || ''}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      
      {/* Panel */}
      <motion.div
        initial={{ x: '100%', opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.8 }}
        className="fixed top-0 right-0 h-full w-full md:w-[520px] lg:w-[560px] z-50 flex flex-col"
        style={{
          background: 'linear-gradient(180deg, rgba(5,5,10,0.97) 0%, rgba(10,10,20,0.98) 100%)',
          borderLeft: `1px solid rgba(255,255,255,0.06)`,
          boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-5 flex items-center justify-between border-b border-white/5"
          style={{ background: `linear-gradient(135deg, ${catColor}08, transparent)` }}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                style={{ 
                  background: `${catColor}15`, 
                  borderColor: `${catColor}40`,
                  boxShadow: `0 0 20px ${catColor}20`
                }}>
                <span className="text-3xl font-black font-['Orbitron']" style={{ color: catColor }}>{element.symbol}</span>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black/80 flex items-center justify-center border border-white/10">
                <span className="text-[8px] font-mono font-bold text-white/80">{element.number}</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold font-['Orbitron'] tracking-tight text-white">{element.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: catColor, borderColor: `${catColor}40`, background: `${catColor}10` }}>
                  {element.category}
                </span>
                <span className="text-[10px] text-white/30 font-mono">Period {element.period} • Group {element.group}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleSpeak} className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Listen">
              <Volume2 className="w-4 h-4 text-white/40 hover:text-cyan-400" />
            </button>
            <button onClick={() => setBookmarked(!bookmarked)} className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Bookmark">
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-white/40'}`} />
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors ml-1">
              <X className="w-5 h-5 text-white/50 hover:text-white" />
            </button>
          </div>
        </div>

        {/* 3D Atom Visualization */}
        <div className="flex-shrink-0 h-48 md:h-56 relative overflow-hidden border-b border-white/5">
          <div className="absolute top-3 left-4 z-10 flex items-center gap-1.5">
            <Atom className="w-3 h-3 text-cyan-400/60" />
            <span className="text-[9px] font-mono text-cyan-400/60 tracking-[0.2em] uppercase">Quantum Model</span>
          </div>
          <div className="absolute top-3 right-4 z-10">
            <span className="text-[9px] font-mono text-white/20">
              {element.shells?.join('-')} shells
            </span>
          </div>
          <AtomViewer shells={element.shells || [2]} symbol={element.symbol} />
        </div>

        {/* Tab Navigation */}
        <div className="flex-shrink-0 flex border-b border-white/5 px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-white/30 border-transparent hover:text-white/60 hover:border-white/10'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto sidebar-scroll p-5 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <StatCard icon={<Target className="w-3.5 h-3.5" />} label="Atomic Mass" value={element.atomic_mass?.toFixed(4)} unit="u" color="#00f2ff" />
                <StatCard icon={<Thermometer className="w-3.5 h-3.5" />} label="Phase (STP)" value={element.phase} color="#a855f7" />
                <StatCard icon={<Layers className="w-3.5 h-3.5" />} label="Density" value={element.density || 'N/A'} unit="g/cm³" color="#f97316" />
                <StatCard icon={<Zap className="w-3.5 h-3.5" />} label="Block" value={element.block?.toUpperCase()} color="#22c55e" />
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <SectionTitle icon={<BookOpen className="w-4 h-4" />} title="Summary" />
                <p className="text-sm text-white/60 leading-relaxed">
                  {element.summary || 'No summary available for this element.'}
                </p>
                {element.source && (
                  <a href={element.source} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-cyan-400/60 hover:text-cyan-400 transition-colors mt-1">
                    <ExternalLink className="w-3 h-3" /> Wikipedia →
                  </a>
                )}
              </div>

              {/* Appearance */}
              {element.appearance && (
                <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Appearance</span>
                  <p className="text-sm text-white/70 mt-1 capitalize">{element.appearance}</p>
                </div>
              )}

              {/* Element Image */}
              {element.image?.url && (
                <div className="space-y-2">
                  <SectionTitle icon={<Globe className="w-4 h-4" />} title="Visual" />
                  <div className="rounded-xl overflow-hidden border border-white/5">
                    <img 
                      src={element.image.url} 
                      alt={element.image.title || element.name}
                      className="w-full h-40 object-cover opacity-90"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    {element.image.title && (
                      <p className="text-[10px] text-white/30 px-3 py-2 bg-black/40 italic">{element.image.title}</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'properties' && (
            <>
              {/* Electronic */}
              <div className="space-y-2">
                <SectionTitle icon={<Zap className="w-4 h-4" />} title="Electronic Configuration" />
                <div className="p-4 rounded-xl border border-cyan-500/10 bg-cyan-500/[0.03]">
                  <p className="text-lg font-mono text-cyan-400 tracking-wide">
                    {element.electron_configuration_semantic || element.electron_configuration || 'N/A'}
                  </p>
                  {element.electron_configuration && element.electron_configuration !== element.electron_configuration_semantic && (
                    <p className="text-[11px] font-mono text-white/30 mt-1">
                      Full: {element.electron_configuration}
                    </p>
                  )}
                </div>
              </div>

              {/* Shell structure */}
              {element.shells && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Shell Electrons</span>
                  <div className="flex gap-2 flex-wrap">
                    {element.shells.map((count, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-center">
                        <div className="text-[9px] text-white/30 font-mono">K+{i}</div>
                        <div className="text-sm font-bold text-white">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Physical Properties Table */}
              <div className="space-y-2">
                <SectionTitle icon={<FlaskConical className="w-4 h-4" />} title="Physical Properties" />
                <div className="space-y-0 rounded-xl border border-white/5 overflow-hidden">
                  <PropRow label="Atomic Mass" value={element.atomic_mass?.toFixed(6)} unit="u" />
                  <PropRow label="Density" value={element.density} unit="g/cm³" />
                  <PropRow label="Melting Point" value={element.melt} unit="K" />
                  <PropRow label="Boiling Point" value={element.boil} unit="K" />
                  <PropRow label="Molar Heat" value={element.molar_heat} unit="J/(mol·K)" />
                  <PropRow label="Phase at STP" value={element.phase} />
                </div>
              </div>

              {/* Chemical Properties */}
              <div className="space-y-2">
                <SectionTitle icon={<Atom className="w-4 h-4" />} title="Quantum Properties" />
                <div className="space-y-0 rounded-xl border border-white/5 overflow-hidden">
                  <PropRow label="Electronegativity" value={element.electronegativity_pauling} unit="Pauling" />
                  <PropRow label="Electron Affinity" value={element.electron_affinity} unit="kJ/mol" />
                  <PropRow label="Block" value={element.block?.toUpperCase()} />
                  <PropRow label="Period" value={element.period} />
                  <PropRow label="Group" value={element.group} />
                </div>
              </div>

              {/* Ionization Energies */}
              {element.ionization_energies && element.ionization_energies.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Ionization Energies (kJ/mol)</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {element.ionization_energies.slice(0, 8).map((ie, i) => (
                      <span key={i} className="px-2 py-1 rounded text-[10px] font-mono border border-white/5 bg-white/[0.02] text-white/50">
                        IE{i + 1}: {ie.toFixed(1)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <>
              <div className="space-y-4">
                <SectionTitle icon={<History className="w-4 h-4" />} title="Discovery" />
                
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Discovered by</span>
                      <p className="text-lg text-white font-semibold mt-0.5">{element.discovered_by || 'Unknown / Prehistoric'}</p>
                    </div>
                  </div>
                  {element.named_by && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Named by</span>
                      <p className="text-sm text-white/70 mt-0.5">{element.named_by}</p>
                    </div>
                  )}
                </div>

                {/* Etymology */}
                <div className="p-3 rounded-xl border border-purple-500/10 bg-purple-500/[0.03]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400/60">Etymology & Origin</span>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">
                    The name "{element.name}" comes from its historical roots. Symbol <strong className="text-purple-400">{element.symbol}</strong> was assigned based on{' '}
                    {element.name.endsWith('ium') ? 'Latin naming conventions for metals.' : 'its characteristic properties or discovery context.'}
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'uses' && (
            <>
              <div className="space-y-4">
                <SectionTitle icon={<Shield className="w-4 h-4" />} title="Applications & Safety" />
                
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-3">
                  <p className="text-sm text-white/60 leading-relaxed">
                    {getElementUses(element)}
                  </p>
                </div>

                {/* Safety indicator */}
                <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.03]">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-amber-400/60" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/60">Safety Profile</span>
                  </div>
                  <p className="text-sm text-white/60">
                    {getSafetyInfo(element)}
                  </p>
                </div>

                {/* Natural Occurrence */}
                <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Natural Occurrence</span>
                  <p className="text-sm text-white/50 mt-1">
                    {element.number <= 94
                      ? `${element.name} occurs naturally and is found in the Earth's crust${element.phase === 'Gas' ? ' primarily as a gas' : element.phase === 'Liquid' ? ' as a liquid at standard conditions' : ' in solid mineral forms'}.`
                      : `${element.name} is a synthetic element produced in particle accelerators and nuclear reactors.`}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-3 border-t border-white/5 flex items-center justify-between text-[9px] text-white/20 font-mono">
          <span>ELEMENT {element.number} OF 118</span>
          <span>DATABASE v2.0</span>
        </div>
      </motion.div>
    </>
  );
};

// === Sub-components ===

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-2">
    <span className="text-cyan-400/60">{icon}</span>
    <h3 className="text-xs font-bold font-['Orbitron'] uppercase tracking-[0.15em] text-white/50">{title}</h3>
    <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
  </div>
);

const StatCard = ({ icon, label, value, unit, color }) => (
  <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] space-y-1.5">
    <div className="flex items-center gap-1.5">
      <span style={{ color: `${color}80` }}>{icon}</span>
      <span className="text-[9px] font-bold uppercase tracking-wider text-white/25">{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-bold text-white">{value || 'N/A'}</span>
      {unit && <span className="text-[10px] text-white/25">{unit}</span>}
    </div>
  </div>
);

const PropRow = ({ label, value, unit }) => (
  <div className="flex justify-between items-center px-4 py-2.5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors">
    <span className="text-xs text-white/35">{label}</span>
    <span className="text-xs font-mono text-white/80">
      {value != null ? `${value}${unit ? ` ${unit}` : ''}` : <span className="text-white/15">—</span>}
    </span>
  </div>
);

// === Helper functions for element info ===
function getElementUses(el) {
  const uses = {
    'H': 'Used in petroleum refining, ammonia production (Haber process), fuel cells, and rocket propulsion. Hydrogen is being explored as a clean energy carrier.',
    'He': 'Used in cryogenics, MRI scanners, welding shielding gas, filling balloons and airships, and as a coolant in nuclear reactors.',
    'C': 'Foundation of organic chemistry and life. Used in steel production, water filtration, carbon fiber composites, and as diamond in cutting tools.',
    'N': 'Used in fertilizer production, food preservation, cryopreservation, and manufacturing of explosives and electronics.',
    'O': 'Essential for respiration. Used in steel manufacturing, welding, medical oxygen therapy, water treatment, and rocket propulsion.',
    'Fe': 'Most widely used metal. Essential for steel production, construction, automotive manufacturing, tools, and machinery.',
    'Au': 'Used in jewelry, electronics, dental work, aerospace, and as a financial reserve. Excellent conductor with high corrosion resistance.',
    'Ag': 'Used in photography, electronics, solar panels, water purification, jewelry, and medical applications.',
    'Cu': 'Essential in electrical wiring, plumbing, electronics, construction, and renewable energy systems.',
    'Si': 'Foundation of semiconductor industry. Used in computer chips, solar cells, glass, ceramics, and silicone products.',
  };
  return uses[el.symbol] || `${el.name} is used in various industrial and scientific applications based on its ${el.category} properties. It has applications in research, manufacturing, and specialized technologies.`;
}

function getSafetyInfo(el) {
  if (el.number > 83) return `${el.name} is radioactive. Proper radiation shielding and handling protocols are required. Exposure should be minimized.`;
  if (el.category === 'alkali metal') return `${el.name} is highly reactive with water and air. Must be stored in inert atmospheres or oil. Handle with extreme caution.`;
  if (el.category === 'noble gas') return `${el.name} is generally non-toxic and chemically inert. However, it can cause asphyxiation in enclosed spaces by displacing oxygen.`;
  if (el.symbol === 'F' || el.symbol === 'Cl' || el.symbol === 'Br') return `${el.name} is a halogen and is toxic/corrosive. Requires proper ventilation and protective equipment during handling.`;
  return `Standard laboratory safety precautions apply. Consult Material Safety Data Sheets (MSDS) for detailed handling guidelines.`;
}

export default Sidebar;
