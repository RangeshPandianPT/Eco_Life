import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_QUESTIONS = [
  {
    question: "Which everyday item takes the longest to decompose in a landfill?",
    options: ["Paper towel", "Apple core", "Plastic bottle", "Aluminum can"],
    correctIndex: 2,
    explanation: "A plastic bottle can take up to 450 years to decompose! Aluminum takes about 200 years.",
  },
  {
    question: "How much water is typically used to produce a single cotton t-shirt?",
    options: ["100 Liters", "500 Liters", "1,500 Liters", "2,700 Liters"],
    correctIndex: 3,
    explanation: "It takes about 2,700 liters of water to produce one cotton shirt—enough for one person to drink for 2.5 years!",
  }
];

const EcoEducationWidget = () => {
  const [quizState, setQuizState] = useState({
    answered: false,
    selectedOption: null,
    isCorrect: false,
    questionIndex: Math.floor(Math.random() * QUIZ_QUESTIONS.length)
  });

  const quiz = QUIZ_QUESTIONS[quizState.questionIndex];

  const handleAnswer = (index) => {
    if (quizState.answered) return;
    
    const isCorrect = index === quiz.correctIndex;
    setQuizState({
      ...quizState,
      answered: true,
      selectedOption: index,
      isCorrect
    });
    
    // In a real app we would dispatch an action or save to local storage
    if (isCorrect) {
      console.log("Awarded +10 Eco Points for correct answer!");
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-organic flex flex-col gap-6">
      
      {/* Quiz Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🧠</span>
          <h3 className="font-heading font-bold text-foreground">Daily Eco Quiz</h3>
        </div>
        
        <p className="text-sm font-medium mb-4 text-foreground leading-relaxed">
          {quiz.question}
        </p>
        
        <div className="space-y-2">
          {quiz.options.map((option, idx) => {
            let btnClass = "border border-border bg-background hover:bg-muted text-foreground";
            if (quizState.answered) {
              if (idx === quiz.correctIndex) {
                btnClass = "border-success bg-success/10 text-success font-semibold";
              } else if (idx === quizState.selectedOption) {
                btnClass = "border-destructive/50 bg-destructive/10 text-destructive line-through";
              } else {
                btnClass = "border-border bg-muted/50 text-muted-foreground opacity-50";
              }
            }
            
            return (
              <button
                key={option}
                onClick={() => handleAnswer(idx)}
                disabled={quizState.answered}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-organic ${btnClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {quizState.answered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20"
            >
              <p className="text-xs font-semibold text-primary mb-1">
                {quizState.isCorrect ? "Correct! +10 XP 🎉" : "Not quite! 💡"}
              </p>
              <p className="text-xs text-muted-foreground">{quiz.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <hr className="border-t border-border" />

      {/* Podcast Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🎧</span>
          <h3 className="font-heading font-bold text-foreground">Featured Podcast</h3>
        </div>
        
        <div className="flex gap-4 p-3 rounded-xl border border-border hover:bg-muted transition-organic cursor-pointer group">
          <div className="w-16 h-16 rounded-md bg-secondary flex items-center justify-center shrink-0">
            <span className="text-2xl">🌱</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              The True Cost of Fast Fashion
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              "Eco Heroes" Podcast • 5 min listen
            </p>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default EcoEducationWidget;
