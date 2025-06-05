import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Filter } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useData } from '../contexts/DataContext';

const ChallengesPage: React.FC = () => {
  const { challenges } = useData();
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = [
    { id: 'beginner', name: 'Iniciante' },
    { id: 'intermediate', name: 'Intermediário' },
    { id: 'advanced', name: 'Avançado' },
  ];

  const filteredChallenges = challenges.filter(challenge => {
    if (filter === 'completed' && !challenge.completed) return false;
    if (filter === 'incomplete' && challenge.completed) return false;
    if (categoryFilter && challenge.category !== categoryFilter) return false;
    return true;
  });

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    if (minutes === 60) return `1 hora`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} horas`;
    return `${Math.floor(minutes / 1440)} ${minutes === 1440 ? 'dia' : 'dias'}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="mb-8">
        <h1 className="text-3xl font-serif mb-3">Desafios</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Exercícios práticos para reduzir gradualmente o uso de telas e tecnologia.
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="flex flex-wrap items-center gap-2 mr-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Concluídos
          </Button>
          <Button
            variant={filter === 'incomplete' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('incomplete')}
          >
            Pendentes
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={categoryFilter === category.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setCategoryFilter(categoryFilter === category.id ? null : category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.map(challenge => (
          <Link key={challenge.id} to={`/desafios/${challenge.id}`}>
            <Card className="h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <span className={`badge ${challenge.completed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'badge-secondary'}`}>
                    {challenge.completed ? 'Concluído' : 'Pendente'}
                  </span>
                  <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>{formatDuration(challenge.duration)}</span>
                  </div>
                </div>
                <h2 className="text-lg font-medium mb-2">{challenge.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {challenge.description}
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-10">
          <p className="text-neutral-500 dark:text-neutral-400">
            {filter === 'completed' 
              ? 'Você ainda não concluiu nenhum desafio.' 
              : filter === 'incomplete' && categoryFilter
                ? `Não há desafios pendentes na categoria ${categoryFilter}.`
                : 'Não encontramos desafios com esses filtros.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;