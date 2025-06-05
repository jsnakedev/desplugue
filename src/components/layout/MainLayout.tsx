import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, BarChart2, PenTool, Info, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleDarkMode } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Início', path: '/', icon: <Home size={20} /> },
    { name: 'Artigos', path: '/artigos', icon: <BookOpen size={20} /> },
    { name: 'Desafios', path: '/desafios', icon: <Trophy size={20} /> },
    { name: 'Estatísticas', path: '/estatisticas', icon: <BarChart2 size={20} /> },
    { name: 'Refletir', path: '/refletir', icon: <PenTool size={20} /> },
    { name: 'Sobre', path: '/sobre', icon: <Info size={20} /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-light dark:bg-surface-dark">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-medium">
            Desplugue
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label={theme.darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {theme.darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={closeMenu} />
      )}

      {/* Mobile Navigation */}
      <div
        className={`fixed top-16 bottom-0 right-0 w-64 bg-white dark:bg-neutral-900 shadow-lg z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col h-full py-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                location.pathname === item.path
                  ? 'text-primary-600 dark:text-primary-400 font-medium'
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}
              onClick={closeMenu}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 shadow-lg z-10">
        <nav className="container mx-auto flex justify-between items-center px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-3 px-4 transition-colors ${
                location.pathname === item.path
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-16 overflow-auto">
        <div className="container-md py-6">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;