
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Question, UserAnswer, Subject } from '../types';

interface TestInterfaceProps {
  questions: Question[];
  onFinish: (answers: UserAnswer[]) => void;
}

const TestInterface: React.FC<TestInterfaceProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>(
    questions.map(q => ({ questionId: q.id, selectedOptionId: null, timeSpent: 0 }))
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions.length * 60); 
  const [isFinished, setIsFinished] = useState(false);

  // Ref tracking is essential for functions called from outside React state loop (like timers)
  const answersRef = useRef<UserAnswer[]>([]);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Final submission action
  const performFinalSubmit = useCallback(() => {
    // Prevent multiple submissions
    if (isFinished) return;
    
    // Set local finish state immediately
    setIsFinished(true);
    setShowConfirmModal(false);
    
    // Capture the current answers and send them up
    const finalAnswersToSubmit = [...answersRef.current];
    
    // Small timeout to ensure state transitions complete before parent unmounts/updates
    setTimeout(() => {
      onFinish(finalAnswersToSubmit);
    }, 10);
  }, [onFinish, isFinished]);

  useEffect(() => {
    if (timeLeft <= 0 || isFinished) {
      if (timeLeft <= 0 && !isFinished) {
        performFinalSubmit();
      }
      return;
    };
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setAnswers(prev => {
        const newAnswers = [...prev];
        if (newAnswers[currentIndex]) {
          newAnswers[currentIndex].timeSpent += 1;
        }
        return newAnswers;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, currentIndex, performFinalSubmit]);

  const handleOptionSelect = (optionId: string) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      // Toggle logic
      if (newAnswers[currentIndex].selectedOptionId === optionId) {
        newAnswers[currentIndex].selectedOptionId = null;
      } else {
        newAnswers[currentIndex].selectedOptionId = optionId;
      }
      return newAnswers;
    });
  };

  const openSubmitConfirmation = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowConfirmModal(true);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0 
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const optionLabels = ['A', 'B', 'C', 'D'];
  const attemptedCount = answers.filter(a => a.selectedOptionId !== null).length;

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pb-12 relative animate-fadeIn">
      {/* Question Content Area */}
      <div className="flex-grow space-y-6">
        <div className="bg-white rounded-[2rem] border-2 border-gray-100 shadow-2xl overflow-hidden flex flex-col min-h-[600px] transition-all duration-500">
          {/* Header */}
          <div className="bg-gray-50/50 backdrop-blur-md border-b-2 border-gray-100 px-8 py-6 flex justify-between items-center sticky top-0 z-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">CUET SCQP09 Domain</span>
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                {currentQuestion.subject}
              </span>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Time Remaining</span>
              <div className={`flex items-center px-6 py-2.5 rounded-2xl border-2 transition-all ${timeLeft < 300 ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' : 'bg-white border-indigo-100 text-indigo-600 shadow-sm'}`}>
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-mono font-black text-2xl tracking-tighter">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Question Text & Options */}
          <div className="p-10 flex-grow">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs text-gray-400 font-black tracking-[0.2em] uppercase">Question {currentIndex + 1} of {questions.length}</h2>
                <div className="flex space-x-2">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">+4 Correct</span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 shadow-sm">-1 Negative</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 leading-[1.5] tracking-tight">
                {currentQuestion.text}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentAnswer.selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`flex items-center p-6 rounded-3xl border-2 transition-all duration-300 text-left group relative
                      ${isSelected 
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xl ring-2 ring-indigo-600/10 translate-x-2' 
                        : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-6 shrink-0 transition-all font-black text-xl
                      ${isSelected 
                        ? 'bg-indigo-600 text-white shadow-lg rotate-3 scale-110' 
                        : 'bg-gray-50 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}
                    >
                      {optionLabels[idx]}
                    </div>
                    
                    <div className="flex-grow">
                      <span className={`text-lg transition-colors ${isSelected ? 'text-indigo-900 font-bold' : 'text-gray-600 font-medium'}`}>
                        {option.text}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="ml-4 text-indigo-600 scale-125 animate-bounce">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="border-t-2 border-gray-50 bg-gray-50/30 px-10 py-8 flex flex-wrap gap-4 justify-between items-center">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="group flex items-center space-x-3 px-8 py-4 rounded-2xl border-2 border-gray-200 bg-white font-black text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
              <span>Previous</span>
            </button>
            
            <div className="flex flex-wrap gap-4">
               <button
                onClick={() => handleOptionSelect(currentAnswer.selectedOptionId || '')}
                className="px-10 py-4 rounded-2xl font-black text-rose-500 bg-white border-2 border-gray-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all uppercase tracking-widest text-xs shadow-sm"
              >
                Clear Selection
              </button>
              
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="group flex items-center space-x-4 px-12 py-4 rounded-2xl bg-indigo-600 font-black text-white shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-widest text-xs"
                >
                  <span>Save & Next</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </button>
              ) : (
                <button
                  onClick={(e) => openSubmitConfirmation(e)}
                  className="px-16 py-4 rounded-2xl bg-emerald-600 font-black text-white shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-widest text-xs"
                >
                  Finalize Mock
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side Control Panel */}
      <div className="w-full lg:w-96 shrink-0 space-y-6">
        <div className="bg-white rounded-[3rem] border-2 border-gray-100 p-8 shadow-2xl sticky top-24">
          <div className="text-center mb-8 border-b-2 border-gray-50 pb-6">
            <h4 className="font-black text-gray-900 text-xl uppercase tracking-widest mb-2">Exam Console</h4>
            <div className="inline-flex items-center px-5 py-2 bg-indigo-50 rounded-full text-[11px] font-black text-indigo-700 border border-indigo-100 uppercase tracking-widest">
              {attemptedCount} of {questions.length} Solved
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-3 max-h-[380px] overflow-y-auto no-scrollbar pb-6 px-1">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-full aspect-square rounded-2xl flex items-center justify-center text-xs font-black transition-all border-2
                  ${idx === currentIndex ? 'ring-4 ring-indigo-600 ring-offset-4 scale-110 z-10 border-indigo-600' : ''}
                  ${answers[idx].selectedOptionId 
                    ? 'bg-indigo-600 text-white shadow-lg border-indigo-700' 
                    : 'bg-gray-50 text-gray-400 hover:bg-white hover:border-indigo-200 border-transparent'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="space-y-4 py-8 border-t-2 border-gray-50 mt-4 mb-8">
            <div className="flex items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <div className="w-4 h-4 bg-indigo-600 rounded-lg mr-4 shadow-md"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <div className="w-4 h-4 bg-gray-50 rounded-lg mr-4 border-2 border-gray-200"></div>
              <span>Skipped</span>
            </div>
            <div className="flex items-center text-[10px] font-black text-indigo-600 uppercase tracking-widest">
              <div className="w-4 h-4 ring-4 ring-indigo-600 bg-white rounded-lg mr-4 shadow-sm"></div>
              <span>In View</span>
            </div>
          </div>

          <button
            onClick={(e) => openSubmitConfirmation(e)}
            className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black text-lg hover:bg-emerald-700 hover:shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all shadow-xl shadow-emerald-50 flex items-center justify-center space-x-4 active:scale-95 border-b-4 border-emerald-800"
          >
            <span>Finish Full Test</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </button>
        </div>
      </div>

      {/* FINAL SUBMISSION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6 bg-gray-900/90 backdrop-blur-xl animate-fadeIn">
          <div className="bg-white rounded-[4rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] max-w-lg w-full p-12 space-y-10 transform animate-scaleUp border-8 border-indigo-50/50">
            <div className="w-28 h-28 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-indigo-600 shadow-inner">
              <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Submit Exam?</h3>
              <p className="text-gray-500 font-bold text-lg">
                You solved <span className="text-indigo-600">{attemptedCount}</span> of {questions.length} questions.
              </p>
              <div className="bg-amber-50 p-6 rounded-[2rem] border-2 border-amber-100 inline-block w-full">
                <p className="text-xs text-amber-700 font-black uppercase tracking-widest flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Final Confirmation
                </p>
                <p className="text-[11px] text-amber-600 font-bold">You will not be able to return to these questions after submission.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button 
                onClick={(e) => { e.preventDefault(); setShowConfirmModal(false); }}
                className="py-6 px-8 rounded-3xl border-2 border-gray-100 font-black text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest text-xs shadow-sm"
              >
                Resume Test
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); performFinalSubmit(); }}
                className="py-6 px-8 rounded-3xl bg-indigo-600 text-white font-black hover:bg-indigo-700 shadow-[0_20px_40px_rgba(79,70,229,0.3)] transition-all uppercase tracking-widest text-xs flex items-center justify-center border-b-4 border-indigo-900 active:translate-y-1 active:border-b-0"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestInterface;
