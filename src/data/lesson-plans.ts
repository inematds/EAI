// Planos de Aula EAI - Para Professores
// Planos completos usando os jogos da plataforma

export interface LessonPlan {
  id: string;
  slug: string;
  title: string;
  subject: string;
  subjectIcon: string;
  grades: number[];
  duration: string; // ex: "1 aula (50min)", "2 aulas"
  difficulty: 'facil' | 'medio' | 'avancado';
  objectives: string[];
  bnccCodes?: string[]; // Códigos BNCC
  materials: string[];
  steps: LessonStep[];
  games: GameReference[];
  assessment: string[];
  extensions?: string[];
  teacherTips?: string[];
  thumbnailColor: string;
  featured?: boolean;
}

export interface LessonStep {
  phase: string;
  duration: string;
  description: string;
  activities: string[];
}

export interface GameReference {
  slug: string;
  title: string;
  usage: string;
  duration: string;
}

export const subjectColors: Record<string, string> = {
  'Matemática': 'from-blue-500 to-cyan-500',
  'Português': 'from-pink-500 to-rose-500',
  'Ciências': 'from-green-500 to-emerald-500',
  'Geografia': 'from-amber-500 to-yellow-500',
  'História': 'from-orange-500 to-red-500',
  'Inglês': 'from-purple-500 to-violet-500',
  'Lógica': 'from-indigo-500 to-blue-500',
  'Interdisciplinar': 'from-pink-500 to-purple-500',
};

export const subjectIcons: Record<string, string> = {
  'Matemática': '🔢',
  'Português': '📖',
  'Ciências': '🔬',
  'Geografia': '🌍',
  'História': '🏛️',
  'Inglês': '🇬🇧',
  'Lógica': '🧩',
  'Interdisciplinar': '🎯',
};

