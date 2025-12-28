# EAI Platform - Product Requirements Document (PRD)

**Versao:** 1.0
**Data:** 2025-12-27
**Status:** Draft
**Autor:** PM John (BMAD-Method)

---

## 1. Goals and Background Context

### 1.1 Goals

- Lancar plataforma web de jogos casuais estilo Poki com diferencial educacional
- Atingir 10.000 usuarios ativos mensais em 6 meses pos-lancamento
- Estabelecer EAI como referencia em jogos educacionais no Brasil
- Validar modelo freemium (free sem cadastro → premium)
- Criar base para expansao futura (area profissional, estudio)

### 1.2 Background Context

O mercado de jogos casuais web e dominado por plataformas como Poki e CrazyGames, que focam exclusivamente em entretenimento. Simultaneamente, plataformas educacionais sofrem com baixo engajamento por nao competirem com a experiencia de jogos modernos.

EAI surge para preencher esse gap: uma plataforma unica que combina jogos casuais atrativos com conteudo educacional de qualidade. O nome carrega multiplos significados (Education And Interaction, Entertainment AI, "E ai?!") para conectar com diferentes audiencias.

O MVP foca em duas areas: Arcade (jogos casuais) e Educacional (jogos para criancas), atendendo as personas prioritarias: Jogador Casual (8-25 anos) e Estudante Kids (6-12 anos).

### 1.3 Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2025-12-27 | 1.0 | Criacao inicial do PRD | PM John |

---

## 2. Requirements

### 2.1 Functional Requirements

**Homepage & Navegacao**
- FR1: O sistema deve exibir homepage unificada apresentando todas as areas do ecossistema (Arcade, Educacional, Profissional*, Estudio*)
- FR2: O sistema deve permitir navegacao clara entre areas atraves de menu principal
- FR3: O sistema deve exibir jogos em destaque na homepage
- FR4: O sistema deve funcionar sem necessidade de cadastro ou login

**Area Arcade**
- FR5: O sistema deve exibir catalogo de jogos casuais organizados por categoria
- FR6: O sistema deve suportar categorias: Acao, Puzzle, Aventura, Corrida, Esportes, Multiplayer
- FR7: O sistema deve permitir busca de jogos por nome
- FR8: O sistema deve permitir filtros por categoria e popularidade
- FR9: O sistema deve exibir minimo de 20-30 jogos no lancamento
- FR10: O sistema deve exibir thumbnail, titulo e descricao breve de cada jogo

**Area Educacional**
- FR11: O sistema deve exibir catalogo de jogos educativos para criancas
- FR12: O sistema deve organizar jogos por materia (Matematica, Portugues, Ciencias, Ingles)
- FR13: O sistema deve organizar jogos por faixa etaria (6-8, 9-10, 11-12 anos)
- FR14: O sistema deve exibir minimo de 10-15 jogos educativos no lancamento
- FR15: O sistema deve destacar o objetivo educacional de cada jogo

**Player de Jogos**
- FR16: O sistema deve executar jogos HTML5/WebGL em player embedded (iframe)
- FR17: O sistema deve exibir jogos em tela cheia quando solicitado
- FR18: O sistema deve permitir retorno a navegacao sem perder contexto
- FR19: O sistema deve exibir jogos relacionados/sugeridos apos cada sessao

**Conteudo & Catalogo**
- FR20: O sistema deve suportar adicao de novos jogos via painel admin (futuro)
- FR21: O sistema deve categorizar jogos com tags para melhor descoberta
- FR22: O sistema deve exibir contador de jogadas/popularidade

**Areas Futuras (UI Placeholder)**
- FR23: O sistema deve exibir areas "Profissional" e "Estudio" como "Em Breve"
- FR24: O sistema deve permitir usuarios se inscreverem para notificacao de lancamento

### 2.2 Non-Functional Requirements

**Performance**
- NFR1: First Contentful Paint deve ser < 3 segundos
- NFR2: Time to Interactive deve ser < 5 segundos
- NFR3: Jogos devem carregar em < 5 segundos em conexao 4G
- NFR4: Plataforma deve suportar 1000 usuarios simultaneos no MVP

