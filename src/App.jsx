import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PeriodicTable from './components/PeriodicTable';
import Sidebar from './components/Sidebar';
import SearchFilter from './components/SearchFilter';
import QuizMode from './components/QuizMode';
import CompareMode from './components/CompareMode';
import HistoryMode from './components/HistoryMode';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Mic, FileText, Trophy, ArrowLeftRight, Calendar } from 'lucide-react';

const App = () => {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedElement, setSelectedElement] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/elements');
        setElements(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching elements:", error);
        setLoading(false);
      }
    };
    fetchElements();
  }, []);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceAssistant = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("Voice Command:", command);
      if (command.includes("search for")) {
        setSearchQuery(command.replace("search for", "").trim());
      } else if (command.includes("quiz")) {
        setShowQuiz(true);
      } else if (command.includes("compare")) {
        setShowCompare(true);
      } else if (command.includes("history")) {
        setShowHistory(true);
      } else if (command.includes("reset")) {
        setSearchQuery('');
        setFilterCategory('All');
      }
    };
    recognition.start();
  };

  const filteredElements = elements.filter(el => {
    const matchesSearch = el.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          el.number.toString().includes(searchQuery);
    const matchesCategory = filterCategory === 'All' || el.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full shadow-[0_0_20px_rgba(0,242,255,0.5)]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black overflow-x-hidden font-rajdhani">
      {/* Scanline Effect */}
      <div className="scanline" />
      
      {/* Background HUD Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-tech-grid" style={{ backgroundSize: '40px 40px' }} />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/40"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <header className="pt-12 pb-8 relative z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl font-black text-center tracking-tighter font-orbitron mb-0">
            ELEM<span className="neon-text">ENTAL</span>
          </h1>
          <div className="hud-line max-w-md mt-2" />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-primary/60 font-mono tracking-[0.5em] uppercase text-[10px] mt-2"
          >
            Quantum Simulation Interface • 0x4A2B
          </motion.p>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 relative z-10 pb-20">
        <SearchFilter 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={[...new Set(elements.map(e => e.category))]}
        />
        
        <div className="mt-12">
          <PeriodicTable 
            elements={filteredElements} 
            onElementClick={setSelectedElement}
            selectedElement={selectedElement}
          />
        </div>
      </main>

      <AnimatePresence>
        {selectedElement && (
          <Sidebar 
            element={selectedElement} 
            onClose={() => setSelectedElement(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showQuiz && (
          <QuizMode onClose={() => setShowQuiz(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCompare && (
          <CompareMode elements={elements} onClose={() => setShowCompare(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHistory && (
          <HistoryMode elements={elements} onClose={() => setShowHistory(false)} />
        )}
      </AnimatePresence>

      {/* Voice Assistant Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleVoiceAssistant}
        className={`fixed bottom-24 right-8 w-14 h-14 rounded-full flex items-center justify-center z-40 shadow-2xl transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'bg-primary text-black'}`}
      >
        <Mic className="w-6 h-6" />
      </motion.button>

      <footer className="fixed bottom-0 w-full p-4 glass border-t border-glass-border z-20 flex justify-between items-center text-xs text-gray-500 px-8">
        <div>© 2026 ANTIGRAVITY SCIENCE LABS</div>
        <div className="flex gap-6">
          <button 
            onClick={() => setShowQuiz(true)}
            className="hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            <Trophy className="w-3 h-3" /> Quiz Mode
          </button>
          <button 
            onClick={() => setShowCompare(true)}
            className="hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            <ArrowLeftRight className="w-3 h-3" /> Comparison
          </button>
          <button 
            onClick={() => setShowHistory(true)}
            className="hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            <Calendar className="w-3 h-3" /> History
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
