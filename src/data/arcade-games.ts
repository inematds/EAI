import { Game, Category } from '@/types';

export const arcadeCategories: Category[] = [
  { id: '1', slug: 'puzzle', name: 'Puzzle', area: 'ARCADE', icon: 'puzzle', order: 1 },
  { id: '2', slug: 'acao', name: 'Ação', area: 'ARCADE', icon: 'zap', order: 2 },
  { id: '3', slug: 'aventura', name: 'Aventura', area: 'ARCADE', icon: 'compass', order: 3 },
  { id: '4', slug: 'corrida', name: 'Corrida', area: 'ARCADE', icon: 'car', order: 4 },
  { id: '5', slug: 'esporte', name: 'Esporte', area: 'ARCADE', icon: 'trophy', order: 5 },
  { id: '6', slug: 'estrategia', name: 'Estratégia', area: 'ARCADE', icon: 'brain', order: 6 },
];

// ====== JOGOS ARCADE EAI - TODOS CRIADOS PELA EAI ======
export const arcadeGames: Game[] = [
  // === AÇÃO ===
  {
    id: 'eai-snake',
    slug: 'snake-eai',
    title: 'Snake',
    description: 'A clássica cobrinha agora na EAI! Coma as maçãs, cresça e não bata nas paredes.',
    thumbnailUrl: 'https://placehold.co/400x300/10B981/white?text=Snake',
    embedUrl: '/games/snake.html',
    area: 'ARCADE',
    category: 'Ação',
    tags: ['acao', 'classico', 'cobra', 'retro', 'eai'],
    playCount: 18500,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'eai-pong',
    slug: 'pong-eai',
    title: 'Pong',
    description: 'O clássico dos clássicos! Jogue contra a CPU ou desafie um amigo no modo 2 jogadores.',
    thumbnailUrl: 'https://placehold.co/400x300/3B82F6/white?text=Pong',
    embedUrl: '/games/pong.html',
    area: 'ARCADE',
    category: 'Ação',
    tags: ['acao', 'classico', 'retro', 'multiplayer', 'eai'],
    playCount: 9800,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },

  // === PUZZLE ===
  {
    id: 'eai-memory',
    slug: 'jogo-da-memoria',
    title: 'Jogo da Memória',
    description: 'Encontre os pares de emojis! Treine sua memória com diferentes níveis de dificuldade.',
    thumbnailUrl: 'https://placehold.co/400x300/A855F7/white?text=Memoria',
    embedUrl: '/games/memory.html',
    area: 'ARCADE',
    category: 'Puzzle',
    tags: ['puzzle', 'memoria', 'cerebral', 'eai'],
    playCount: 12300,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'eai-hextris',
    slug: 'hextris-eai',
    title: 'Hextris EAI',
    description: 'Um puzzle hexagonal hipnotizante! Gire o hexágono para combinar cores e criar linhas. Com 10 níveis de dificuldade, cores vibrantes e combos explosivos!',
    thumbnailUrl: 'https://placehold.co/400x300/667EEA/white?text=Hextris',
    embedUrl: '/games/hextris-eai.html',
    area: 'ARCADE',
    category: 'Puzzle',
    tags: ['puzzle', 'hexagono', 'cores', 'reflexo', 'cerebral', 'eai'],
    playCount: 9870,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },

  // === AVENTURA ===
  {
    id: 'eai-capivara-evolution',
    slug: 'capivara-evolution',
    title: 'Capivara Evolution',
    description: 'Seja uma capivara e evolua! Colete frutas, ganhe poderes, batalhe contra animais, descubra filhotes, compre skins e explore 5 mundos mágicos. Chegue ao nível 9 para desbloquear os portais!',
    thumbnailUrl: '/images/games/capivara-evolution.svg',
    embedUrl: '/games/capivara-evolution.html',
    area: 'ARCADE',
    category: 'Aventura',
    tags: ['aventura', 'capivara', 'evolucao', 'rpg', 'acao', 'batalha', 'coleta', 'eai'],
    playCount: 15420,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },
  {
    id: 'eai-dragon-world',
    slug: 'dragon-world',
    title: 'Dragon World',
    description: 'Um mundo estilo Minecraft com dragões! Crie poções, equipe asas, choque ovos de dragão, transforme-se em dragão e animais, explore diferentes mapas e voe pelos céus!',
    thumbnailUrl: 'https://placehold.co/400x300/9B59B6/white?text=Dragon+World',
    embedUrl: '/games/dragon-world.html',
    area: 'ARCADE',
    category: 'Aventura',
    tags: ['aventura', 'dragoes', 'minecraft', 'rpg', 'crafting', 'magia', 'eai'],
    playCount: 12350,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },
  {
    id: 'eai-horse-academy',
    slug: 'horse-academy',
    title: 'Horse Academy',
    description: 'Aprenda a cavalgar! Personalize seu personagem e cavalo, aprenda passo a passo a andar de cavalo, participe de corridas e torne-se o melhor cavaleiro!',
    thumbnailUrl: 'https://placehold.co/400x300/8B4513/white?text=Horse+Academy',
    embedUrl: '/games/horse-academy.html',
    area: 'ARCADE',
    category: 'Aventura',
    tags: ['aventura', 'cavalos', 'simulacao', 'customizacao', 'corrida', 'eai'],
    playCount: 8540,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },
  {
    id: 'eai-horse-farm',
    slug: 'horse-farm',
    title: 'Horse Farm',
    description: 'Cuide do seu cavalo bebê e veja ele crescer! Alimente, brinque e evolua seu cavalo até se tornar um majestoso unicórnio mágico!',
    thumbnailUrl: 'https://placehold.co/400x300/228B22/white?text=Horse+Farm',
    embedUrl: '/games/horse-farm.html',
    area: 'ARCADE',
    category: 'Aventura',
    tags: ['aventura', 'cavalos', 'simulacao', 'fazenda', 'unicornio', 'eai'],
    playCount: 7650,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },

  // === ESTRATEGIA ===
  {
    id: 'eai-nexus-arena',
    slug: 'nexus-arena',
    title: 'NEXUS ARENA',
    description: 'Batalhas em arenas digitais onde pensar e a arma mais poderosa! Escolha sua classe, resolva desafios de logica, desbloqueie habilidades e derrote inimigos. Sistema de ranking, moedas e baus de recompensa!',
    thumbnailUrl: 'https://placehold.co/400x300/6B21A8/white?text=NEXUS+ARENA',
    embedUrl: '/games/nexus-arena.html',
    area: 'ARCADE',
    category: 'Estrategia',
    tags: ['estrategia', 'logica', 'rpg', 'arena', 'batalha', 'ranking', 'multiplayer', 'eai'],
    playCount: 0,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-30'),
    updatedAt: new Date('2024-12-30'),
  },
  {
    id: 'eai-fractal-worlds',
    slug: 'fractal-worlds',
    title: 'FRACTAL WORLDS',
    description: 'Explore 5 mundos fractais onde as regras mudam durante o jogo! Mundo do Tempo, Energia, Logica, Criacao e Caos. Arvore de habilidades, desafios diarios, moedas e baus de recompensa!',
    thumbnailUrl: 'https://placehold.co/400x300/0EA5E9/white?text=FRACTAL+WORLDS',
    embedUrl: '/games/fractal-worlds.html',
    area: 'ARCADE',
    category: 'Aventura',
    tags: ['aventura', 'exploracao', 'puzzle', 'fractal', 'mundos', 'habilidades', 'progressao', 'eai'],
    playCount: 0,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-30'),
    updatedAt: new Date('2024-12-30'),
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return arcadeGames.find((game) => game.slug === slug);
}

export function getGamesByCategory(category: string): Game[] {
  if (category === 'todos') return arcadeGames;
  return arcadeGames.filter(
    (game) => game.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedGames(): Game[] {
  return arcadeGames.filter((game) => game.featured);
}

export function getRelatedGames(currentGame: Game, limit = 4): Game[] {
  return arcadeGames
    .filter(
      (game) =>
        game.id !== currentGame.id &&
        (game.category === currentGame.category ||
          game.tags.some((tag) => currentGame.tags.includes(tag)))
    )
    .slice(0, limit);
}