**Disponibilidade**
- NFR5: Uptime minimo de 99% (exceto manutencoes programadas)
- NFR6: Manutencoes devem ser agendadas fora do horario de pico (8h-22h BRT)

**Compatibilidade**
- NFR7: Suporte a Chrome, Firefox, Safari, Edge (ultimas 2 versoes)
- NFR8: Design responsivo para desktop, tablet e mobile
- NFR9: Suporte a resolucoes de 320px a 4K

**Seguranca**
- NFR10: HTTPS obrigatorio em toda plataforma
- NFR11: Headers de seguranca (CSP, X-Frame-Options para jogos terceiros)
- NFR12: Sanitizacao de inputs de busca contra XSS

**SEO & Acessibilidade**
- NFR13: Paginas devem ter meta tags otimizadas para SEO
- NFR14: Estrutura semantica HTML5 para crawlers
- NFR15: Acessibilidade basica (WCAG A) - navegacao por teclado, alt texts

**Escalabilidade**
- NFR16: Arquitetura preparada para CDN de assets estaticos
- NFR17: Separacao clara entre frontend e backend para escala independente

---

## 3. User Interface Design Goals

### 3.1 Overall UX Vision

Interface moderna, vibrante e intuitiva que transmita diversao e aprendizado. Design inspirado em Poki/CrazyGames mas com identidade propria e foco educacional. A experiencia deve ser tao fluida que usuarios joguem sem perceber que estao em uma plataforma educacional.

**Principios:**
- Zero fricção: jogar sem cadastro, sem popups, sem barreiras
- Descoberta facil: encontrar jogos rapidamente
- Visual atrativo: cores vibrantes, thumbnails de qualidade
- Confianca para pais: visual profissional, conteudo curado

### 3.2 Key Interaction Paradigms

- **Browse & Play:** Navegar por categorias, clicar e jogar instantaneamente
- **Search & Filter:** Busca rapida com autocomplete, filtros intuitivos
- **Fullscreen Gaming:** Transicao suave para modo fullscreen
- **Quick Return:** Voltar a navegacao sem perder fluxo
- **Discovery:** Sugestoes de jogos relacionados para manter engajamento

### 3.3 Core Screens and Views

| Tela | Descricao | Prioridade |
|------|-----------|------------|
| Homepage | Visao geral com destaques e acesso as areas | MVP |
| Arcade - Catalogo | Grid de jogos casuais com filtros | MVP |
| Educacional - Catalogo | Grid de jogos educativos com filtros por materia/idade | MVP |
| Pagina do Jogo | Player embedded + info + jogos relacionados | MVP |
| Busca/Resultados | Resultados de busca com filtros | MVP |
| Profissional (Placeholder) | Tela "Em Breve" com captura de email | MVP |
| Estudio (Placeholder) | Tela "Em Breve" com captura de email | MVP |

### 3.4 Accessibility

**WCAG A** (basico):
- Navegacao por teclado funcional
- Alt texts em imagens
- Contraste minimo de texto
- Focus states visiveis

### 3.5 Branding

- **Nome:** EAI
- **Tagline:** "Jogue. Aprenda. Evolua."
- **Cores:** A definir (sugestao: vibrantes, amigaveis para criancas)
- **Tom:** Divertido, acessivel, moderno
- **Logo:** A criar

### 3.6 Target Device and Platforms

**Web Responsive** - Desktop, Tablet, Mobile

| Dispositivo | Experiencia |
|-------------|-------------|
| Desktop | Experiencia completa, grid amplo |
| Tablet | Grid adaptado, touch-friendly |
| Mobile | Layout single-column, jogos fullscreen |

---

## 4. Technical Assumptions

### 4.1 Repository Structure

**Monorepo** - Frontend e Backend no mesmo repositorio

Rationale: Equipe pequena, facilita desenvolvimento e deploy coordenado. Estrutura sugerida:
```
/eai
  /apps
    /web (frontend Next.js)
    /api (backend Node.js)
  /packages
    /shared (tipos, utils compartilhados)
  /docs
```

