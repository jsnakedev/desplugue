import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useData } from '../contexts/DataContext';

const ChallengeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { challenges, completeChallenge } = useData();
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const challenge = challenges.find(c => c.id === id);

  useEffect(() => {
    if (!challenge) {
      navigate('/desafios');
    }
  }, [challenge, navigate]);

  if (!challenge) {
    return null;
  }

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} minutos`;
    if (minutes === 60) return `1 hora`;
    if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    }
    const days = Math.floor(minutes / 1440);
    return `${days} ${days === 1 ? 'dia' : 'dias'}`;
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'beginner':
        return 'Iniciante';
      case 'intermediate':
        return 'Intermediário';
      case 'advanced':
        return 'Avançado';
      default:
        return category;
    }
  };

  const handleComplete = () => {
    setIsSubmitting(true);
    // Simulate a delay for UX purposes
    setTimeout(() => {
      completeChallenge(challenge.id, reflection);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          <ArrowLeft size={18} className="mr-2" />
          Voltar
        </button>
      </div>

      <Card>
        <CardBody>
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col gap-2">
              <span className="badge badge-primary">
                {getCategoryName(challenge.category)}
              </span>
              {challenge.completed && (
                <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Concluído
                </span>
              )}
            </div>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm">
              <Clock size={16} className="mr-1" />
              <span>{formatDuration(challenge.duration)}</span>
            </div>
          </div>

          <h1 className="text-2xl font-serif mb-4">{challenge.title}</h1>
          
          <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg mb-6">
            <p className="text-neutral-700 dark:text-neutral-300">{challenge.description}</p>
          </div>

          {challenge.completed ? (
            <div className="mt-6">
              <div className="flex items-center text-green-600 dark:text-green-400 mb-3">
                <CheckCircle size={20} className="mr-2" />
                <span className="font-medium">Desafio concluído</span>
              </div>
              
              {challenge.reflection && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Sua reflexão:</h3>
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                    <p className="text-neutral-700 dark:text-neutral-300 italic">"{challenge.reflection}"</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Como você se sentiu?</h3>
              <textarea
                className="input min-h-[120px] mb-4"
                placeholder="Compartilhe suas reflexões sobre este desafio..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={handleComplete}
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? 'Salvando...' : 'Concluir Desafio'}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {!challenge.completed && (
        <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertCircle size={20} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
            <p className="text-neutral-700 dark:text-neutral-300 text-sm">
              Só marque o desafio como concluído após realmente realizá-lo. A honestidade consigo mesmo é fundamental para criar novos hábitos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetailPage;