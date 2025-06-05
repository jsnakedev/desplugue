import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: '1',
    title: '1 hora sem tocar no celular',
    description: 'Coloque seu celular em um lugar fora de alcance e não o toque por uma hora completa. Use este tempo para fazer algo que normalmente não faria.',
    duration: 60,
    category: 'beginner',
  },
  {
    id: '2',
    title: 'Escreva à mão algo que você sente',
    description: 'Em uma folha de papel, escreva seus pensamentos por 10 minutos sem parar. Não se preocupe com gramática ou coerência, apenas deixe fluir.',
    duration: 10,
    category: 'beginner',
  },
  {
    id: '3',
    title: 'Saia de casa sem GPS',
    description: 'Na próxima vez que for a um lugar conhecido, deixe o GPS desligado. Confie em sua memória e intuição. Está tudo bem se você se perder um pouco.',
    duration: 30,
    category: 'intermediate',
  },
  {
    id: '4',
    title: 'Refeição sem telas',
    description: 'Faça uma refeição completa sem nenhuma tela por perto - nem TV, nem celular, nem computador. Foque nos sabores e na experiência de comer.',
    duration: 30,
    category: 'beginner',
  },
  {
    id: '5',
    title: 'Leia um livro físico por 10 minutos',
    description: 'Escolha um livro físico e leia por pelo menos 10 minutos sem interrupções. Sinta o peso do livro, o cheiro das páginas e o ato de virá-las.',
    duration: 10,
    category: 'beginner',
  },
  {
    id: '6',
    title: 'Fique 10 minutos em silêncio',
    description: 'Encontre um lugar tranquilo, sente-se confortavelmente e fique em completo silêncio por 10 minutos. Não tente meditar, apenas experimente o silêncio.',
    duration: 10,
    category: 'beginner',
  },
  {
    id: '7',
    title: 'Passe 1 dia sem redes sociais',
    description: 'Durante 24 horas, não acesse nenhuma rede social. Nada de Instagram, Twitter, Facebook, TikTok, etc. Observe como você se sente ao longo do dia.',
    duration: 1440,
    category: 'advanced',
  },
  {
    id: '8',
    title: 'Desative notificações de 3 apps',
    description: 'Escolha 3 aplicativos que mais distraem você e desative completamente suas notificações por pelo menos 3 dias. Veja como isso afeta sua concentração.',
    duration: 4320,
    category: 'intermediate',
  },
];