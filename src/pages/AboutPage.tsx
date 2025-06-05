import React from 'react';
import { Heart, Shield, Coffee } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="mb-8">
        <h1 className="text-3xl font-serif mb-3">Sobre</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Conheça a ideia por trás do Desplugue.
        </p>
      </section>

      <Card>
        <CardBody className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Desplugue é um app para quem quer se reconectar com o que importa.
          </p>
          
          <p>
            Aqui você encontra conteúdos curtos, desafios simples e um espaço para respirar.
            Nada de coach, nada de promessas milagrosas. Só um convite pra desacelerar.
          </p>
          
          <h2 className="text-xl font-medium mt-6">Filosofia</h2>
          
          <p>
            Acreditamos que a tecnologia deve ser uma ferramenta, não uma mestra.
            Em um mundo onde a atenção virou mercadoria, decidir onde colocar seu
            foco se tornou um ato revolucionário.
          </p>
          
          <p>
            Não somos contra a tecnologia — somos a favor do uso consciente.
            Não pregamos uma vida analógica radical — defendemos o equilíbrio.
          </p>
          
          <h2 className="text-xl font-medium mt-6">Princípios</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Shield size={20} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">100% offline</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Tudo funciona sem internet. Seu conteúdo fica salvo apenas no seu dispositivo.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Shield size={20} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Nenhum dado é coletado</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Não rastreamos seu uso, não exigimos cadastro, não coletamos informações.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Heart size={20} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Feito com cuidado</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Conteúdo pensado para ser útil, direto e livre de manipulações emocionais.
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="text-center border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-2">
          Criado por <a href="#" className="text-primary-600 dark:text-primary-400">@johnfrontdev</a>
        </p>
        <div className="flex justify-center items-center space-x-2 text-neutral-500 dark:text-neutral-400 text-sm">
          <span>100% offline</span>
          <span>•</span>
          <span>Nenhum dado é coletado</span>
          <span>•</span>
          <span>Feito com cuidado</span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;