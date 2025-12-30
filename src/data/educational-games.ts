import { Game, Category } from '@/types';

export const educationalCategories: Category[] = [
  { id: '1', slug: 'matematica', name: 'Matemática', area: 'EDUCATIONAL', icon: 'calculator', order: 1 },
  { id: '2', slug: 'portugues', name: 'Português', area: 'EDUCATIONAL', icon: 'book', order: 2 },
  { id: '3', slug: 'ciencias', name: 'Ciências', area: 'EDUCATIONAL', icon: 'flask', order: 3 },
  { id: '4', slug: 'geografia', name: 'Geografia', area: 'EDUCATIONAL', icon: 'globe', order: 4 },
  { id: '5', slug: 'historia', name: 'História', area: 'EDUCATIONAL', icon: 'landmark', order: 5 },
  { id: '6', slug: 'ingles', name: 'Inglês', area: 'EDUCATIONAL', icon: 'languages', order: 6 },
  { id: '7', slug: 'logica', name: 'Lógica', area: 'EDUCATIONAL', icon: 'brain', order: 7 },
];

export const ageRanges = [
  { id: '1', slug: '4-6', name: '4-6 anos', min: 4, max: 6 },
  { id: '2', slug: '7-9', name: '7-9 anos', min: 7, max: 9 },
  { id: '3', slug: '10-12', name: '10-12 anos', min: 10, max: 12 },
  { id: '4', slug: '13+', name: '13+ anos', min: 13, max: 99 },
];

// Níveis Escolares (Ensino Fundamental)
export const schoolGrades = [
  { id: '1', slug: '1ano', name: '1º Ano', grade: 1, description: 'Alfabetização e números até 100' },
  { id: '2', slug: '2ano', name: '2º Ano', grade: 2, description: 'Leitura, escrita e operações básicas' },
  { id: '3', slug: '3ano', name: '3º Ano', grade: 3, description: 'Interpretação e multiplicação' },
  { id: '4', slug: '4ano', name: '4º Ano', grade: 4, description: 'Produção textual e divisão' },
  { id: '5', slug: '5ano', name: '5º Ano', grade: 5, description: 'Frações e História do Brasil' },
  { id: '6', slug: '6ano', name: '6º Ano', grade: 6, description: 'Gramática e ecossistemas' },
  { id: '7', slug: '7ano', name: '7º Ano', grade: 7, description: 'Frações, decimais e corpo humano' },
  { id: '8', slug: '8ano', name: '8º Ano', grade: 8, description: 'Equações e física básica' },
  { id: '9', slug: '9ano', name: '9º Ano', grade: 9, description: 'Funções e química básica' },
];

