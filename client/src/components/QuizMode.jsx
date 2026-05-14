import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, RotateCcw, X } from 'lucide-react';
import axios from 'axios';

const QuizMode = ({ onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/quiz');
      const quizData = response.data.map(el => {
        // Create 4 options (1 correct, 3 random wrong)
        // Note: For simplicity, I'll just use the element names as options
        const options = [el.name];
        while (options.length < 4) {
          const randomName = ['Oxygen', 'Gold', 'Iron', 'Neon', 'Carbon', 'Silver', 'Copper', 'Zinc'][Math.floor(Math.random() * 8)];
          if (!options.includes(randomName)) options.push(randomName);
        }
        return {
          element: el,
          options: options.sort(() => Math.random() - 0.5),
          correctAnswer: el.name
        };
      });
      setQuestions(quizData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    const correct = answer === questions[currentIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    fetchQuiz();
  };

  if (loading) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-2xl p-4"
    >
      <div className="max-w-2xl w-full glass-card p-10 relative overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>

        {!showResult ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-glass-border pb-6">
              <h2 className="text-3xl font-black neon-text uppercase tracking-tighter">Chemical Quiz</h2>
              <div className="flex gap-4 font-mono text-sm">
                <span className="text-gray-500">Question: <span className="text-white">{currentIndex + 1}/{questions.length}</span></span>
                <span className="text-gray-500">Score: <span className="text-primary">{score}</span></span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Identify the element with symbol:</p>
              <div className="text-8xl font-black text-white py-4 tracking-tighter">
                {questions[currentIndex].element.symbol}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`p-5 rounded-2xl border text-lg font-bold transition-all duration-300 text-left flex justify-between items-center ${
                    selectedAnswer === option 
                      ? (isCorrect ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400')
                      : (selectedAnswer !== null && option === questions[currentIndex].correctAnswer ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'glass hover:bg-white/5 border-glass-border')
                  }`}
                >
                  {option}
                  {selectedAnswer === option && (isCorrect ? <Trophy className="w-5 h-5" /> : <X className="w-5 h-5" />)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8 py-10">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-primary/10">
              <Trophy className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-5xl font-black tracking-tighter">SIMULATION COMPLETE</h2>
              <p className="text-gray-400 tracking-widest uppercase text-sm">Your Final Score: {score}/{questions.length}</p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={resetQuiz}
                className="flex items-center gap-2 px-8 py-4 bg-primary text-black font-black rounded-2xl hover:scale-105 transition-transform"
              >
                <RotateCcw className="w-5 h-5" /> RETRY
              </button>
              <button 
                onClick={onClose}
                className="flex items-center gap-2 px-8 py-4 glass border-glass-border font-black rounded-2xl hover:bg-white/10 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizMode;
