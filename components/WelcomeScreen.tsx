
import React from 'react';
import { Subject, Question } from '../types';
import { ALL_TESTS, MOCK_TEST_1 } from '../data/questions';

interface WelcomeScreenProps {
  onStartTest: (questions: Question[]) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartTest }) => {
  const startSubjectTest = (subject: Subject) => {
    const filtered = MOCK_TEST_1.filter(q => q.subject === subject);
    onStartTest(filtered);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10">
      <div className="text-center space-y-4 max-w-2xl">
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Master the <span className="text-indigo-600">CUET PG MCA</span> Exam
        </h2>
        <p className="text-lg text-gray-600">
          Ace your entrance preparation with authentic 75-question mocks, subject-wise practice, and AI explanations.
        </p>
      </div>

      <div className="w-full max-w-5xl space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-indigo-600 pl-4">Full-Length Mock Tests (75 Questions)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ALL_TESTS.map((test) => (
            <div key={test.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full cursor-pointer" onClick={() => onStartTest(test.questions)}>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-xs font-black text-indigo-400 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter">New Pattern</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{test.name}</h3>
              <p className="text-gray-500 mb-8 flex-grow">75 questions spanning Math (30), Comp (35), and Aptitude (10). Time: 105 mins.</p>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                Start Test Now
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-emerald-600 pl-4 pt-8">Subject-Wise Focus</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition cursor-pointer group" onClick={() => startSubjectTest(Subject.ComputerAwareness)}>
            <div className="bg-emerald-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">Computer Awareness</h4>
            <p className="text-sm text-gray-500 mb-4">Architecture, OS, Networking.</p>
            <button className="text-emerald-600 text-sm font-bold flex items-center group-hover:translate-x-1 transition">Practice Mode &rarr;</button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition cursor-pointer group" onClick={() => startSubjectTest(Subject.Mathematics)}>
            <div className="bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">Higher Mathematics</h4>
            <p className="text-sm text-gray-500 mb-4">Calculus, Linear Algebra, Sets.</p>
            <button className="text-orange-600 text-sm font-bold flex items-center group-hover:translate-x-1 transition">Practice Mode &rarr;</button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition cursor-pointer group" onClick={() => startSubjectTest(Subject.GeneralAptitude)}>
            <div className="bg-rose-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">General Aptitude</h4>
            <p className="text-sm text-gray-500 mb-4">Logic, Quants, Reasoning.</p>
            <button className="text-rose-600 text-sm font-bold flex items-center group-hover:translate-x-1 transition">Practice Mode &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