// ====== JOGOS EDUCATIVOS EAI - TODOS CRIADOS PELA EAI ======
export const educationalGames: Game[] = [
  // === MATEMÁTICA ===
  {
    id: 'eai-math-quiz',
    slug: 'quiz-matematica',
    title: 'Quiz de Matemática',
    description: 'Teste suas habilidades matemáticas! Adição, subtração, multiplicação e divisão com diferentes níveis.',
    thumbnailUrl: 'https://placehold.co/400x300/06B6D4/white?text=Quiz+Math',
    embedUrl: '/games/math-quiz.html',
    area: 'EDUCATIONAL',
    category: 'Matemática',
    subject: 'Matemática',
    ageRange: '7-9',
    schoolGrade: [2, 3, 4, 5],
    educationalGoal: 'Praticar operações matemáticas básicas',
    tags: ['matematica', 'quiz', 'operacoes', 'eai'],
    playCount: 15200,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'eai-times-tables',
    slug: 'corrida-tabuada',
    title: 'Corrida da Tabuada',
    description: 'Corra contra o computador resolvendo multiplicações! Domine a tabuada.',
    thumbnailUrl: 'https://placehold.co/400x300/F59E0B/white?text=Tabuada',
    embedUrl: '/games/times-tables.html',
    area: 'EDUCATIONAL',
    category: 'Matemática',
    subject: 'Matemática',
    ageRange: '7-9',
    schoolGrade: [3, 4, 5],
    educationalGoal: 'Memorizar tabuadas de 2 a 10',
    tags: ['matematica', 'tabuada', 'multiplicacao', 'eai'],
    playCount: 8540,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'eai-clock-time',
    slug: 'aprendendo-horas',
    title: 'Aprendendo as Horas',
    description: 'Aprenda a ler relógios analógicos! Do básico ao avançado.',
    thumbnailUrl: 'https://placehold.co/400x300/3B82F6/white?text=Relogio',
    embedUrl: '/games/clock-time.html',
    area: 'EDUCATIONAL',
    category: 'Matemática',
    subject: 'Matemática',
    ageRange: '4-6',
    schoolGrade: [1, 2],
    educationalGoal: 'Aprender a ler horas em relógios analógicos',
    tags: ['matematica', 'horas', 'relogio', 'tempo', 'eai'],
    playCount: 5120,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'eai-fraction-pizza',
    slug: 'pizza-fracoes',
    title: 'Pizza de Frações',
    description: 'Aprenda frações cortando pizzas deliciosas! Matemática saborosa.',
    thumbnailUrl: 'https://placehold.co/400x300/EF4444/white?text=Pizza',
    embedUrl: '/games/fraction-pizza.html',
    area: 'EDUCATIONAL',
    category: 'Matemática',
    subject: 'Matemática',
    ageRange: '7-9',
    schoolGrade: [3, 4, 5],
    educationalGoal: 'Entender conceitos de frações visualmente',
    tags: ['matematica', 'fracoes', 'pizza', 'eai'],
    playCount: 6780,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'eai-numeros-100',
    slug: 'numeros-100',
    title: 'Números até 100',
    description: 'Aprenda a contar de 1 a 100 com objetos visuais, tabela numérica e jogos!',
    thumbnailUrl: 'https://placehold.co/400x300/8B5CF6/white?text=123',
    embedUrl: '/games/numeros-100.html',
    area: 'EDUCATIONAL',
    category: 'Matemática',
    subject: 'Matemática',
    ageRange: '4-6',
    schoolGrade: 1,
    educationalGoal: 'Contar e reconhecer números de 1 a 100',
    tags: ['matematica', 'numeros', 'contagem', '1ano', 'eai'],
    playCount: 8900,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },
  {
    id: 'eai-soma-subtracao',
    slug: 'soma-subtracao',
    title: 'Soma e Subtração',
    description: 'Pratique adição e subtração com representação visual de objetos!',
    thumbnailUrl: 'https://placehold.co/400x300/06B6D4/white?text=%2B%20%E2%88%92',
    embedUrl: '/games/soma-subtracao.html',
    area: 'EDUCATIONAL',
    category: 'Matemática',
    subject: 'Matemática',
    ageRange: '7-9',
    schoolGrade: [2, 3],
    educationalGoal: 'Dominar operações de soma e subtração',
    tags: ['matematica', 'soma', 'subtracao', 'operacoes', '2ano', '3ano', 'eai'],
    playCount: 7650,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },

  // === PORTUGUÊS ===
  {
    id: 'eai-spelling-bee',
    slug: 'soletrando',
    title: 'Soletrando',
    description: 'Ouça a palavra e soletre corretamente! Melhore sua ortografia em português.',
    thumbnailUrl: 'https://placehold.co/400x300/9333EA/white?text=Soletrando',
    embedUrl: '/games/spelling-bee.html',
    area: 'EDUCATIONAL',
    category: 'Português',
    subject: 'Português',
    ageRange: '7-9',
    schoolGrade: [2, 3, 4],
    educationalGoal: 'Melhorar ortografia e vocabulário em português',
    tags: ['portugues', 'ortografia', 'vocabulario', 'eai'],
    playCount: 4320,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'eai-word-scramble',
    slug: 'palavras-embaralhadas',
    title: 'Palavras Embaralhadas',
    description: 'Desembaralhe as letras e forme palavras! Teste seu vocabulário.',
    thumbnailUrl: 'https://placehold.co/400x300/EC4899/white?text=Palavras',
    embedUrl: '/games/word-scramble.html',
    area: 'EDUCATIONAL',
    category: 'Português',
    subject: 'Português',
    ageRange: '7-9',
    schoolGrade: [2, 3, 4, 5],
    educationalGoal: 'Expandir vocabulário e reconhecimento de palavras',
    tags: ['portugues', 'vocabulario', 'palavras', 'eai'],
    playCount: 3210,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'eai-typing-hero',
    slug: 'heroi-digitacao',
    title: 'Herói da Digitação',
    description: 'Melhore sua velocidade de digitação! Textos em português para todas as idades.',
    thumbnailUrl: 'https://placehold.co/400x300/8B5CF6/white?text=Typing',
    embedUrl: '/games/typing-hero.html',
    area: 'EDUCATIONAL',
    category: 'Português',
    subject: 'Português',
    ageRange: '10-12',
    schoolGrade: [5, 6, 7, 8, 9],
    educationalGoal: 'Melhorar velocidade e precisão de digitação',
    tags: ['portugues', 'digitacao', 'teclado', 'eai'],
    playCount: 5120,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'eai-alfabeto',
    slug: 'alfabeto-divertido',
    title: 'Alfabeto Divertido',
    description: 'Aprenda todas as letras do alfabeto com sons, imagens e quiz interativo!',
    thumbnailUrl: 'https://placehold.co/400x300/FF6B6B/white?text=ABC',
    embedUrl: '/games/alfabeto-divertido.html',
    area: 'EDUCATIONAL',
    category: 'Português',
    subject: 'Alfabetização',
    ageRange: '4-6',
    schoolGrade: 1,
    educationalGoal: 'Reconhecer e pronunciar todas as letras do alfabeto',
    tags: ['portugues', 'alfabeto', 'letras', 'alfabetizacao', '1ano', 'eai'],
    playCount: 6230,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },
  {
    id: 'eai-caca-palavras',
    slug: 'caca-palavras-magico',
    title: 'Caça-Palavras Mágico',
    description: 'Encontre palavras escondidas em 5 categorias: Animais, Espaço, Comida, Ciência e Natureza! 5 níveis por categoria com surpresas e curiosidades.',
    thumbnailUrl: 'https://placehold.co/400x300/667EEA/white?text=Caca+Palavras',
    embedUrl: '/games/caca-palavras.html',
    area: 'EDUCATIONAL',
    category: 'Português',
    subject: 'Vocabulário',
    ageRange: '7-9',
    schoolGrade: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    educationalGoal: 'Expandir vocabulário e reconhecimento de palavras em diversos temas',
    tags: ['portugues', 'vocabulario', 'caca-palavras', 'ciencias', 'eai'],
    playCount: 0,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-30'),
    updatedAt: new Date('2024-12-30'),
  },

  // === CIÊNCIAS ===
  {
    id: 'eai-science-lab',
    slug: 'laboratorio-ciencias',
    title: 'Laboratório de Ciências',
    description: 'Explore experimentos de química, física, biologia e astronomia!',
    thumbnailUrl: 'https://placehold.co/400x300/06B6D4/white?text=Ciencias',
    embedUrl: '/games/science-lab.html',
    area: 'EDUCATIONAL',
    category: 'Ciências',
    subject: 'Ciências',
    ageRange: '7-9',
    schoolGrade: [3, 4, 5, 6, 7],
    educationalGoal: 'Aprender conceitos de ciências através de experimentos virtuais',
    tags: ['ciencias', 'experimentos', 'quimica', 'fisica', 'biologia', 'eai'],
    playCount: 5890,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },

  // === GEOGRAFIA ===
  {
    id: 'eai-brazil-map',
    slug: 'mapa-brasil-interativo',
    title: 'Mapa do Brasil Interativo',
    description: 'Explore o Brasil! Aprenda estados, capitais e regiões de forma interativa.',
    thumbnailUrl: 'https://placehold.co/400x300/22C55E/white?text=Brasil',
    embedUrl: '/games/brazil-map.html',
    area: 'EDUCATIONAL',
    category: 'Geografia',
    subject: 'Geografia',
    ageRange: '7-9',
    schoolGrade: [4, 5, 6, 7],
    educationalGoal: 'Conhecer os estados e regiões do Brasil',
    tags: ['geografia', 'brasil', 'estados', 'capitais', 'eai'],
    playCount: 5430,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'eai-memoria-estados',
    slug: 'memoria-estados',
    title: 'Memória dos Estados',
    description: 'Aprenda os 27 estados do Brasil com jogo da memória! 9 fases progressivas com siglas, capitais, mapas, regiões, culinária e pontos turísticos.',
    thumbnailUrl: 'https://placehold.co/400x300/009c3b/white?text=Estados',
    embedUrl: '/games/memoria-estados.html',
    area: 'EDUCATIONAL',
    category: 'Geografia',
    subject: 'Geografia',
    ageRange: '10-12',
    schoolGrade: [4, 5, 6, 7],
    educationalGoal: 'Conhecer todos os estados brasileiros, capitais, regiões e informações culturais',
    tags: ['geografia', 'brasil', 'estados', 'capitais', 'memoria', 'eai'],
    playCount: 4120,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },

  // === INGLÊS E IDIOMAS ===
  {
    id: 'eai-english-words',
    slug: 'ingles-vocabulario',
    title: 'Vocabulário em Inglês',
    description: 'Aprenda palavras em inglês com imagens, áudio e tradução!',
    thumbnailUrl: 'https://placehold.co/400x300/14B8A6/white?text=English',
    embedUrl: '/games/english-words.html',
    area: 'EDUCATIONAL',
    category: 'Inglês',
    subject: 'Inglês',
    ageRange: '7-9',
    schoolGrade: [3, 4, 5, 6],
    educationalGoal: 'Aprender vocabulário básico em inglês',
    tags: ['ingles', 'vocabulario', 'idiomas', 'eai'],
    playCount: 4560,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'eai-vocabulary-world',
    slug: 'vocabulario-mundial',
    title: 'Vocabulário Mundial',
    description: 'Aprenda palavras em Português, Inglês e Espanhol com áudio! Animais, frutas, objetos e mais.',
    thumbnailUrl: 'https://placehold.co/400x300/667EEA/white?text=Vocabulario',
    embedUrl: '/games/vocabulary-world.html',
    area: 'EDUCATIONAL',
    category: 'Inglês',
    subject: 'Idiomas',
    ageRange: '7-9',
    schoolGrade: [3, 4, 5],
    educationalGoal: 'Aprender vocabulário em 3 idiomas com pronúncia',
    tags: ['ingles', 'espanhol', 'portugues', 'vocabulario', 'idiomas', 'audio', 'eai'],
    playCount: 3890,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'eai-profissoes-idiomas',
    slug: 'profissoes-idiomas',
    title: 'Profissões em Idiomas',
    description: 'Aprenda vocabulário de profissões em Inglês, Espanhol, Francês, Alemão, Italiano e Japonês! 9 fases com palavras, frases e conversas fluentes. Personalize seu avatar e compre skins!',
    thumbnailUrl: 'https://placehold.co/400x300/667eea/white?text=Profissoes',
    embedUrl: '/games/profissoes-idiomas.html',
    area: 'EDUCATIONAL',
    category: 'Inglês',
    subject: 'Idiomas',
    ageRange: '10-12',
    schoolGrade: [5, 6, 7, 8, 9],
    educationalGoal: 'Aprender vocabulário profissional em múltiplos idiomas com pronúncia e diálogos',
    tags: ['ingles', 'espanhol', 'frances', 'alemao', 'idiomas', 'profissoes', 'vocabulario', 'eai'],
    playCount: 2540,
    featured: true,
    active: true,
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-28'),
  },

  // === LÓGICA ===
  {
    id: 'eai-logic-puzzles',
    slug: 'quebra-cabecas-logica',
    title: 'Quebra-cabeças de Lógica',
    description: 'Exercite seu cérebro com sequências, sudoku, memória e pirâmides matemáticas!',
    thumbnailUrl: 'https://placehold.co/400x300/A855F7/white?text=Logica',
    embedUrl: '/games/logic-puzzles.html',
    area: 'EDUCATIONAL',
    category: 'Lógica',
    subject: 'Raciocínio Lógico',
    ageRange: '7-9',
    schoolGrade: [3, 4, 5, 6, 7],
    educationalGoal: 'Desenvolver raciocínio lógico e resolução de problemas',
    tags: ['logica', 'puzzle', 'raciocinio', 'memoria', 'eai'],
    playCount: 4230,
    featured: true,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export function getEducationalGameBySlug(slug: string): Game | undefined {
  return educationalGames.find((game) => game.slug === slug);
}

// Funcao para normalizar texto (remover acentos)
function normalizeText(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function getEducationalGamesByCategory(category: string): Game[] {
  if (category === 'todos') return educationalGames;
  return educationalGames.filter(
    (game) => normalizeText(game.category) === normalizeText(category)
  );
}

export function getEducationalGamesByAge(ageRange: string): Game[] {
  if (ageRange === 'todos') return educationalGames;
  return educationalGames.filter((game) => game.ageRange === ageRange);
}

export function getEducationalGamesByFilters(category: string, ageRange: string): Game[] {
  return educationalGames.filter((game) => {
    const matchCategory = category === 'todos' || normalizeText(game.category) === normalizeText(category);
    const matchAge = ageRange === 'todos' || game.ageRange === ageRange;
    return matchCategory && matchAge;
  });
}

export function getFeaturedEducationalGames(): Game[] {
  return educationalGames.filter((game) => game.featured);
}

export function getRelatedEducationalGames(currentGame: Game, limit = 4): Game[] {
  return educationalGames
    .filter(
      (game) =>
        game.id !== currentGame.id &&
        (game.category === currentGame.category ||
          game.ageRange === currentGame.ageRange ||
          game.tags.some((tag) => currentGame.tags.includes(tag)))
    )
    .slice(0, limit);
}

export function getEducationalGamesByGrade(gradeSlug: string): Game[] {
  if (gradeSlug === 'todos') return educationalGames;

  const grade = schoolGrades.find(g => g.slug === gradeSlug);
  if (!grade) return educationalGames;

  return educationalGames.filter((game) => {
    if (!game.schoolGrade) return false;
    if (Array.isArray(game.schoolGrade)) {
      return game.schoolGrade.includes(grade.grade);
    }
    return game.schoolGrade === grade.grade;
  });
}

export function getEducationalGamesByAllFilters(category: string, ageRange: string, gradeSlug: string): Game[] {
  return educationalGames.filter((game) => {
    // Compara categoria normalizando acentos
    const matchCategory = category === 'todos' || normalizeText(game.category) === normalizeText(category);
    const matchAge = ageRange === 'todos' || game.ageRange === ageRange;

    let matchGrade = true;
    if (gradeSlug !== 'todos') {
      const grade = schoolGrades.find(g => g.slug === gradeSlug);
      if (grade && game.schoolGrade) {
        if (Array.isArray(game.schoolGrade)) {
          matchGrade = game.schoolGrade.includes(grade.grade);
        } else {
          matchGrade = game.schoolGrade === grade.grade;
        }
      } else if (grade) {
        matchGrade = false;
      }
    }

    return matchCategory && matchAge && matchGrade;
  });
}
