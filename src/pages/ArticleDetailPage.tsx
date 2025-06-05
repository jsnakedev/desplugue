import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Maximize, Minimize, Type, Sun, Moon } from 'lucide-react';
import Button from '../components/ui/Card';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles } = useData();
  const { theme, toggleDarkMode, setFontSize } = useTheme();
  const [isZenMode, setIsZenMode] = useState(false);

  const article = articles.find(a => a.id === id);

  useEffect(() => {
    if (!article) {
      navigate('/artigos');
    }
  }, [article, navigate]);

  if (!article) {
    return null;
  }

  const toggleZenMode = () => {
    setIsZenMode(!isZenMode);
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'reflexao':
        return 'Reflexão';
      case 'conceitos':
        return 'Conceitos';
      case 'ferramentas':
        return 'Ferramentas práticas';
      default:
        return category;
    }
  };

  return (
    <div className={`transition-all duration-300 ${isZenMode ? 'mx-auto max-w-2xl' : ''}`}>
      {!isZenMode && (
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar
          </button>
        </div>
      )}

      <div className={`${isZenMode ? 'py-8' : ''}`}>
        <div className="flex flex-wrap items-center justify-between mb-4">
          <span className="badge badge-primary mb-2">
            {getCategoryName(article.category)}
          </span>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleZenMode}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label={isZenMode ? "Sair do modo zen" : "Entrar no modo zen"}
            >
              {isZenMode ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
            
            {isZenMode && (
              <>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  aria-label={theme.darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
                >
                  {theme.darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                
                <button
                  onClick={() => setFontSize(theme.fontSize === 'small' ? 'medium' : theme.fontSize === 'medium' ? 'large' : 'small')}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  aria-label="Ajustar tamanho da fonte"
                >
                  <Type size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-serif mb-4">{article.title}</h1>
        
        <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-6">
          <Clock size={16} className="mr-1" />
          <span>{article.readingTime} minutos de leitura</span>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;