### 4.2 Service Architecture

**Monolito Modular** preparado para microservicos futuros

- Frontend: Next.js (SSR para SEO, React para interatividade)
- Backend: Node.js com Express ou Fastify
- Database: PostgreSQL (relacional, ACID)
- Cache: Redis (sessoes, cache de catalogo)
- Hosting: Vercel (frontend) + Railway/Render (backend) ou AWS

Rationale: MVP rapido com arquitetura que escala. Monolito modular permite extrair servicos quando necessario.

### 4.3 Testing Requirements

**Unit + Integration**

- Unit tests para logica de negocios (Jest)
- Integration tests para API endpoints
- E2E smoke tests para fluxos criticos (Playwright)
- Coverage minimo: 70% para codigo critico

### 4.4 Additional Technical Assumptions

- Jogos serao embedados via iframe de fontes terceiras (GameDistribution, etc.)
- Jogos educacionais proprios podem ser desenvolvidos com Phaser.js futuramente
- CDN (Cloudflare/AWS CloudFront) para assets estaticos
- Analytics: Google Analytics ou Plausible
- Monitoramento: Sentry para erros, basic health checks
- CI/CD: GitHub Actions para deploy automatico
- Ambiente: Development, Staging, Production

---

## 5. Epic List

### Epics Overview

| Epic | Titulo | Objetivo |
|------|--------|----------|
| 1 | Fundacao & Infraestrutura | Setup do projeto, deploy pipeline, homepage basica |
| 2 | Catalogo Arcade | Area de jogos casuais com navegacao e player |
| 3 | Catalogo Educacional | Area de jogos educativos com filtros especificos |
| 4 | Busca & Descoberta | Sistema de busca, filtros avancados, sugestoes |
| 5 | Polish & Lancamento | Otimizacoes, SEO, areas placeholder, preparacao lancamento |

---

## 6. Epic Details

### Epic 1: Fundacao & Infraestrutura

**Objetivo:** Estabelecer a base tecnica do projeto com setup completo de desenvolvimento, deploy automatizado e homepage funcional que apresenta a visao do ecossistema EAI.

#### Story 1.1: Setup do Projeto e Repositorio

**Como** desenvolvedor,
**Quero** um projeto Next.js configurado com TypeScript e estrutura monorepo,
**Para que** possamos iniciar o desenvolvimento com boas praticas desde o inicio.

**Acceptance Criteria:**
1. Repositorio Git inicializado com estrutura monorepo (/apps/web, /packages/shared)
2. Next.js 14+ configurado com TypeScript, ESLint, Prettier
3. Tailwind CSS configurado para estilizacao
4. Package.json com scripts de dev, build, lint
5. README com instrucoes de setup local
6. .gitignore apropriado configurado

---

#### Story 1.2: Pipeline de Deploy e Infraestrutura

**Como** desenvolvedor,
**Quero** pipeline CI/CD configurado com deploy automatico,
**Para que** cada push na main seja deployado automaticamente.

**Acceptance Criteria:**
1. GitHub Actions configurado para CI (lint, build, test)
2. Deploy automatico para Vercel (ou similar) na branch main
3. Ambiente de preview para pull requests
4. Variaveis de ambiente configuradas (dev/prod)
5. Health check endpoint /api/health retornando status 200
6. Dominio configurado (eai.com.br ou similar)

---

#### Story 1.3: Homepage com Visao do Ecossistema

**Como** visitante,
**Quero** ver uma homepage atraente que apresente todas as areas do EAI,
**Para que** eu entenda o que a plataforma oferece e navegue facilmente.

**Acceptance Criteria:**
1. Header com logo EAI e navegacao principal (Arcade, Educacional, Profissional, Estudio)
2. Hero section com tagline "Jogue. Aprenda. Evolua." e CTA
3. Secao de destaque para cada area com cards clicaveis
4. Footer com links basicos (Sobre, Contato, Termos)
5. Design responsivo funcionando em mobile, tablet, desktop
6. Cores e tipografia seguindo identidade visual EAI
7. Performance: LCP < 3s

