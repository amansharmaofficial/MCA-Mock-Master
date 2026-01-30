
import React, { useState, useMemo } from 'react';
import { Subject, Question } from '../types';
import { PYQ_DATA } from '../data/pyqs';
import { getQuestionExplanation } from '../services/gemini';

interface PYQExplorerProps {
  onBack: () => void;
}

const PYQExplorer: React.FC<PYQExplorerProps> = ({ onBack }) => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  const years = ['All', ...Array.from(new Set(PYQ_DATA.map(q => q.year?.toString() || ''))).sort().reverse()];
  const subjects = ['All', Subject.Mathematics, Subject.ComputerAwareness, Subject.GeneralAptitude];

  const filteredQuestions = useMemo(() => {
    return PYQ_DATA.filter(q => {
      const yearMatch = selectedYear === 'All' || q.year?.toString() === selectedYear;
      const subjectMatch = selectedSubject === 'All' || q.subject === selectedSubject;
      return yearMatch && subjectMatch;
    });
  }, [selectedYear, selectedSubject]);

  const toggleAnswer = (id: string) => {
    setShowAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchExplanation = async (q: Question) => {
    if (explanations[q.id] || loadingMap[q.id]) return;

    setLoadingMap(prev => ({ ...prev, [q.id]: true }));
    const correctOptionText = q.options.find(o => o.id === q.correctOptionId)?.text || '';
    const text = await getQuestionExplanation(q.text, q.options.map(o => o.text), correctOptionText);
    setExplanations(prev => ({ ...prev, [q.id]: text }));
    setLoadingMap(prev => ({ ...prev, [q.id]: false }));
    setShowAnswers(prev => ({ ...prev, [q.id]: true }));
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition group"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">PYQ Explorer</h2>
            <p className="text-gray-500 font-medium">Browse authentic Previous Year Questions.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Year</label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="block w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-pointer"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="block w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-pointer"
            >
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="px-10 py-5 bg-gray-50/50 border-b flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                    {q.year} PYQ
                  </span>
                  <span className="px-3 py-1 bg-white border border-gray-200 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">
                    {q.subject}
                  </span>
                </div>
              </div>

              <div className="p-10 space-y-8">
                <h3 className="text-2xl font-bold text-gray-800 leading-[1.6]">
                  {q.text}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, idx) => (
                    <div 
                      key={opt.id} 
                      className={`p-6 rounded-3xl border-2 flex items-center space-x-5 transition-all duration-300
                        ${showAnswers[q.id] && opt.id === q.correctOptionId 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-lg' 
                          : 'bg-white border-gray-100 text-gray-600 shadow-sm'}`}
                    >
                      <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black shrink-0 transition-colors
                        ${showAnswers[q.id] && opt.id === q.correctOptionId 
                          ? 'bg-emerald-600 text-white shadow-md rotate-3' 
                          : 'bg-gray-50 text-gray-400'}`}
                      >
                        {optionLabels[idx]}
                      </span>
                      <span className="font-bold text-lg">{opt.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex flex-wrap gap-4 border-t border-gray-50">
                  <button
                    onClick={() => toggleAnswer(q.id)}
                    className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-md
                      ${showAnswers[q.id] 
                        ? 'bg-white border-2 border-gray-100 text-gray-400 hover:bg-gray-50' 
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-2 border-indigo-100'}`}
                  >
                    <span>{showAnswers[q.id] ? 'Hide Answer' : 'Show Answer'}</span>
                  </button>
                  
                  <button
                    onClick={() => fetchExplanation(q)}
                    disabled={loadingMap[q.id]}
                    className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-xl shadow-indigo-100 group"
                  >
                    {loadingMap[q.id] ? (
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    )}
                    <span>AI Analysis</span>
                  </button>
                </div>

                {explanations[q.id] && showAnswers[q.id] && (
                  <div className="mt-8 p-8 bg-indigo-50/50 rounded-[2rem] border-2 border-indigo-100/50 animate-fadeIn shadow-inner">
                    <h4 className="text-indigo-600 font-black mb-6 flex items-center text-[10px] uppercase tracking-[0.2em]">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      GenAI Concept Breakdown
                    </h4>
                    <div className="prose prose-indigo max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed font-medium">
                      {explanations[q.id]}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[3rem] border-2 border-gray-100 p-20 text-center shadow-xl">
            <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-gray-200">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">Search Result Empty</h3>
            <p className="text-gray-500 font-bold mt-2">Try different filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSelectedYear('All'); setSelectedSubject('All'); }}
              className="mt-8 text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PYQExplorer;
