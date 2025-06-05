import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, BarChart2, PenTool } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import { useData } from '../contexts/DataContext';

const HomePage: React.FC = () => {
  const { challenges, userStats } = useData();
  
  // Get incomplete challenges
  const incompleteChallenges = challenges.filter((challenge) => !challenge.completed);
  
  // Get a random challenge suggestion
  const randomChallenge = incompleteChallenges[Math.floor(Math.random() * incompleteChallenges.length)];

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-serif mb-3">Bem-vindo ao Desplugue</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
          Um espaço para desacelerar, refletir e reconectar com o que realmente importa.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="transform transition-all duration-300 hover:-translate-y-1">
          <Link to="/artigos">
            <CardBody className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium mb-2">Artigos</h2>
                <p className="text-neutral-600 dark:text-neutral-400">Leituras curtas para inspirar e refletir</p>
              </div>
              <BookOpen size={24} className="text-primary-500" />
            </CardBody>
          </Link>
        </Card>

        <Card className="transform transition-all duration-300 hover:-translate-y-1">
          <Link to="/desafios">
            <CardBody className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium mb-2">Desafios</h2>
                <p className="text-neutral-600 dark:text-neutral-400">Exercícios práticos para desconectar</p>
              </div>
              <Trophy size={24} className="text-primary-500" />
            </CardBody>
          </Link>
        </Card>

        <Card className="transform transition-all duration-300 hover:-translate-y-1">
          <Link to="/estatisticas">
            <CardBody className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium mb-2">Estatísticas</h2>
                <p className="text-neutral-600 dark:text-neutral-400">Acompanhe seu progresso</p>
              </div>
              <BarChart2 size={24} className="text-primary-500" />
            </CardBody>
          </Link>
        </Card>

        <Card className="transform transition-all duration-300 hover:-translate-y-1">
          <Link to="/refletir">
            <CardBody className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium mb-2">Refletir</h2>
                <p className="text-neutral-600 dark:text-neutral-400">Espaço para seus pensamentos</p>
              </div>
              <PenTool size={24} className="text-primary-500" />
            </CardBody>
          </Link>
        </Card>
      </section>

      {userStats.streakDays > 0 && (
        <section className="mt-8">
          <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
            <CardBody>
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">Você está em uma sequência de {userStats.streakDays} {userStats.streakDays === 1 ? 'dia' : 'dias'}!</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Continue assim para construir um hábito mais consciente.</p>
                </div>
                <div className="text-4xl">🔥</div>
              </div>
            </CardBody>
          </Card>
        </section>
      )}

      {randomChallenge && (
        <section className="mt-8">
          <h2 className="text-xl font-medium mb-4">Sugestão de desafio</h2>
          <Card>
            <CardBody>
              <h3 className="font-medium text-lg mb-2">{randomChallenge.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">{randomChallenge.description}</p>
              <Link 
                to={`/desafios/${randomChallenge.id}`} 
                className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                Ver detalhes →
              </Link>
            </CardBody>
          </Card>
        </section>
      )}

      <section className="mt-8 bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
        <h2 className="text-xl font-medium mb-4">Pensamento do dia</h2>
        <blockquote className="italic border-l-4 border-primary-500 pl-4 py-2">
          "A tecnologia é uma ferramenta maravilhosa, mas um péssimo mestre."
        </blockquote>
      </section>
    </div>
  );
};

export default HomePage;