---

#### Story 1.4: Layout Base e Componentes UI

**Como** desenvolvedor,
**Quero** componentes UI reutilizaveis criados,
**Para que** possamos construir as demais paginas de forma consistente.

**Acceptance Criteria:**
1. Componente Header reutilizavel com navegacao
2. Componente Footer reutilizavel
3. Componente Card para exibicao de jogos (thumbnail, titulo, categoria)
4. Componente Button com variantes (primary, secondary, outline)
5. Componente Grid responsivo para listagem de jogos
6. Todos componentes documentados com exemplos
7. Testes unitarios para componentes criticos

---

### Epic 2: Catalogo Arcade

**Objetivo:** Criar a area de jogos casuais completa, permitindo usuarios navegarem, filtrarem e jogarem jogos HTML5 diretamente na plataforma.

#### Story 2.1: Pagina de Catalogo Arcade

**Como** jogador casual,
**Quero** ver todos os jogos casuais disponiveis em um grid organizado,
**Para que** eu possa escolher o que jogar facilmente.

**Acceptance Criteria:**
1. Pagina /arcade exibindo grid de jogos
2. Cada jogo mostra: thumbnail, titulo, categoria
3. Grid responsivo (4 colunas desktop, 2 tablet, 1 mobile)
4. Ordenacao padrao por popularidade
5. Paginacao ou infinite scroll para +20 jogos
6. Loading states enquanto carrega
7. Estado vazio se nao houver jogos

---

#### Story 2.2: Filtros por Categoria Arcade

**Como** jogador casual,
**Quero** filtrar jogos por categoria (Acao, Puzzle, Aventura, etc.),
**Para que** eu encontre jogos do meu genero favorito.

**Acceptance Criteria:**
1. Sidebar ou tabs com categorias disponiveis
2. Categorias: Acao, Puzzle, Aventura, Corrida, Esportes, Multiplayer
3. Clique em categoria filtra o grid instantaneamente
4. URL atualizada com filtro (/arcade?categoria=puzzle)
5. Contador de jogos por categoria
6. Opcao "Todos" para remover filtro
7. Estado visual indicando categoria ativa

---

#### Story 2.3: Player de Jogos Embedded

**Como** jogador,
**Quero** jogar jogos diretamente no site sem sair da pagina,
**Para que** minha experiencia seja fluida e integrada.

**Acceptance Criteria:**
1. Pagina /arcade/[slug] para cada jogo
2. Iframe responsivo que carrega o jogo HTML5
3. Botao de fullscreen funcional
4. Titulo do jogo e descricao visivel
5. Botao "Voltar ao Catalogo" claramente visivel
6. Loading indicator enquanto jogo carrega
7. Tratamento de erro se jogo nao carregar

---

#### Story 2.4: Jogos Relacionados e Sugestoes

**Como** jogador,
**Quero** ver jogos similares apos jogar,
**Para que** eu descubra mais jogos do meu interesse.

**Acceptance Criteria:**
1. Secao "Jogos Relacionados" na pagina do jogo
2. Exibir 4-6 jogos da mesma categoria
3. Cards clicaveis que levam a pagina do jogo
4. Secao aparece abaixo do player
5. Titulo "Voce tambem pode gostar" ou similar

---

#### Story 2.5: Dados de Jogos Arcade (Seed)

**Como** sistema,
**Quero** ter dados de jogos arcade cadastrados,
**Para que** o catalogo tenha conteudo no lancamento.

**Acceptance Criteria:**
1. Arquivo JSON/database com minimo 20 jogos arcade
2. Cada jogo tem: id, slug, titulo, descricao, thumbnail_url, embed_url, categoria, tags
3. Jogos de fontes publicas (GameDistribution, itch.io embeds, etc.)
4. Thumbnails hospedados ou com URLs validas
5. Dados validados e sem erros
6. Script de seed para popular database

---

### Epic 3: Catalogo Educacional

**Objetivo:** Criar a area de jogos educativos para criancas, com filtros especificos por materia e faixa etaria, destacando o valor educacional.

