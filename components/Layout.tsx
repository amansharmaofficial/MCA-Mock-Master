
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (view: 'HOME' | 'PYQ_EXPLORER') => void;
  currentView: 'HOME' | 'PYQ_EXPLORER' | 'TESTING' | 'RESULT';
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentView }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('HOME')}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.582.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4.5 1.253" />
            </svg>
            <h1 className="text-xl font-bold tracking-tight">CUET PG MCA Mock Master</h1>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <button 
              onClick={() => onNavigate('HOME')} 
              className={`hover:text-indigo-200 transition ${currentView === 'HOME' ? 'text-white underline underline-offset-8' : 'text-indigo-200'}`}
            >
              Practice
            </button>
            <button 
              onClick={() => onNavigate('PYQ_EXPLORER')} 
              className={`hover:text-indigo-200 transition ${currentView === 'PYQ_EXPLORER' ? 'text-white underline underline-offset-8' : 'text-indigo-200'}`}
            >
              PYQs
            </button>
            <button className="text-indigo-300 cursor-not-allowed transition">Analytics</button>
          </nav>
        </div>
      </header>
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CUET PG MCA Mock Master. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
