
import React, { useState, useEffect, useCallback } from 'react';
import { TestResult, Question, Subject } from '../types';
import { getQuestionExplanation } from '../services/gemini';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultViewProps {
  result: TestResult;
  questions: Question[];
  onRetry: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, questions, onRetry }) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const fetchExplanationForQuestion = useCallback(async (qIndex: number) => {
    const q = questions[qIndex];
    if (explanations[q.id] || loadingMap[q.id]) return;

    setLoadingMap(prev => ({ ...prev, [q.id]: true }));
    
    const correctOptionText = q.options.find(o => o.id === q.correctOptionId)?.text || '';
    const text = await getQuestionExplanation(q.text, q.options.map(o => o.text), correctOptionText);
    
    setExplanations(prev => ({ ...prev, [q.id]: text }));
    setLoadingMap(prev => ({ ...prev, [q.id]: false }));
  }, [questions, explanations, loadingMap]);

  // Automatically fetch explanations for all incorrect and skipped questions
  useEffect(() => {
    const autoFetch = async () => {
      const incorrectOrSkippedIndices = questions
        .map((q, idx) => ({ q, idx }))
        .filter(({ idx }) => {
          const ans = result.answers[idx];
          return ans.selectedOptionId !== questions[idx].correctOptionId;
        })
        .map(({ idx }) => idx);

      // We fetch them in sequence to be polite to the API, but you could use Promise.all for speed
      for (const idx of incorrectOrSkippedIndices) {
        await fetchExplanationForQuestion(idx);
      }
    };

    autoFetch();
  }, []); // Run once on mount

  const chartData = [
    { name: 'Correct', value: result.correct, fill: '#10b981' },
    { name: 'Incorrect', value: result.incorrect, fill: '#ef4444' },
    { name: 'Unattempted', value: result.totalQuestions - result.attempted, fill: '#94a3b8' },
  ];

  const currentQ = questions[selectedQuestionIndex];
  const userAnswer = result.answers[selectedQuestionIndex];
  const isCorrect = userAnswer.selectedOptionId === currentQ.correctOptionId;
  const currentExplanation = explanations[currentQ.id];
  const isCurrentLoading = loadingMap[currentQ.id];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl border p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900">Scorecard</h2>
            <p className="text-gray-500">Performance summary for your mock session.</p>
          </div>
          <div className="flex items-baseline space-x-2 bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
            <span className="text-4xl font-black text-indigo-600">{result.score}</span>
            <span className="text-gray-400 font-medium">/ {result.totalQuestions * 4}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: 'Accuracy', value: `${result.attempted > 0 ? Math.round((result.correct / result.attempted) * 100) : 0}%`, icon: '🎯', color: 'text-indigo-600' },
            { label: 'Attempted', value: result.attempted, icon: '📝', color: 'text-blue-600' },
            { label: 'Correct', value: result.correct, icon: '✅', color: 'text-emerald-600' },
            { label: 'Incorrect', value: result.incorrect, icon: '❌', color: 'text-rose-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <span className="text-2xl mb-1 block">{stat.icon}</span>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Chart */}
        <div className="bg-white rounded-3xl border p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Visual Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <button onClick={onRetry} className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
            Take Another Test
          </button>
        </div>

        {/* Question Review */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Detailed Review</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-indigo-600 uppercase">AI Learning Mode Active</span>
              </div>
            </div>
            
            <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar">
              {questions.map((q, idx) => {
                const ans = result.answers[idx];
                const correct = ans.selectedOptionId === q.correctOptionId;
                const attempted = ans.selectedOptionId !== null;
                return (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestionIndex(idx)}
                    className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border-2 transition
                      ${idx === selectedQuestionIndex ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}
                      ${!attempted ? 'border-gray-100 bg-gray-50 text-gray-400' : correct ? 'border-emerald-100 bg-emerald-50 text-emerald-600' : 'border-rose-100 bg-rose-50 text-rose-600'}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                 <span className="text-xs font-bold px-2 py-1 bg-white rounded border uppercase text-gray-400">
                  {currentQ.subject}
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded border uppercase ${isCorrect ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'}`}>
                  {isCorrect ? 'Correct' : userAnswer.selectedOptionId === null ? 'Skipped' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-800 font-medium mb-6">Q{selectedQuestionIndex + 1}. {currentQ.text}</p>
              
              <div className="space-y-3 mb-8">
                {currentQ.options.map(opt => {
                  const isUserSelection = userAnswer.selectedOptionId === opt.id;
                  const isCorrectAnswer = currentQ.correctOptionId === opt.id;
                  
                  let bgClass = 'bg-white border-gray-100';
                  let textClass = 'text-gray-600';
                  
                  if (isCorrectAnswer) {
                    bgClass = 'bg-emerald-50 border-emerald-200';
                    textClass = 'text-emerald-900 font-bold';
                  } else if (isUserSelection && !isCorrectAnswer) {
                    bgClass = 'bg-rose-50 border-rose-200';
                    textClass = 'text-rose-900 font-bold';
                  }

                  return (
                    <div key={opt.id} className={`p-3 rounded-lg border text-sm ${bgClass} ${textClass} flex justify-between items-center`}>
                      <span>{opt.text}</span>
                      {isCorrectAnswer && <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                      {isUserSelection && !isCorrectAnswer && <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-indigo-600 font-bold mb-4 flex items-center text-sm uppercase tracking-wider">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  AI Explanation
                </h4>

                {isCurrentLoading ? (
                  <div className="flex flex-col items-center justify-center py-8 bg-white rounded-2xl border border-indigo-50 animate-pulse">
                    <svg className="animate-spin h-8 w-8 text-indigo-400 mb-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-indigo-400 font-medium text-sm">Generating AI insight...</span>
                  </div>
                ) : currentExplanation ? (
                  <div className="bg-white p-6 rounded-2xl border border-indigo-100 prose prose-indigo max-w-none text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {currentExplanation}
                  </div>
                ) : !isCorrect ? (
                   <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-rose-600 text-xs text-center font-medium">
                    Waiting for AI to generate explanation for this error...
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl border border-emerald-100 text-center">
                    <p className="text-emerald-700 text-sm font-medium mb-4">You nailed this one! Need a deeper dive anyway?</p>
                    <button 
                      onClick={() => fetchExplanationForQuestion(selectedQuestionIndex)}
                      className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition"
                    >
                      Explain this Question
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