#### Story 3.1: Pagina de Catalogo Educacional

**Como** pai/professor,
**Quero** ver jogos educativos organizados de forma clara,
**Para que** eu encontre conteudo apropriado para criancas.

**Acceptance Criteria:**
1. Pagina /educacional exibindo grid de jogos educativos
2. Visual levemente diferenciado do Arcade (mais "infantil/educativo")
3. Cada jogo mostra: thumbnail, titulo, materia, faixa etaria
4. Badge indicando objetivo educacional (ex: "Matematica - Adicao")
5. Grid responsivo consistente com Arcade
6. Mensagem destacando que conteudo e curado/seguro

---

#### Story 3.2: Filtros por Materia e Idade

**Como** pai/professor,
**Quero** filtrar jogos por materia e faixa etaria,
**Para que** eu encontre jogos adequados ao nivel da crianca.

**Acceptance Criteria:**
1. Filtro por Materia: Matematica, Portugues, Ciencias, Ingles
2. Filtro por Faixa Etaria: 6-8 anos, 9-10 anos, 11-12 anos
3. Filtros podem ser combinados
4. URL atualizada com filtros
5. Contador de resultados atualizado
6. Chips/badges mostrando filtros ativos
7. Botao "Limpar Filtros"

---

#### Story 3.3: Pagina de Jogo Educacional

**Como** crianca,
**Quero** jogar jogos educativos de forma divertida,
**Para que** eu aprenda brincando.

**Acceptance Criteria:**
1. Pagina /educacional/[slug] para cada jogo
2. Player embedded identico ao Arcade
3. Destaque do objetivo educacional do jogo
4. Indicacao de materia e faixa etaria
5. Secao "O que voce vai aprender"
6. Jogos relacionados da mesma materia
7. Visual amigavel para criancas

---

#### Story 3.4: Dados de Jogos Educacionais (Seed)

**Como** sistema,
**Quero** ter dados de jogos educacionais cadastrados,
**Para que** o catalogo tenha conteudo no lancamento.

**Acceptance Criteria:**
1. Arquivo JSON/database com minimo 10-15 jogos educacionais
2. Campos: id, slug, titulo, descricao, thumbnail_url, embed_url, materia, faixa_etaria, objetivo_educacional
3. Jogos de fontes confiaveis (sites educacionais, embeds permitidos)
4. Distribuicao entre materias (min 2 por materia)
5. Cobertura das 3 faixas etarias
6. Dados validados e URLs funcionando

---

### Epic 4: Busca & Descoberta

**Objetivo:** Implementar sistema de busca e filtros avancados para facilitar descoberta de jogos em toda plataforma.

#### Story 4.1: Barra de Busca Global

**Como** usuario,
**Quero** buscar jogos por nome em qualquer pagina,
**Para que** eu encontre rapidamente o que procuro.

**Acceptance Criteria:**
1. Campo de busca no header, visivel em todas as paginas
2. Busca por titulo do jogo (case-insensitive, parcial)
3. Resultados aparecem em pagina /busca?q=termo
4. Busca abrange Arcade e Educacional
5. Indicacao de qual area cada resultado pertence
6. Mensagem "Nenhum resultado" se vazio
7. Minimo 2 caracteres para buscar

---

#### Story 4.2: Pagina de Resultados de Busca

**Como** usuario,
**Quero** ver resultados de busca organizados,
**Para que** eu escolha o jogo desejado.

**Acceptance Criteria:**
1. Pagina /busca exibindo resultados em grid
2. Titulo "Resultados para: {termo}"
3. Contador de resultados encontrados
4. Cards de jogos com indicacao da area (Arcade/Educacional)
5. Filtro lateral para refinar por area
6. Ordenacao por relevancia (match no titulo)
7. Link para limpar busca e voltar ao inicio

---

#### Story 4.3: Jogos em Destaque na Homepage

**Como** usuario,
**Quero** ver jogos populares/destacados na homepage,
**Para que** eu descubra jogos interessantes rapidamente.

