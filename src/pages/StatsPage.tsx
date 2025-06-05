import React from 'react';
import { BarChart2, Clock, Award, Calendar, Trophy } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import { useData } from '../contexts/DataContext';

const StatsPage: React.FC = () => {
  const { userStats, challenges } = useData();
  
  const formatOfflineTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes} minutos`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    
    let result = `${days} ${days === 1 ? 'dia' : 'dias'}`;
    if (remainingHours > 0) {
      result += ` e ${remainingHours} ${remainingHours === 1 ? 'hora' : 'horas'}`;
    }
    
    return result;
  };

  const completionRate = challenges.length > 0
    ? Math.round((userStats.challengesCompleted / challenges.length) * 100)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="mb-8">
        <h1 className="text-3xl font-serif mb-3">Estatísticas</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Acompanhe seu progresso e celebre cada passo na jornada.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardBody className="flex items-center">
            <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-4 mr-4">
              <Trophy size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Desafios Concluídos</p>
              <h2 className="text-2xl font-medium">{userStats.challengesCompleted}</h2>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center">
            <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-4 mr-4">
              <Calendar size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Sequência de Dias</p>
              <h2 className="text-2xl font-medium">{userStats.streakDays}</h2>
            </div>
          </CardBody>
        </Card>

        <Card className="md:col-span-2">
          <CardBody className="flex items-center">
            <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-4 mr-4">
              <Clock size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Tempo Offline Estimado</p>
              <h2 className="text-2xl font-medium">{formatOfflineTime(userStats.totalOfflineMinutes)}</h2>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <h2 className="text-xl font-medium mb-4">Progresso de Desafios</h2>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {userStats.challengesCompleted} de {challenges.length} desafios
              </span>
              <span className="text-sm font-medium">{completionRate}%</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
              <div 
                className="bg-primary-500 h-2.5 rounded-full" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </CardBody>
      </Card>

      {userStats.moodEntries.length > 0 && (
        <Card>
          <CardBody>
            <h2 className="text-xl font-medium mb-4">Registros de Humor</h2>
            <div className="space-y-4">
              {userStats.moodEntries.slice(0, 5).map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {new Date(entry.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="text-lg">
                    {entry.mood === 'great' ? '😄' : 
                     entry.mood === 'good' ? '🙂' : 
                     entry.mood === 'neutral' ? '😐' : 
                     entry.mood === 'bad' ? '😕' : '😞'}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      <section className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg text-center">
        <h2 className="text-xl font-medium mb-3">Seu impacto</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Ao reduzir o tempo de tela, você está recuperando aproximadamente 
          <span className="font-medium text-primary-600 dark:text-primary-400"> {Math.floor(userStats.totalOfflineMinutes / 60)} horas </span> 
          da sua vida. Pense em tudo que você pode fazer com esse tempo recém-descoberto!
        </p>
      </section>
    </div>
  );
};

export default StatsPage;