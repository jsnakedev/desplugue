import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ChallengesPage from './pages/ChallengesPage';
import ChallengeDetailPage from './pages/ChallengeDetailPage';
import StatsPage from './pages/StatsPage';
import ReflectPage from './pages/ReflectPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/artigos" element={<ArticlesPage />} />
              <Route path="/artigos/:id" element={<ArticleDetailPage />} />
              <Route path="/desafios" element={<ChallengesPage />} />
              <Route path="/desafios/:id" element={<ChallengeDetailPage />} />
              <Route path="/estatisticas" element={<StatsPage />} />
              <Route path="/refletir" element={<ReflectPage />} />
              <Route path="/sobre" element={<AboutPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;