export const lessonPlans: LessonPlan[] = [
  // ========== MATEMÁTICA ==========
  {
    id: 'mat-numeros-100',
    slug: 'conhecendo-numeros-ate-100',
    title: 'Conhecendo os Números até 100',
    subject: 'Matemática',
    subjectIcon: '🔢',
    grades: [1],
    duration: '2 aulas (50min cada)',
    difficulty: 'facil',
    objectives: [
      'Reconhecer e nomear números de 1 a 100',
      'Compreender a ordem numérica',
      'Identificar dezenas e unidades',
      'Utilizar a tabela numérica como recurso'
    ],
    bnccCodes: ['EF01MA04', 'EF01MA05'],
    materials: [
      'Computadores/tablets com acesso à internet',
      'Projetor para demonstração',
      'Fichas numéricas impressas (opcional)',
      'Quadro branco'
    ],
    steps: [
      {
        phase: 'Introdução',
        duration: '10 min',
        description: 'Ativação do conhecimento prévio',
        activities: [
          'Perguntar aos alunos até que número eles sabem contar',
          'Mostrar a tabela numérica de 1 a 100 no quadro',
          'Explorar padrões visuais (linhas = dezenas)'
        ]
      },
      {
        phase: 'Desenvolvimento',
        duration: '25 min',
        description: 'Exploração do jogo educativo',
        activities: [
          'Apresentar o jogo "Números até 100" na EAI',
          'Demonstrar os modos: Contagem, Tabela, Quiz e Sequência',
          'Alunos jogam individualmente ou em duplas',
          'Professor circula auxiliando dúvidas'
        ]
      },
      {
        phase: 'Fechamento',
        duration: '15 min',
        description: 'Consolidação e discussão',
        activities: [
          'Roda de conversa sobre descobertas',
          'Desafio: encontrar padrões na tabela',
          'Registrar números favoritos no caderno'
        ]
      }
    ],
    games: [
      {
        slug: 'numeros-100',
        title: 'Números até 100',
        usage: 'Jogo principal da aula - todos os 4 modos',
        duration: '25 min'
      }
    ],
    assessment: [
      'Observação da participação durante o jogo',
      'Capacidade de contar sequencialmente',
      'Reconhecimento de números aleatórios',
      'Identificação de dezenas completas'
    ],
    extensions: [
      'Caça ao tesouro numérico pela escola',
      'Criar tabela numérica personalizada',
      'Jogo de bingo com números até 100'
    ],
    teacherTips: [
      'Permita que alunos explorem livremente primeiro',
      'Use o modo Quiz para avaliar progresso individual',
      'Alunos mais avançados podem ajudar colegas'
    ],
    thumbnailColor: 'from-blue-500 to-cyan-500',
    featured: true
  },
  {
    id: 'mat-soma-subtracao',
    slug: 'operacoes-soma-subtracao',
    title: 'Dominando Soma e Subtração',
    subject: 'Matemática',
    subjectIcon: '🔢',
    grades: [2, 3],
    duration: '2 aulas (50min cada)',
    difficulty: 'medio',
    objectives: [
      'Resolver operações de adição até 20',
      'Resolver operações de subtração até 20',
      'Compreender a relação entre soma e subtração',
      'Usar representação visual para resolver problemas'
    ],
    bnccCodes: ['EF02MA05', 'EF02MA06', 'EF03MA05'],
    materials: [
      'Computadores/tablets',
      'Material concreto (blocos, fichas)',
      'Folha de registro',
      'Projetor'
    ],
    steps: [
      {
        phase: 'Aquecimento',
        duration: '10 min',
        description: 'Revisão com material concreto',
        activities: [
          'Manipular blocos para representar somas',
          'Criar situações-problema orais',
          'Relacionar adição com "juntar"'
        ]
      },
      {
        phase: 'Prática Digital',
        duration: '30 min',
        description: 'Jogo interativo',
        activities: [
          'Acessar o jogo "Soma e Subtração" na EAI',
          'Começar pelo nível fácil (1-10)',
          'Progredir para níveis mais desafiadores',
          'Usar representação visual do jogo'
        ]
      },
      {
        phase: 'Aplicação',
        duration: '10 min',
        description: 'Problemas do cotidiano',
        activities: [
          'Resolver 3 situações-problema escritas',
          'Compartilhar estratégias de resolução',
          'Registrar aprendizados'
        ]
      }
    ],
    games: [
      {
        slug: 'soma-subtracao',
        title: 'Soma e Subtração',
        usage: 'Prática das 4 operações com visual',
        duration: '30 min'
      }
    ],
    assessment: [
      'Acertos no jogo (modo de 3 níveis)',
      'Resolução de problemas escritos',
      'Explicação do raciocínio usado'
    ],
    teacherTips: [
      'Incentive o uso da representação visual antes do cálculo mental',
      'Comemore pequenas conquistas',
      'Permita calculadora para verificação, não resolução'
    ],
    thumbnailColor: 'from-cyan-500 to-blue-500',
    featured: true
  },
  {
    id: 'mat-tabuada',
    slug: 'dominando-tabuada',
    title: 'Dominando a Tabuada',
    subject: 'Matemática',
    subjectIcon: '🔢',
    grades: [3, 4, 5],
    duration: '3 aulas (50min cada)',
    difficulty: 'medio',
    objectives: [
      'Memorizar as tabuadas de 2 a 10',
      'Compreender a multiplicação como adição repetida',
      'Identificar padrões nas tabuadas',
      'Aplicar tabuada em situações-problema'
    ],
    bnccCodes: ['EF03MA03', 'EF04MA04', 'EF05MA07'],
    materials: [
      'Computadores/tablets',
      'Tabela de tabuada impressa',
      'Cronômetro',
      'Quadro para registro de recordes'
    ],
    steps: [
      {
        phase: 'Aula 1 - Introdução',
        duration: '50 min',
        description: 'Compreensão do conceito',
        activities: [
          'Explicar multiplicação como adição repetida',
          'Construir tabela de tabuada coletivamente',
          'Identificar padrões (números pares, terminação)',
          'Primeiro contato com o jogo Corrida da Tabuada'
        ]
      },
      {
        phase: 'Aula 2 - Prática',
        duration: '50 min',
        description: 'Treino intensivo',
        activities: [
          'Aquecimento oral em duplas',
          'Sessão de jogo: Corrida da Tabuada',
          'Competição amigável entre alunos',
          'Registro de melhores tempos'
        ]
      },
      {
        phase: 'Aula 3 - Aplicação',
        duration: '50 min',
        description: 'Consolidação e avaliação',
        activities: [
          'Problemas contextualizados usando tabuada',
          'Torneio final no jogo',
          'Auto-avaliação: quais tabuadas domino?'
        ]
      }
    ],
    games: [
      {
        slug: 'corrida-tabuada',
        title: 'Corrida da Tabuada',
        usage: 'Prática gamificada com competição',
        duration: '20-25 min por aula'
      }
    ],
    assessment: [
      'Tempo de resposta no jogo',
      'Acertos em avaliação escrita',
      'Capacidade de explicar padrões',
      'Aplicação em problemas'
    ],
    extensions: [
      'Criar jogos de tabuleiro com tabuada',
      'Desafio semanal de velocidade',
      'Tabuada cantada/rimada'
    ],
    teacherTips: [
      'Foque em uma tabuada por dia para memorização',
      'Use truques: tabuada do 9 com os dedos',
      'Não force velocidade antes da compreensão'
    ],
    thumbnailColor: 'from-yellow-500 to-orange-500',
    featured: true
  },
  {
    id: 'mat-fracoes',
    slug: 'fracoes-na-pratica',
    title: 'Frações na Prática',
    subject: 'Matemática',
    subjectIcon: '🔢',
    grades: [3, 4, 5],
    duration: '2 aulas (50min cada)',
    difficulty: 'medio',
    objectives: [
      'Compreender o conceito de fração como parte de um todo',
      'Identificar numerador e denominador',
      'Comparar frações com mesmo denominador',
      'Representar frações visualmente'
    ],
    bnccCodes: ['EF04MA09', 'EF05MA03'],
    materials: [
      'Computadores/tablets',
      'Pizzas de papel recortáveis',
      'Réguas de frações',
      'Folha de registro'
    ],
    steps: [
      {
        phase: 'Contextualização',
        duration: '15 min',
        description: 'Frações no cotidiano',
        activities: [
          'Discutir: "Como dividimos uma pizza?"',
          'Introduzir vocabulário: metade, terço, quarto',
          'Manipular pizzas de papel'
        ]
      },
      {
        phase: 'Exploração Digital',
        duration: '25 min',
        description: 'Jogo Pizza de Frações',
        activities: [
          'Apresentar o jogo na EAI',
          'Alunos exploram os desafios',
          'Progressão de níveis: 1/2, 1/3, 1/4, etc.',
          'Registrar frações trabalhadas'
        ]
      },
      {
        phase: 'Sistematização',
        duration: '10 min',
        description: 'Formalização do conceito',
        activities: [
          'Definir numerador e denominador',
          'Criar frações com o próprio corpo (grupos)',
          'Desafio: representar a turma em frações'
        ]
      }
    ],
    games: [
      {
        slug: 'pizza-fracoes',
        title: 'Pizza de Frações',
        usage: 'Visualização concreta de frações',
        duration: '25 min'
      }
    ],
    assessment: [
      'Representação correta de frações',
      'Identificação de numerador/denominador',
      'Comparação de frações simples',
      'Participação nas atividades'
    ],
    teacherTips: [
      'Use sempre a pergunta "Quantas partes iguais?"',
      'Relacione com divisão sempre que possível',
      'Evite frações impróprias no início'
    ],
    thumbnailColor: 'from-red-500 to-pink-500',
    featured: true
  },
  {
    id: 'mat-horas',
    slug: 'aprendendo-horas',
    title: 'Aprendendo a Ver as Horas',
    subject: 'Matemática',
    subjectIcon: '🔢',
    grades: [1, 2],
    duration: '2 aulas (50min cada)',
    difficulty: 'facil',
    objectives: [
      'Identificar horas cheias no relógio analógico',
      'Diferenciar ponteiro das horas e dos minutos',
      'Relacionar horários com rotina diária',
      'Ler horas e meias-horas'
    ],
    bnccCodes: ['EF01MA17', 'EF02MA18'],
    materials: [
      'Computadores/tablets',
      'Relógios de brinquedo manipuláveis',
      'Cartaz de rotina diária',
      'Fichas de horários'
    ],
    steps: [
      {
        phase: 'Motivação',
        duration: '10 min',
        description: 'Por que precisamos saber as horas?',
        activities: [
          'Conversa sobre rotina: "Que horas você acorda?"',
          'Mostrar diferentes tipos de relógios',
          'Identificar ponteiros no relógio da sala'
        ]
      },
      {
        phase: 'Manipulação',
        duration: '15 min',
        description: 'Relógios concretos',
        activities: [
          'Cada aluno manipula um relógio de brinquedo',
          'Posicionar horas cheias',
          'Jogo: professor fala a hora, aluno posiciona'
        ]
      },
      {
        phase: 'Jogo Digital',
        duration: '20 min',
        description: 'Prática no computador',
        activities: [
          'Acessar "Aprendendo as Horas" na EAI',
          'Explorar os diferentes níveis',
          'Desafios cronometrados'
        ]
      },
      {
        phase: 'Aplicação',
        duration: '5 min',
        description: 'Relacionando com o dia',
        activities: [
          'Criar cartaz de rotina com horários',
          'Desenhar o relógio mostrando hora favorita'
        ]
      }
    ],
    games: [
      {
        slug: 'aprendendo-horas',
        title: 'Aprendendo as Horas',
        usage: 'Prática progressiva de leitura de horas',
        duration: '20 min'
      }
    ],
    assessment: [
      'Leitura de horas cheias',
      'Posicionamento correto dos ponteiros',
      'Relação horário-rotina'
    ],
    teacherTips: [
      'Comece apenas com horas cheias',
      'Use cores diferentes para cada ponteiro',
      'Relacione sempre com atividades reais'
    ],
    thumbnailColor: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'mat-quiz-geral',
    slug: 'quiz-matematica-revisao',
    title: 'Revisão de Matemática com Quiz',
    subject: 'Matemática',
    subjectIcon: '🔢',
    grades: [2, 3, 4, 5],
    duration: '1 aula (50min)',
    difficulty: 'medio',
    objectives: [
      'Revisar as 4 operações básicas',
      'Identificar pontos fortes e fracos',
      'Desenvolver agilidade no cálculo mental',
      'Trabalhar sob pressão de tempo'
    ],
    bnccCodes: ['EF03MA05', 'EF04MA04', 'EF05MA07'],
    materials: [
      'Computadores/tablets',
      'Folha de registro individual',
      'Quadro para placar da turma'
    ],
    steps: [
      {
        phase: 'Aquecimento',
        duration: '5 min',
        description: 'Cálculo mental rápido',
        activities: [
          'Rodada de perguntas orais',
          'Revisão relâmpago das operações'
        ]
      },
      {
        phase: 'Competição',
        duration: '35 min',
        description: 'Quiz interativo',
        activities: [
          'Acessar "Quiz de Matemática" na EAI',
          'Cada aluno joga 3 rodadas',
          'Registrar pontuações',
          'Rodada final: campeões se enfrentam'
        ]
      },
      {
        phase: 'Reflexão',
        duration: '10 min',
        description: 'Auto-avaliação',
        activities: [
          'Qual operação foi mais difícil?',
          'Onde preciso melhorar?',
          'Definir meta pessoal'
        ]
      }
    ],
    games: [
      {
        slug: 'quiz-matematica',
        title: 'Quiz de Matemática',
        usage: 'Avaliação gamificada das 4 operações',
        duration: '35 min'
      }
    ],
    assessment: [
      'Pontuação no quiz',
      'Auto-avaliação reflexiva',
      'Progresso entre rodadas'
    ],
    teacherTips: [
      'Ajuste o nível ao da turma',
      'Celebre progresso, não apenas vitórias',
      'Use para diagnóstico de dificuldades'
    ],
    thumbnailColor: 'from-cyan-500 to-teal-500'
  },

  // ========== PORTUGUÊS ==========
  {
    id: 'port-alfabeto',
    slug: 'conhecendo-alfabeto',
    title: 'Conhecendo o Alfabeto',
    subject: 'Português',
    subjectIcon: '📖',
    grades: [1],
    duration: '3 aulas (50min cada)',
    difficulty: 'facil',
    objectives: [
      'Reconhecer todas as letras do alfabeto',
      'Associar letras a sons e palavras',
      'Diferenciar vogais de consoantes',
      'Escrever as letras do próprio nome'
    ],
    bnccCodes: ['EF01LP04', 'EF01LP05', 'EF01LP06'],
    materials: [
      'Computadores/tablets',
      'Letras móveis (EVA ou papelão)',
      'Cartazes do alfabeto',
      'Fichas de palavras com imagens'
    ],
    steps: [
      {
        phase: 'Aula 1 - Vogais',
        duration: '50 min',
        description: 'Conhecendo A, E, I, O, U',
        activities: [
          'Cantar música do alfabeto',
          'Destacar as vogais',
          'Jogar "Alfabeto Divertido" - modo vogais',
          'Encontrar vogais no próprio nome'
        ]
      },
      {
        phase: 'Aula 2 - Consoantes',
        duration: '50 min',
        description: 'Completando o alfabeto',
        activities: [
          'Apresentar consoantes em grupos',
          'Jogar todos os modos do jogo',
          'Formar sílabas simples',
          'Caça às letras na sala'
        ]
      },
      {
        phase: 'Aula 3 - Aplicação',
        duration: '50 min',
        description: 'Usando o alfabeto',
        activities: [
          'Escrever o próprio nome',
          'Ordenar letras alfabeticamente',
          'Quiz final no jogo',
          'Criar crachá personalizado'
        ]
      }
    ],
    games: [
      {
        slug: 'alfabeto-divertido',
        title: 'Alfabeto Divertido',
        usage: 'Aprendizado interativo das letras',
        duration: '20-25 min por aula'
      }
    ],
    assessment: [
      'Reconhecimento das 26 letras',
      'Nomeação de letras aleatórias',
      'Escrita do próprio nome',
      'Diferenciação vogais/consoantes'
    ],
    extensions: [
      'Livro do alfabeto da turma',
      'Bingo de letras',
      'Alfabeto com recortes de revista'
    ],
    teacherTips: [
      'Respeite o ritmo de cada criança',
      'Use o nome dos alunos como âncora',
      'Evite cobrar escrita antes do reconhecimento'
    ],
    thumbnailColor: 'from-pink-500 to-rose-500',
    featured: true
  },
  {
    id: 'port-ortografia',
    slug: 'melhorando-ortografia',
    title: 'Melhorando a Ortografia',
    subject: 'Português',
    subjectIcon: '📖',
    grades: [2, 3, 4],
    duration: '2 aulas (50min cada)',
    difficulty: 'medio',
    objectives: [
      'Escrever palavras corretamente',
      'Identificar erros ortográficos comuns',
      'Desenvolver consciência fonológica',
      'Ampliar vocabulário escrito'
    ],
    bnccCodes: ['EF02LP01', 'EF03LP01', 'EF04LP01'],
    materials: [
      'Computadores/tablets',
      'Dicionário infantil',
      'Caderno de palavras',
      'Fichas de palavras'
    ],
    steps: [
      {
        phase: 'Sensibilização',
        duration: '10 min',
        description: 'Por que escrever certo?',
        activities: [
          'Mostrar exemplos de confusões por erros',
          'Discutir a importância da comunicação clara',
          'Apresentar o jogo Soletrando'
        ]
      },
      {
        phase: 'Prática Guiada',
        duration: '30 min',
        description: 'Jogo de soletração',
        activities: [
          'Jogar "Soletrando" na EAI',
          'Anotar palavras difíceis',
          'Verificar no dicionário',
          'Criar frases com palavras novas'
        ]
      },
      {
        phase: 'Produção',
        duration: '10 min',
        description: 'Aplicação da ortografia',
        activities: [
          'Ditado de palavras do jogo',
          'Correção coletiva',
          'Registro no caderno de palavras'
        ]
      }
    ],
    games: [
      {
        slug: 'soletrando',
        title: 'Soletrando',
        usage: 'Prática de ortografia com áudio',
        duration: '30 min'
      }
    ],
    assessment: [
      'Desempenho no jogo',
      'Acertos no ditado',
      'Uso correto em frases'
    ],
    teacherTips: [
      'Foque em famílias de palavras',
      'Celebre o esforço, não apenas acertos',
      'Crie mural de palavras conquistadas'
    ],
    thumbnailColor: 'from-purple-500 to-pink-500'
  },
  {
    id: 'port-vocabulario',
    slug: 'expandindo-vocabulario',
    title: 'Expandindo o Vocabulário',
    subject: 'Português',
    subjectIcon: '📖',
    grades: [2, 3, 4, 5],
    duration: '2 aulas (50min cada)',
    difficulty: 'medio',
    objectives: [
      'Conhecer novas palavras',
      'Compreender significados pelo contexto',
      'Usar palavras novas em frases',
      'Desenvolver fluência leitora'
    ],
    bnccCodes: ['EF03LP06', 'EF04LP06', 'EF05LP05'],
    materials: [
      'Computadores/tablets',
      'Cartões de palavras',
      'Dicionário',
      'Papel para desenho'
    ],
    steps: [
      {
        phase: 'Exploração',
        duration: '15 min',
        description: 'Descobrindo palavras',
        activities: [
          'Brainstorm: palavras que conhecemos',
          'Categorizar palavras por tema',
          'Apresentar o Caça-Palavras'
        ]
      },
      {
        phase: 'Jogo',
        duration: '25 min',
        description: 'Caça-Palavras temático',
        activities: [
          'Jogar "Caça-Palavras Mágico"',
          'Explorar diferentes categorias',
          'Anotar palavras descobertas',
          'Pesquisar significados'
        ]
      },
      {
        phase: 'Produção',
        duration: '10 min',
        description: 'Usando novas palavras',
        activities: [
          'Criar frases com palavras do jogo',
          'Ilustrar palavras favoritas',
          'Compartilhar descobertas'
        ]
      }
    ],
    games: [
      {
        slug: 'caca-palavras-magico',
        title: 'Caça-Palavras Mágico',
        usage: 'Descoberta de vocabulário temático',
        duration: '25 min'
      },
      {
        slug: 'palavras-embaralhadas',
        title: 'Palavras Embaralhadas',
        usage: 'Fixação do vocabulário',
        duration: '10 min extra'
      }
    ],
    assessment: [
      'Quantidade de palavras encontradas',
      'Uso correto em frases',
      'Conhecimento dos significados'
    ],
    teacherTips: [
      'Escolha categorias do interesse da turma',
      'Crie mural de palavras novas',
      'Incentive uso das palavras no dia a dia'
    ],
    thumbnailColor: 'from-rose-500 to-orange-500',
    featured: true
  },
  {
    id: 'port-digitacao',
    slug: 'aprendendo-digitar',
    title: 'Aprendendo a Digitar',
    subject: 'Português',
    subjectIcon: '📖',
    grades: [5, 6, 7, 8, 9],
    duration: '4 aulas (50min cada)',
    difficulty: 'medio',
    objectives: [
      'Conhecer o teclado QWERTY',
      'Posicionar corretamente as mãos',
      'Digitar sem olhar para o teclado',
      'Aumentar velocidade de digitação'
    ],
    bnccCodes: ['EF05LP26', 'EF67LP38'],
    materials: [
      'Computadores com teclado',
      'Diagrama do teclado impresso',
      'Cronômetro',
      'Textos para digitação'
    ],
    steps: [
      {
        phase: 'Aula 1 - Introdução',
        duration: '50 min',
        description: 'Conhecendo o teclado',
        activities: [
          'Apresentar layout QWERTY',
          'Ensinar posição base das mãos',
          'Primeiros exercícios: letras da linha base',
          'Jogar modo iniciante'
        ]
      },
      {
        phase: 'Aula 2 - Linha Superior',
        duration: '50 min',
        description: 'Expandindo o alcance',
        activities: [
          'Praticar letras da linha superior',
          'Combinações de letras',
          'Sessão de treino no jogo'
        ]
      },
      {
        phase: 'Aula 3 - Linha Inferior',
        duration: '50 min',
        description: 'Completando o teclado',
        activities: [
          'Letras da linha inferior',
          'Palavras completas',
          'Frases curtas'
        ]
      },
      {
        phase: 'Aula 4 - Velocidade',
        duration: '50 min',
        description: 'Desenvolvendo fluência',
        activities: [
          'Teste de velocidade inicial',
          'Treino intensivo',
          'Teste final e comparação'
        ]
      }
    ],
    games: [
      {
        slug: 'heroi-digitacao',
        title: 'Herói da Digitação',
        usage: 'Prática gamificada de digitação',
        duration: '30 min por aula'
      }
    ],
    assessment: [
      'Palavras por minuto (WPM)',
      'Taxa de acerto',
      'Postura e posição das mãos',
      'Evolução ao longo das aulas'
    ],
    extensions: [
      'Competição de digitação',
      'Digitação de textos próprios',
      'Certificado de digitador'
    ],
    teacherTips: [
      'Priorize precisão antes de velocidade',
      'Não permita olhar para o teclado',
      'Faça pausas para descanso das mãos'
    ],
    thumbnailColor: 'from-violet-500 to-purple-500'
  },

  // ========== CIÊNCIAS ==========
  {
    id: 'cie-laboratorio',
    slug: 'explorando-ciencias',
    title: 'Explorando o Laboratório de Ciências',
    subject: 'Ciências',
    subjectIcon: '🔬',
    grades: [3, 4, 5, 6, 7],
    duration: '2 aulas (50min cada)',
    difficulty: 'medio',
    objectives: [
      'Conhecer diferentes áreas da ciência',
      'Realizar experimentos virtuais',
      'Desenvolver curiosidade científica',
      'Compreender o método científico básico'
    ],
    bnccCodes: ['EF04CI01', 'EF05CI01', 'EF06CI01'],
    materials: [
      'Computadores/tablets',
      'Caderno de cientista',
      'Materiais para experimento real (opcional)',
      'Projetor'
    ],
    steps: [
      {
        phase: 'Motivação',
        duration: '10 min',
        description: 'O que é ser cientista?',
        activities: [
          'Discutir: o que cientistas fazem?',
          'Mostrar exemplos de descobertas',
          'Apresentar o laboratório virtual'
        ]
      },
      {
        phase: 'Experimentação',
        duration: '30 min',
        description: 'Laboratório virtual',
        activities: [
          'Acessar "Laboratório de Ciências" na EAI',
          'Escolher área de interesse',
          'Realizar experimentos virtuais',
          'Registrar observações'
        ]
      },
      {
        phase: 'Discussão',
        duration: '10 min',
        description: 'Compartilhando descobertas',
        activities: [
          'Cada aluno apresenta um experimento',
          'Discutir hipóteses e resultados',
          'Relacionar com o cotidiano'
        ]
      }
    ],
    games: [
      {
        slug: 'laboratorio-ciencias',
        title: 'Laboratório de Ciências',
        usage: 'Experimentos virtuais interativos',
        duration: '30 min'
      }
    ],
    assessment: [
      'Registro de experimentos',
      'Participação nas discussões',
      'Formulação de hipóteses',
      'Curiosidade demonstrada'
    ],
    extensions: [
      'Replicar experimento na vida real',
      'Feira de ciências da turma',
      'Diário do cientista'
    ],
    teacherTips: [
      'Deixe alunos escolherem temas de interesse',
      'Valorize perguntas, não só respostas',
      'Conecte sempre com experiências reais'
    ],
    thumbnailColor: 'from-green-500 to-emerald-500',
    featured: true
  },

  // ========== GEOGRAFIA ==========
  {
    id: 'geo-brasil',
    slug: 'conhecendo-brasil',
    title: 'Conhecendo o Brasil',
    subject: 'Geografia',
    subjectIcon: '🌍',
    grades: [4, 5, 6, 7],
    duration: '3 aulas (50min cada)',
    difficulty: 'medio',
    objectives: [
      'Localizar os 27 estados brasileiros',
      'Identificar as 5 regiões do Brasil',
      'Conhecer capitais dos estados',
      'Relacionar características regionais'
    ],
    bnccCodes: ['EF04GE05', 'EF05GE09', 'EF06GE01'],
    materials: [
      'Computadores/tablets',
      'Mapa do Brasil impresso',
      'Atlas escolar',
      'Fichas dos estados'
    ],
    steps: [
      {
        phase: 'Aula 1 - Regiões',
        duration: '50 min',
        description: 'As 5 regiões brasileiras',
        activities: [
          'Apresentar o mapa do Brasil',
          'Identificar e colorir as 5 regiões',
          'Jogar "Mapa do Brasil Interativo"',
          'Localizar o próprio estado'
        ]
      },
      {
        phase: 'Aula 2 - Estados',
        duration: '50 min',
        description: 'Conhecendo cada estado',
        activities: [
          'Jogar "Memória dos Estados"',
          'Aprender siglas e capitais',
          'Curiosidades de cada estado',
          'Quiz de localização'
        ]
      },
      {
        phase: 'Aula 3 - Cultura',
        duration: '50 min',
        description: 'Diversidade brasileira',
        activities: [
          'Explorar comida típica no jogo',
          'Pontos turísticos de cada região',
          'Apresentação: meu estado',
          'Mapa ilustrado da turma'
        ]
      }
    ],
    games: [
      {
        slug: 'mapa-brasil-interativo',
        title: 'Mapa do Brasil Interativo',
        usage: 'Localização de estados e regiões',
        duration: '20 min'
      },
      {
        slug: 'memoria-estados',
        title: 'Memória dos Estados',
        usage: 'Fixação de siglas, capitais e cultura',
        duration: '25 min'
      }
    ],
    assessment: [
      'Localização de estados no mapa',
      'Conhecimento de capitais',
      'Identificação de regiões',
      'Informações culturais'
    ],
    extensions: [
      'Pesquisa sobre estado sorteado',
      'Culinária regional',
      'Correspondência com escola de outro estado'
    ],
    teacherTips: [
      'Comece pelo estado dos alunos',
      'Use mapas de quebra-cabeça',
      'Conecte com notícias atuais'
    ],
    thumbnailColor: 'from-green-600 to-yellow-500',
    featured: true
  },

  // ========== INGLÊS ==========
  {
    id: 'ing-vocabulario',
    slug: 'primeiras-palavras-ingles',
    title: 'Primeiras Palavras em Inglês',
    subject: 'Inglês',
    subjectIcon: '🇬🇧',
    grades: [3, 4, 5, 6],
    duration: '2 aulas (50min cada)',
    difficulty: 'facil',
    objectives: [
      'Aprender vocabulário básico em inglês',
      'Associar palavras a imagens',
      'Pronunciar palavras corretamente',
      'Usar saudações básicas'
    ],
    bnccCodes: ['EF03LI01', 'EF04LI06', 'EF05LI07'],
    materials: [
      'Computadores/tablets com áudio',
      'Flashcards de vocabulário',
      'Fones de ouvido',
      'Caderno de inglês'
    ],
    steps: [
      {
        phase: 'Warm-up',
        duration: '10 min',
        description: 'Introdução ao inglês',
        activities: [
          'Saudações: Hello, Hi, Good morning',
          'Palavras em inglês que já conhecem',
          'Por que aprender inglês?'
        ]
      },
      {
        phase: 'Vocabulary',
        duration: '30 min',
        description: 'Aprendendo palavras',
        activities: [
          'Jogar "Vocabulário em Inglês" na EAI',
          'Ouvir e repetir pronúncias',
          'Categorias: animais, cores, números',
          'Registrar palavras novas'
        ]
      },
      {
        phase: 'Practice',
        duration: '10 min',
        description: 'Usando o vocabulário',
        activities: [
          'Simon Says com palavras aprendidas',
          'Quiz oral em duplas',
          'Desenhar e legendar em inglês'
        ]
      }
    ],
    games: [
      {
        slug: 'ingles-vocabulario',
        title: 'Vocabulário em Inglês',
        usage: 'Aprendizado de palavras com áudio',
        duration: '30 min'
      },
      {
        slug: 'vocabulario-mundial',
        title: 'Vocabulário Mundial',
        usage: 'Comparação português-inglês',
        duration: '15 min extra'
      }
    ],
    assessment: [
      'Reconhecimento de palavras',
      'Pronúncia correta',
      'Associação imagem-palavra',
      'Uso em contexto simples'
    ],
    teacherTips: [
      'Use sempre o áudio do jogo',
      'Não corrija pronúncia excessivamente',
      'Celebre tentativas de falar'
    ],
    thumbnailColor: 'from-blue-600 to-red-500',
    featured: true
  },
  {
    id: 'ing-profissoes',
    slug: 'profissoes-em-ingles',
    title: 'Profissões em Múltiplos Idiomas',
    subject: 'Inglês',
    subjectIcon: '🇬🇧',
    grades: [5, 6, 7, 8, 9],
    duration: '3 aulas (50min cada)',
    difficulty: 'avancado',
    objectives: [
      'Aprender nomes de profissões em 6 idiomas',
      'Construir frases sobre profissões',
      'Desenvolver diálogos básicos',
      'Comparar idiomas e culturas'
    ],
    bnccCodes: ['EF06LI01', 'EF07LI01', 'EF08LI01'],
    materials: [
      'Computadores/tablets com áudio',
      'Quadro comparativo de idiomas',
      'Fones de ouvido',
      'Material de roleplay'
    ],
    steps: [
      {
        phase: 'Aula 1 - Inglês',
        duration: '50 min',
        description: 'Profissões em inglês',
        activities: [
          'Brainstorm de profissões conhecidas',
          'Jogar modo Inglês do jogo',
          'Frases: "I am a...", "I want to be..."',
          'Apresentação pessoal em inglês'
        ]
      },
      {
        phase: 'Aula 2 - Espanhol/Francês',
        duration: '50 min',
        description: 'Expandindo idiomas',
        activities: [
          'Comparar palavras similares',
          'Jogar modos Espanhol e Francês',
          'Identificar cognatos',
          'Mini-diálogos'
        ]
      },
      {
        phase: 'Aula 3 - Alemão/Italiano/Japonês',
        duration: '50 min',
        description: 'Explorando culturas',
        activities: [
          'Introdução a alfabetos diferentes',
          'Explorar todos os idiomas do jogo',
          'Criar glossário multilíngue',
          'Apresentação: profissão dos sonhos em 3 idiomas'
        ]
      }
    ],
    games: [
      {
        slug: 'profissoes-idiomas',
        title: 'Profissões em Idiomas',
        usage: 'Aprendizado multilíngue com áudio',
        duration: '30 min por aula'
      }
    ],
    assessment: [
      'Vocabulário em pelo menos 2 idiomas',
      'Pronúncia básica',
      'Construção de frases simples',
      'Comparação entre idiomas'
    ],
    extensions: [
      'Pesquisar profissões em outros países',
      'Entrevistar familiar sobre profissão',
      'Criar vídeo multilíngue'
    ],
    teacherTips: [
      'Não espere fluência, foque em exposição',
      'Valorize curiosidade linguística',
      'Use o jogo para auto-estudo também'
    ],
    thumbnailColor: 'from-purple-500 to-pink-500'
  },

  // ========== LÓGICA ==========
  {
    id: 'log-raciocinio',
    slug: 'desenvolvendo-raciocinio',
    title: 'Desenvolvendo o Raciocínio Lógico',
    subject: 'Lógica',
    subjectIcon: '🧩',
    grades: [3, 4, 5, 6, 7],
    duration: '2 aulas (50min cada)',
    difficulty: 'medio',
    objectives: [
      'Identificar padrões e sequências',
      'Resolver problemas de lógica',
      'Desenvolver pensamento estratégico',
      'Exercitar memória e atenção'
    ],
    bnccCodes: ['EF04MA11', 'EF05MA11', 'EF06MA33'],
    materials: [
      'Computadores/tablets',
      'Jogos de tabuleiro de lógica',
      'Fichas de desafios impressas',
      'Cronômetro'
    ],
    steps: [
      {
        phase: 'Aquecimento Mental',
        duration: '10 min',
        description: 'Ativando o cérebro',
        activities: [
          'Desafios rápidos orais',
          'Sequência de palmas',
          'Jogo de memória visual'
        ]
      },
      {
        phase: 'Desafios Digitais',
        duration: '30 min',
        description: 'Quebra-cabeças interativos',
        activities: [
          'Acessar "Quebra-cabeças de Lógica"',
          'Explorar diferentes tipos de desafios',
          'Sequências, sudoku, memória',
          'Registrar estratégias usadas'
        ]
      },
      {
        phase: 'Reflexão',
        duration: '10 min',
        description: 'Compartilhando estratégias',
        activities: [
          'Como você resolveu o desafio?',
          'Que estratégia funcionou melhor?',
          'Desafio final em grupo'
        ]
      }
    ],
    games: [
      {
        slug: 'quebra-cabecas-logica',
        title: 'Quebra-cabeças de Lógica',
        usage: 'Múltiplos tipos de desafios lógicos',
        duration: '30 min'
      }
    ],
    assessment: [
      'Conclusão de desafios',
      'Explicação do raciocínio',
      'Persistência diante de dificuldades',
      'Transferência para novos problemas'
    ],
    extensions: [
      'Criar desafios para colegas',
      'Campeonato de sudoku',
      'Clube de lógica'
    ],
    teacherTips: [
      'Valorize o processo, não só a resposta',
      'Permita colaboração entre alunos',
      'Ajuste dificuldade individualmente'
    ],
    thumbnailColor: 'from-indigo-500 to-purple-500',
    featured: true
  },

  // ========== INTERDISCIPLINAR ==========
  {
    id: 'inter-exploracao',
    slug: 'exploracao-mundos-fractais',
    title: 'Explorando Mundos Fractais',
    subject: 'Interdisciplinar',
    subjectIcon: '🎯',
    grades: [4, 5, 6, 7, 8, 9],
    duration: '2 aulas (50min cada)',
    difficulty: 'avancado',
    objectives: [
      'Compreender conceitos de fractais na natureza',
      'Desenvolver raciocínio espacial',
      'Praticar adaptação a regras variáveis',
      'Trabalhar resolução de problemas'
    ],
    bnccCodes: ['EF05MA16', 'EF06CI01', 'EF07MA23'],
    materials: [
      'Computadores/tablets',
      'Imagens de fractais na natureza',
      'Papel quadriculado',
      'Materiais para desenho'
    ],
    steps: [
      {
        phase: 'Introdução aos Fractais',
        duration: '15 min',
        description: 'O que são fractais?',
        activities: [
          'Mostrar fractais na natureza: brocólis, samambaias, raios',
          'Explicar padrões que se repetem',
          'Desenhar um fractal simples'
        ]
      },
      {
        phase: 'Exploração Digital',
        duration: '25 min',
        description: 'Jogo FRACTAL WORLDS',
        activities: [
          'Jogar "FRACTAL WORLDS" na EAI',
          'Explorar os 5 mundos temáticos',
          'Observar como as regras mudam',
          'Discutir estratégias de adaptação'
        ]
      },
      {
        phase: 'Conexões',
        duration: '10 min',
        description: 'Fractais e o mundo real',
        activities: [
          'Listar onde encontramos fractais',
          'Desenhar fractal inspirado na natureza',
          'Discussão: por que a natureza usa padrões?'
        ]
      }
    ],
    games: [
      {
        slug: 'fractal-worlds',
        title: 'FRACTAL WORLDS',
        usage: 'Exploração de mundos com regras dinâmicas',
        duration: '25 min'
      }
    ],
    assessment: [
      'Compreensão do conceito de fractal',
      'Adaptação às mudanças de regras',
      'Identificação de padrões',
      'Criatividade nos desenhos'
    ],
    extensions: [
      'Fotografar fractais na escola',
      'Criar fractal com colagem',
      'Pesquisar fractais na arte'
    ],
    teacherTips: [
      'Foque na beleza dos padrões',
      'Não se preocupe com matemática complexa',
      'Conecte sempre com exemplos visuais'
    ],
    thumbnailColor: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'inter-estrategia',
    slug: 'pensamento-estrategico',
    title: 'Pensamento Estratégico na Arena',
    subject: 'Interdisciplinar',
    subjectIcon: '🎯',
    grades: [5, 6, 7, 8, 9],
    duration: '2 aulas (50min cada)',
    difficulty: 'avancado',
    objectives: [
      'Desenvolver pensamento estratégico',
      'Praticar tomada de decisões',
      'Resolver problemas sob pressão',
      'Trabalhar em diferentes "papéis" (classes)'
    ],
    bnccCodes: ['EF05MA11', 'EF06MA33', 'EF07MA36'],
    materials: [
      'Computadores/tablets',
      'Quadro para discussão de estratégias',
      'Fichas de planejamento',
      'Timer'
    ],
    steps: [
      {
        phase: 'Contexto',
        duration: '10 min',
        description: 'Estratégia no dia a dia',
        activities: [
          'Discutir: o que é estratégia?',
          'Exemplos de estratégia em jogos e na vida',
          'Apresentar classes do NEXUS ARENA'
        ]
      },
      {
        phase: 'Batalha',
        duration: '30 min',
        description: 'Jogo estratégico',
        activities: [
          'Jogar "NEXUS ARENA" na EAI',
          'Experimentar diferentes classes',
          'Resolver desafios de lógica',
          'Anotar estratégias que funcionaram'
        ]
      },
      {
        phase: 'Debriefing',
        duration: '10 min',
        description: 'Análise das estratégias',
        activities: [
          'Compartilhar estratégias vencedoras',
          'Discutir: qual classe combina com você?',
          'Relacionar com habilidades da vida real'
        ]
      }
    ],
    games: [
      {
        slug: 'nexus-arena',
        title: 'NEXUS ARENA',
        usage: 'Desafios estratégicos com classes',
        duration: '30 min'
      }
    ],
    assessment: [
      'Capacidade de planejamento',
      'Adaptação a desafios',
      'Reflexão sobre escolhas',
      'Colaboração nas discussões'
    ],
    extensions: [
      'Criar estratégia para problema real',
      'Torneio de estratégia',
      'Diário de decisões'
    ],
    teacherTips: [
      'Não há classe "melhor" - todas têm valor',
      'Incentive experimentação',
      'Foque no processo de decisão'
    ],
    thumbnailColor: 'from-purple-600 to-pink-500'
  }
];

// Funções auxiliares
export function getLessonPlanBySlug(slug: string): LessonPlan | undefined {
  return lessonPlans.find(plan => plan.slug === slug);
}

export function getLessonPlansBySubject(subject: string): LessonPlan[] {
  if (subject === 'todos') return lessonPlans;
  return lessonPlans.filter(plan => plan.subject === subject);
}

export function getLessonPlansByGrade(grade: number): LessonPlan[] {
  return lessonPlans.filter(plan => plan.grades.includes(grade));
}

export function getLessonPlansByFilters(subject: string, grade: string): LessonPlan[] {
  return lessonPlans.filter(plan => {
    const matchSubject = subject === 'todos' || plan.subject === subject;
    const matchGrade = grade === 'todos' || plan.grades.includes(parseInt(grade));
    return matchSubject && matchGrade;
  });
}

export function getFeaturedLessonPlans(): LessonPlan[] {
  return lessonPlans.filter(plan => plan.featured);
}

export function getSubjects(): string[] {
  return Array.from(new Set(lessonPlans.map(plan => plan.subject)));
}

export function getGrades(): number[] {
  const grades = lessonPlans.flatMap(plan => plan.grades);
  return Array.from(new Set(grades)).sort((a, b) => a - b);
}
