import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Filter } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useData } from '../contexts/DataContext';

const ArticlesPage: React.FC = () => {
  const { articles } = useData();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { id: 'reflexao', name: 'Reflexão' },
    { id: 'conceitos', name: 'Conceitos' },
    { id: 'ferramentas', name: 'Ferramentas práticas' },
  ];

  const filteredArticles = activeCategory 
    ? articles.filter(article => article.category === activeCategory)
    : articles;

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="mb-8">
        <h1 className="text-3xl font-serif mb-3">Artigos</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Textos curtos e sem enrolação para inspirar sua jornada digital.
        </p>
      </section>

      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        <Button
          variant={activeCategory === null ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveCategory(null)}
        >
          Todos
        </Button>
        
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map(article => (
          <Link key={article.id} to={`/artigos/${article.id}`}>
            <Card className="h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <span className="badge badge-primary">
                    {categories.find(c => c.id === article.category)?.name}
                  </span>
                  <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>{article.readingTime} min</span>
                  </div>
                </div>
                <h2 className="text-lg font-medium mb-2">{article.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {article.content.trim().substring(0, 120)}...
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-10">
          <p className="text-neutral-500 dark:text-neutral-400">
            Não encontramos artigos nesta categoria.
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;