**Acceptance Criteria:**
1. Secao "Jogos em Destaque" na homepage
2. Carrossel ou grid com 6-8 jogos selecionados
3. Mix de jogos Arcade e Educacionais
4. Marcacao visual distinguindo a area
5. Clique leva a pagina do jogo
6. Selecao manual ou por popularidade

---

### Epic 5: Polish & Lancamento

**Objetivo:** Finalizar detalhes, otimizar performance, implementar SEO e preparar areas placeholder para lancamento.

#### Story 5.1: Areas Placeholder (Profissional & Estudio)

**Como** visitante,
**Quero** saber que existem mais areas chegando,
**Para que** eu fique animado e volte no futuro.

**Acceptance Criteria:**
1. Pagina /profissional com design "Em Breve"
2. Pagina /estudio com design "Em Breve"
3. Breve descricao do que sera cada area
4. Campo de email para "Avise-me quando lancar"
5. Emails salvos em database ou servico (Mailchimp, etc.)
6. Confirmacao visual apos inscricao
7. Links no menu principal funcionando

---

#### Story 5.2: SEO e Meta Tags

**Como** sistema,
**Quero** paginas otimizadas para mecanismos de busca,
**Para que** usuarios encontrem EAI organicamente.

**Acceptance Criteria:**
1. Meta title e description em todas as paginas
2. Open Graph tags para compartilhamento social
3. Sitemap.xml gerado automaticamente
4. Robots.txt configurado apropriadamente
5. URLs amigaveis (slugs em portugues)
6. Heading hierarchy correta (h1, h2, h3)
7. Schema.org markup para jogos (opcional)

---

#### Story 5.3: Performance e Otimizacoes

**Como** usuario,
**Quero** que a plataforma carregue rapidamente,
**Para que** minha experiencia seja fluida.

**Acceptance Criteria:**
1. Imagens otimizadas (WebP, lazy loading)
2. Code splitting implementado (Next.js automatico)
3. Fonts otimizadas (preload, display swap)
4. Lighthouse Performance score > 80
5. Core Web Vitals no verde (LCP, FID, CLS)
6. Caching de assets estaticos configurado
7. Gzip/Brotli compression ativo

---

#### Story 5.4: Pagina Sobre e Termos

**Como** visitante,
**Quero** saber mais sobre a EAI e seus termos,
**Para que** eu confie na plataforma.

**Acceptance Criteria:**
1. Pagina /sobre com historia e missao da EAI
2. Pagina /termos com termos de uso basicos
3. Pagina /privacidade com politica de privacidade
4. Links no footer funcionando
5. Conteudo adequado para plataforma voltada a criancas
6. Design consistente com resto do site

---

#### Story 5.5: Analytics e Monitoramento

**Como** product manager,
**Quero** dados de uso da plataforma,
**Para que** possamos medir sucesso e iterar.

**Acceptance Criteria:**
1. Google Analytics ou Plausible configurado
2. Eventos trackeados: page views, cliques em jogos, tempo na pagina
3. Sentry configurado para captura de erros
4. Dashboard basico de metricas acessivel
5. Alertas configurados para erros criticos
6. LGPD: banner de cookies se necessario

---

## 7. Checklist Results Report

*A ser preenchido apos revisao com PM Checklist*

---

## 8. Next Steps

### 8.1 UX Expert Prompt

> Sally, revise este PRD e o Project Brief para criar a especificacao de front-end da EAI. Foque em: design system, wireframes das telas principais (Homepage, Catalogo Arcade, Catalogo Educacional, Player de Jogo), e guia de estilo visual que transmita diversao + educacao. Considere o publico jovem (8-25) e criancas (6-12).

### 8.2 Architect Prompt

> Winston, revise este PRD e o Project Brief para criar a arquitetura tecnica da EAI. Foque em: estrutura do monorepo Next.js, modelo de dados para jogos e categorias, estrategia de embed de jogos terceiros, infraestrutura de deploy (Vercel + backend), e consideracoes de performance para carregamento de jogos.

---

*Document created using BMAD-METHOD framework*
*Last updated: 2025-12-27*
