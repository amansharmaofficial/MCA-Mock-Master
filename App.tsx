
import React, { useState, useCallback } from 'react';
import { AppState, Subject, UserAnswer, TestResult, Question } from './types';
import { MOCK_QUESTIONS } from './data/questions';
import Layout from './components/Layout';
import WelcomeScreen from './components/WelcomeScreen';
import TestInterface from './components/TestInterface';
import ResultView from './components/ResultView';
import PYQExplorer from './components/PYQExplorer';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('HOME');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [result, setResult] = useState<TestResult | null>(null);

  const startTest = useCallback((questions: Question[]) => {
    setActiveQuestions(questions);
    setAppState('TESTING');
    setResult(null);
    window.scrollTo(0, 0);
  }, []);

  const finishTest = useCallback((answers: UserAnswer[]) => {
    let correct = 0;
    let attempted = 0;

    answers.forEach((ans, index) => {
      const q = activeQuestions[index];
      if (ans.selectedOptionId !== null) {
        attempted++;
        if (ans.selectedOptionId === q.correctOptionId) {
          correct++;
        }
      }
    });

    const incorrect = attempted - correct;
    const score = (correct * 4) - (incorrect * 1);
    const timeTaken = answers.reduce((sum, a) => sum + a.timeSpent, 0);

    const testResult: TestResult = {
      totalQuestions: activeQuestions.length,
      attempted,
      correct,
      incorrect,
      score,
      timeTaken,
      answers
    };

    setResult(testResult);
    setAppState('RESULT');
    window.scrollTo(0, 0);
  }, [activeQuestions]);

  const goHome = useCallback(() => {
    setAppState('HOME');
    setResult(null);
  }, []);

  const navigateTo = useCallback((view: 'HOME' | 'PYQ_EXPLORER') => {
    if (appState === 'TESTING' && !confirm('Leave the current test? Your progress will be lost.')) {
      return;
    }
    setAppState(view);
    window.scrollTo(0, 0);
  }, [appState]);

  return (
    <Layout onNavigate={navigateTo} currentView={appState}>
      {appState === 'HOME' && <WelcomeScreen onStartTest={startTest} />}
      {appState === 'PYQ_EXPLORER' && <PYQExplorer onBack={() => navigateTo('HOME')} />}
      {appState === 'TESTING' && (
        <TestInterface 
          questions={activeQuestions} 
          onFinish={finishTest} 
        />
      )}
      {appState === 'RESULT' && result && (
        <ResultView 
          result={result} 
          questions={activeQuestions} 
          onRetry={goHome} 
        />
      )}
    </Layout>
  );
};

export default App;
