# EAI Platform - Fullstack Architecture Document

**Versao:** 1.0
**Data:** 2025-12-27
**Status:** Draft
**Autor:** Architect Winston (BMAD-Method)

---

## 1. Introduction

Este documento define a arquitetura completa fullstack para a plataforma EAI, cobrindo frontend, backend e infraestrutura. Serve como fonte unica de verdade para desenvolvimento orientado por IA, garantindo consistencia em toda a stack tecnologica.

### 1.1 Starter Template

**N/A - Projeto Greenfield**

Iniciaremos do zero com Next.js 14+ usando App Router, seguindo as melhores praticas atuais para aplicacoes web modernas.

### 1.2 Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2025-12-27 | 1.0 | Criacao inicial | Architect Winston |

---

## 2. High Level Architecture

### 2.1 Technical Summary

A EAI sera construida como uma aplicacao **Next.js fullstack** deployada na **Vercel**, aproveitando Server-Side Rendering (SSR) para SEO e performance. O backend utiliza **API Routes do Next.js** para endpoints simples, com **PostgreSQL** (via Supabase ou Neon) para persistencia.

A arquitetura segue o padrao **Jamstack** com foco em performance: paginas estaticas onde possivel (catalogo de jogos), SSR para conteudo dinamico, e CDN global para assets. Jogos de terceiros sao embedados via iframe com sandbox apropriado.

Esta arquitetura minimalista e ideal para MVP rapido, com capacidade de escalar horizontalmente quando necessario.

### 2.2 Platform and Infrastructure Choice

**Plataforma Recomendada: Vercel + Supabase**

| Opcao | Pros | Cons |
|-------|------|------|
| **Vercel + Supabase** | Deploy instantaneo, edge functions, Supabase tem DB+Auth gratis, otimo DX | Vendor lock-in leve, custos escalam |
| AWS (Amplify + RDS) | Controle total, mais servicos | Complexidade maior, setup demorado |
| Railway + Neon | Simples, bom preco | Menos features edge |

**Decisao:** Vercel + Supabase

**Rationale:**
- Deploy zero-config para Next.js
- Tier gratuito generoso para MVP
- Edge network global (otimo para Brasil)
- Supabase oferece PostgreSQL + Auth + Storage em um so lugar
- Excelente developer experience para equipe pequena

**Key Services:**
- **Vercel:** Hosting frontend + API Routes + Edge Functions
- **Supabase:** PostgreSQL database + Auth (futuro) + Storage
- **Cloudflare:** CDN adicional para assets de jogos (opcional)

**Regions:**
- Primary: GRU (Sao Paulo) - Vercel Edge
- Database: South America (Supabase)

### 2.3 Repository Structure

**Estrutura:** Monorepo com npm workspaces

**Rationale:**
- Equipe pequena, facilita desenvolvimento
- Compartilhamento de tipos TypeScript
- Deploy coordenado frontend/backend
- Sem overhead de ferramentas complexas (Nx/Turborepo nao necessario no MVP)

**Package Organization:**
```
/eai
  /src              # App Next.js (frontend + API)
  /lib              # Codigo compartilhado
  /prisma           # Schema do banco
  /public           # Assets estaticos
```

### 2.4 High Level Architecture Diagram

```mermaid
graph TB
    subgraph "Users"
        U1[Jogador Casual]
        U2[Estudante Kids]
        U3[Pai/Professor]
    end

    subgraph "CDN Edge - Vercel"
        CDN[Edge Network]
        CACHE[Static Cache]
    end

    subgraph "Next.js Application"
        FE[Frontend SSR/SSG]
        API[API Routes]
        MW[Middleware]
    end

    subgraph "External Services"
        SUPA[(Supabase PostgreSQL)]
        GAMES[Game Embeds<br/>GameDistribution/etc]
        ANALYTICS[Google Analytics]
        SENTRY[Sentry]
    end

    U1 --> CDN
    U2 --> CDN
    U3 --> CDN

    CDN --> CACHE
    CACHE --> FE
    FE --> API
    API --> MW
    MW --> SUPA

    FE --> GAMES
    FE --> ANALYTICS
    API --> SENTRY
```

### 2.5 Architectural Patterns

- **Jamstack/SSG-First:** Paginas de catalogo geradas estaticamente, revalidacao incremental (ISR) para atualizacoes - _Rationale:_ Maximo performance e SEO, reduz carga no servidor

- **Server Components (React):** Componentes server-side por padrao, client components apenas quando necessario - _Rationale:_ Menor bundle size, melhor performance inicial

- **Repository Pattern:** Camada de acesso a dados abstrata com Prisma - _Rationale:_ Facilita testes e potencial migracao futura

- **Feature-Based Structure:** Organizacao por feature/dominio, nao por tipo tecnico - _Rationale:_ Melhor coesao, facilita navegacao do codigo

- **API Routes Simples:** Endpoints REST leves no Next.js, sem framework adicional - _Rationale:_ Menor complexidade para MVP, facil migracao futura se necessario

---

## 3. Tech Stack

### 3.1 Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.x | Type safety | Previne bugs, melhor DX |
| Frontend Framework | Next.js | 14.x | SSR/SSG/API | Melhor framework React fullstack |
| UI Component Library | shadcn/ui | latest | Componentes base | Customizavel, sem vendor lock-in |
| State Management | Zustand | 4.x | Client state | Simples, performante, sem boilerplate |
| Backend Language | TypeScript | 5.x | API Routes | Compartilha tipos com frontend |
| Backend Framework | Next.js API Routes | 14.x | REST endpoints | Zero config adicional |
| API Style | REST | - | HTTP endpoints | Simples, bem suportado |
| Database | PostgreSQL | 15.x | Dados relacionais | ACID, robusto, Supabase |
| ORM | Prisma | 5.x | Database access | Type-safe, migrations faceis |
| Cache | Vercel KV (Redis) | - | Session/cache | Integrado, edge-ready |
| File Storage | Supabase Storage | - | Imagens/assets | Integrado com DB |
| Authentication | NextAuth.js | 5.x | Auth (futuro) | Flexivel, muitos providers |
| Frontend Testing | Vitest + Testing Library | latest | Unit/integration | Rapido, compativel Jest |
| Backend Testing | Vitest | latest | API tests | Mesmo runner, consistencia |
| E2E Testing | Playwright | latest | Browser tests | Melhor suporte cross-browser |
| Build Tool | Next.js | 14.x | Build/bundle | Integrado |
| Bundler | Turbopack | - | Dev bundler | Rapido, futuro do Next.js |
| CSS Framework | Tailwind CSS | 3.x | Styling | Utility-first, produtivo |
| CI/CD | GitHub Actions | - | Automation | Integrado com repo |
| Monitoring | Vercel Analytics | - | Performance | Zero config |
| Error Tracking | Sentry | latest | Error monitoring | Industry standard |
| Logging | Vercel Logs + Pino | - | App logs | Structured logging |

---

## 4. Data Models

### 4.1 Game

**Purpose:** Representa um jogo no catalogo (Arcade ou Educacional)

**Key Attributes:**
- `id`: string (UUID) - Identificador unico
- `slug`: string - URL amigavel
- `title`: string - Nome do jogo
- `description`: string - Descricao curta
- `thumbnailUrl`: string - URL da imagem
- `embedUrl`: string - URL para embed (iframe)
- `area`: enum - ARCADE | EDUCATIONAL
- `category`: string - Categoria do jogo
- `subject`: string? - Materia (apenas educacional)
- `ageRange`: string? - Faixa etaria (apenas educacional)
- `educationalGoal`: string? - Objetivo educacional
- `tags`: string[] - Tags para busca
- `playCount`: number - Contador de jogadas
- `featured`: boolean - Destaque na home
- `active`: boolean - Ativo/inativo
- `createdAt`: DateTime
- `updatedAt`: DateTime

**TypeScript Interface:**
```typescript
interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  embedUrl: string;
  area: 'ARCADE' | 'EDUCATIONAL';
  category: string;
  subject?: string;
  ageRange?: string;
  educationalGoal?: string;
  tags: string[];
  playCount: number;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**
- Pertence a uma Category (many-to-one)
- Pode ter multiplas Tags (many-to-many)

---

### 4.2 Category

**Purpose:** Categorias de jogos para filtragem

**Key Attributes:**
- `id`: string (UUID)
- `slug`: string - URL amigavel
- `name`: string - Nome da categoria
- `area`: enum - ARCADE | EDUCATIONAL
- `icon`: string? - Icone/emoji
- `order`: number - Ordem de exibicao

**TypeScript Interface:**
```typescript
interface Category {
  id: string;
  slug: string;
  name: string;
  area: 'ARCADE' | 'EDUCATIONAL';
  icon?: string;
  order: number;
}
```

**Relationships:**
- Tem muitos Games (one-to-many)

---

### 4.3 NewsletterSubscription

**Purpose:** Emails para notificacao de lancamento (Profissional/Estudio)

**Key Attributes:**
- `id`: string (UUID)
- `email`: string - Email do inscrito
- `area`: enum - PROFESSIONAL | STUDIO
- `createdAt`: DateTime

**TypeScript Interface:**
```typescript
interface NewsletterSubscription {
  id: string;
  email: string;
  area: 'PROFESSIONAL' | 'STUDIO';
  createdAt: Date;
}
```

---

## 5. API Specification

### 5.1 REST API Specification

```yaml
openapi: 3.0.0
info:
  title: EAI Platform API
  version: 1.0.0
  description: API para plataforma de jogos EAI

servers:
  - url: https://eai.com.br/api
    description: Production
  - url: http://localhost:3000/api
    description: Development

paths:
  /health:
    get:
      summary: Health check
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: ok
                  timestamp:
                    type: string
                    format: date-time

  /games:
    get:
      summary: Listar jogos
      parameters:
        - name: area
          in: query
          schema:
            type: string
            enum: [ARCADE, EDUCATIONAL]
        - name: category
          in: query
          schema:
            type: string
        - name: subject
          in: query
          schema:
            type: string
        - name: ageRange
          in: query
          schema:
            type: string
        - name: featured
          in: query
          schema:
            type: boolean
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
        - name: offset
          in: query
          schema:
            type: integer
            default: 0
      responses:
        '200':
          description: Lista de jogos
          content:
            application/json:
              schema:
                type: object
                properties:
                  games:
                    type: array
                    items:
                      $ref: '#/components/schemas/Game'
                  total:
                    type: integer
                  hasMore:
                    type: boolean

  /games/{slug}:
    get:
      summary: Obter jogo por slug
      parameters:
        - name: slug
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Detalhes do jogo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Game'
        '404':
          description: Jogo nao encontrado

  /games/{slug}/play:
    post:
      summary: Registrar jogada (incrementa contador)
      parameters:
        - name: slug
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Jogada registrada
        '404':
          description: Jogo nao encontrado

  /games/search:
    get:
      summary: Buscar jogos
      parameters:
        - name: q
          in: query
          required: true
          schema:
            type: string
            minLength: 2
        - name: area
          in: query
          schema:
            type: string
            enum: [ARCADE, EDUCATIONAL]
      responses:
        '200':
          description: Resultados da busca
          content:
            application/json:
              schema:
                type: object
                properties:
                  results:
                    type: array
                    items:
                      $ref: '#/components/schemas/Game'
                  query:
                    type: string
                  total:
                    type: integer

  /categories:
    get:
      summary: Listar categorias
      parameters:
        - name: area
          in: query
          schema:
            type: string
            enum: [ARCADE, EDUCATIONAL]
      responses:
        '200':
          description: Lista de categorias
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Category'

  /newsletter:
    post:
      summary: Inscrever para newsletter
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - area
              properties:
                email:
                  type: string
                  format: email
                area:
                  type: string
                  enum: [PROFESSIONAL, STUDIO]
      responses:
        '201':
          description: Inscrito com sucesso
        '400':
          description: Email invalido
        '409':
          description: Email ja inscrito

components:
  schemas:
    Game:
      type: object
      properties:
        id:
          type: string
          format: uuid
        slug:
          type: string
        title:
          type: string
        description:
          type: string
        thumbnailUrl:
          type: string
          format: uri
        embedUrl:
          type: string
          format: uri
        area:
          type: string
          enum: [ARCADE, EDUCATIONAL]
        category:
          type: string
        subject:
          type: string
          nullable: true
        ageRange:
          type: string
          nullable: true
        educationalGoal:
          type: string
          nullable: true
        tags:
          type: array
          items:
            type: string
        playCount:
          type: integer
        featured:
          type: boolean

    Category:
      type: object
      properties:
        id:
          type: string
          format: uuid
        slug:
          type: string
        name:
          type: string
        area:
          type: string
          enum: [ARCADE, EDUCATIONAL]
        icon:
          type: string
          nullable: true
        order:
          type: integer
```

---

## 6. Components

### 6.1 Frontend Components

#### GameCatalog
**Responsibility:** Exibir grid de jogos com filtros e paginacao

**Key Interfaces:**
- `GameCatalogProps { area, initialGames, categories }`
- `useGameFilters()` hook para estado de filtros

**Dependencies:** GameCard, CategoryFilter, SearchBar

**Technology:** React Server Component com Client Components para interatividade

---

#### GameCard
**Responsibility:** Exibir card individual de jogo

**Key Interfaces:**
- `GameCardProps { game: Game, showArea?: boolean }`

**Dependencies:** Next/Image, Next/Link

**Technology:** React Server Component

---

#### GamePlayer
**Responsibility:** Embed e controle do player de jogos

**Key Interfaces:**
- `GamePlayerProps { game: Game }`
- `onPlay()` callback para registrar jogada

**Dependencies:** API client

**Technology:** React Client Component (requer interatividade)

---

#### SearchBar
**Responsibility:** Campo de busca global com autocomplete

**Key Interfaces:**
- `SearchBarProps { onSearch, placeholder }`
- `useSearch()` hook com debounce

**Dependencies:** API client

**Technology:** React Client Component

---

### 6.2 Backend Components

#### GamesService
**Responsibility:** Logica de negocios para jogos

**Key Interfaces:**
- `getGames(filters): Promise<GameListResponse>`
- `getGameBySlug(slug): Promise<Game | null>`
- `searchGames(query): Promise<Game[]>`
- `incrementPlayCount(slug): Promise<void>`

**Dependencies:** Prisma Client

---

#### CategoriesService
**Responsibility:** Gerenciamento de categorias

**Key Interfaces:**
- `getCategories(area?): Promise<Category[]>`

**Dependencies:** Prisma Client

---

#### NewsletterService
**Responsibility:** Gerenciamento de inscricoes

**Key Interfaces:**
- `subscribe(email, area): Promise<void>`
- `isSubscribed(email, area): Promise<boolean>`

**Dependencies:** Prisma Client

---

### 6.3 Component Diagram

```mermaid
graph TB
    subgraph "Frontend Layer"
        HP[HomePage]
        AC[ArcadeCatalog]
        EC[EducationalCatalog]
        GP[GamePlayer Page]
        SR[SearchResults]

        HP --> GC[GameCard]
        AC --> GC
        EC --> GC
        AC --> CF[CategoryFilter]
        EC --> CF
        HP --> SB[SearchBar]
        GP --> PLAYER[GamePlayer]
        GP --> RG[RelatedGames]
    end

    subgraph "API Layer"
        GAPI[/api/games]
        CAPI[/api/categories]
        NAPI[/api/newsletter]
    end

    subgraph "Service Layer"
        GS[GamesService]
        CS[CategoriesService]
        NS[NewsletterService]
    end

    subgraph "Data Layer"
        PRISMA[Prisma Client]
        DB[(PostgreSQL)]
    end

    AC --> GAPI
    EC --> GAPI
    SB --> GAPI
    CF --> CAPI
    PLAYER --> GAPI

    GAPI --> GS
    CAPI --> CS
    NAPI --> NS

    GS --> PRISMA
    CS --> PRISMA
    NS --> PRISMA
    PRISMA --> DB
```

---

## 7. Core Workflows

### 7.1 Fluxo: Usuario Joga um Game

```mermaid
sequenceDiagram
    participant U as Usuario
    participant FE as Frontend (Next.js)
    participant API as API Routes
    participant DB as PostgreSQL
    participant EXT as Game Embed (externo)

    U->>FE: Acessa /arcade/puzzle-master
    FE->>API: GET /api/games/puzzle-master
    API->>DB: SELECT * FROM games WHERE slug = ?
    DB-->>API: Game data
    API-->>FE: Game JSON
    FE->>FE: Renderiza pagina com iframe
    FE->>EXT: Carrega jogo no iframe
    EXT-->>U: Jogo carregado

    U->>FE: Clica "Jogar" / Interage
    FE->>API: POST /api/games/puzzle-master/play
    API->>DB: UPDATE games SET playCount = playCount + 1
    DB-->>API: OK
    API-->>FE: 200 OK
```

### 7.2 Fluxo: Busca de Jogos

```mermaid
sequenceDiagram
    participant U as Usuario
    participant SB as SearchBar (Client)
    participant API as API Routes
    participant DB as PostgreSQL

    U->>SB: Digita "corrida"
    SB->>SB: Debounce 300ms
    SB->>API: GET /api/games/search?q=corrida
    API->>DB: SELECT * FROM games WHERE title ILIKE '%corrida%'
    DB-->>API: Games matching
    API-->>SB: Search results JSON
    SB->>SB: Exibe resultados

    U->>SB: Clica em resultado
    SB->>SB: Navega para /arcade/[slug]
```

---

## 8. Database Schema

### 8.1 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum GameArea {
  ARCADE
  EDUCATIONAL
}

enum NewsletterArea {
  PROFESSIONAL
  STUDIO
}

model Game {
  id              String    @id @default(uuid())
  slug            String    @unique
  title           String
  description     String
  thumbnailUrl    String    @map("thumbnail_url")
  embedUrl        String    @map("embed_url")
  area            GameArea
  category        String
  subject         String?
  ageRange        String?   @map("age_range")
  educationalGoal String?   @map("educational_goal")
  tags            String[]
  playCount       Int       @default(0) @map("play_count")
  featured        Boolean   @default(false)
  active          Boolean   @default(true)
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")

  categoryRef     Category? @relation(fields: [categoryId], references: [id])
  categoryId      String?   @map("category_id")

  @@map("games")
  @@index([area])
  @@index([category])
  @@index([featured])
  @@index([active])
}

model Category {
  id    String   @id @default(uuid())
  slug  String   @unique
  name  String
  area  GameArea
  icon  String?
  order Int      @default(0)

  games Game[]

  @@map("categories")
  @@index([area])
}

model NewsletterSubscription {
  id        String         @id @default(uuid())
  email     String
  area      NewsletterArea
  createdAt DateTime       @default(now()) @map("created_at")

  @@unique([email, area])
  @@map("newsletter_subscriptions")
}
```

---

## 9. Frontend Architecture

### 9.1 Component Organization

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── arcade/
│   │   ├── page.tsx            # Catalogo Arcade
│   │   └── [slug]/
│   │       └── page.tsx        # Pagina do jogo
│   ├── educacional/
│   │   ├── page.tsx            # Catalogo Educacional
│   │   └── [slug]/
│   │       └── page.tsx        # Pagina do jogo
│   ├── busca/
│   │   └── page.tsx            # Resultados de busca
│   ├── profissional/
│   │   └── page.tsx            # Placeholder "Em Breve"
│   ├── estudio/
│   │   └── page.tsx            # Placeholder "Em Breve"
│   ├── sobre/
│   │   └── page.tsx            # Sobre
│   └── api/                    # API Routes
│       ├── health/
│       │   └── route.ts
│       ├── games/
│       │   ├── route.ts        # GET /api/games
│       │   ├── search/
│       │   │   └── route.ts    # GET /api/games/search
│       │   └── [slug]/
│       │       ├── route.ts    # GET /api/games/[slug]
│       │       └── play/
│       │           └── route.ts # POST /api/games/[slug]/play
│       ├── categories/
│       │   └── route.ts
│       └── newsletter/
│           └── route.ts
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── games/
│   │   ├── GameCard.tsx
│   │   ├── GameGrid.tsx
│   │   ├── GamePlayer.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── RelatedGames.tsx
│   ├── search/
│   │   ├── SearchBar.tsx
│   │   └── SearchResults.tsx
│   └── newsletter/
│       └── NewsletterForm.tsx
├── lib/
│   ├── prisma.ts               # Prisma client
│   ├── api.ts                  # API client
│   └── utils.ts                # Utilities
├── services/
│   ├── games.service.ts
│   ├── categories.service.ts
│   └── newsletter.service.ts
├── hooks/
│   ├── useSearch.ts
│   └── useGameFilters.ts
├── stores/
│   └── filters.store.ts        # Zustand store
└── types/
    └── index.ts                # TypeScript types
```

### 9.2 State Management

```typescript
// stores/filters.store.ts
import { create } from 'zustand';

interface FiltersState {
  category: string | null;
  subject: string | null;
  ageRange: string | null;
  searchQuery: string;

  setCategory: (category: string | null) => void;
  setSubject: (subject: string | null) => void;
  setAgeRange: (ageRange: string | null) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  category: null,
  subject: null,
  ageRange: null,
  searchQuery: '',

  setCategory: (category) => set({ category }),
  setSubject: (subject) => set({ subject }),
  setAgeRange: (ageRange) => set({ ageRange }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set({
    category: null,
    subject: null,
    ageRange: null,
    searchQuery: ''
  }),
}));
```

### 9.3 API Client

```typescript
// lib/api.ts
const API_BASE = '/api';

export const api = {
  games: {
    list: async (params?: Record<string, string>) => {
      const searchParams = new URLSearchParams(params);
      const res = await fetch(`${API_BASE}/games?${searchParams}`);
      if (!res.ok) throw new Error('Failed to fetch games');
      return res.json();
    },

    getBySlug: async (slug: string) => {
      const res = await fetch(`${API_BASE}/games/${slug}`);
      if (!res.ok) throw new Error('Game not found');
      return res.json();
    },

    search: async (query: string, area?: string) => {
      const params = new URLSearchParams({ q: query });
      if (area) params.append('area', area);
      const res = await fetch(`${API_BASE}/games/search?${params}`);
      if (!res.ok) throw new Error('Search failed');
      return res.json();
    },

    play: async (slug: string) => {
      const res = await fetch(`${API_BASE}/games/${slug}/play`, {
        method: 'POST',
      });
      return res.ok;
    },
  },

  categories: {
    list: async (area?: string) => {
      const params = area ? `?area=${area}` : '';
      const res = await fetch(`${API_BASE}/categories${params}`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  },

  newsletter: {
    subscribe: async (email: string, area: string) => {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, area }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  },
};
```

---

## 10. Unified Project Structure

```
eai/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, test, build
│       └── deploy.yml          # Auto deploy to Vercel
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # DB migrations
│   └── seed.ts                 # Seed data
├── public/
│   ├── images/
│   │   └── games/              # Game thumbnails (fallback)
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                    # Next.js App Router (see 9.1)
│   ├── components/             # React components
│   ├── lib/                    # Shared utilities
│   ├── services/               # Business logic
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # Zustand stores
│   └── types/                  # TypeScript definitions
├── tests/
│   ├── unit/                   # Unit tests
│   ├── integration/            # API tests
│   └── e2e/                    # Playwright tests
├── .env.example                # Environment template
├── .env.local                  # Local env (git ignored)
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
└── README.md
```

---

## 11. Development Workflow

### 11.1 Prerequisites

```bash
# Required
node >= 18.0.0
npm >= 9.0.0

# Optional
docker (for local PostgreSQL)
```

### 11.2 Initial Setup

```bash
# Clone repository
git clone git@github.com:inematds/EAI.git
cd EAI

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development
npm run dev
```

### 11.3 Development Commands

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Run type check
npm run type-check

# Run tests
npm run test           # Unit tests
npm run test:e2e       # E2E tests

# Database commands
npm run db:push        # Push schema changes
npm run db:seed        # Seed database
npm run db:studio      # Open Prisma Studio

# Build for production
npm run build

# Start production server
npm start
```

### 11.4 Environment Variables

```bash
# .env.local

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/eai"

# Supabase (production)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Error tracking
SENTRY_DSN="https://xxx@sentry.io/xxx"
```

---

## 12. Deployment Architecture

### 12.1 Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **CDN/Edge:** Vercel Edge Network (automatic)

**Backend Deployment:**
- **Platform:** Vercel (API Routes)
- **Build Command:** Same as frontend (unified)
- **Deployment Method:** Git push to main

**Database:**
- **Platform:** Supabase
- **Region:** South America
- **Backups:** Daily automatic

### 12.2 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

  build:
    runs-on: ubuntu-latest
    needs: lint-and-test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run build
```

### 12.3 Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|---------|
| Development | http://localhost:3000 | http://localhost:3000/api | Local development |
| Preview | https://eai-xxx.vercel.app | Same | PR previews |
| Production | https://eai.com.br | https://eai.com.br/api | Live environment |

---

## 13. Security and Performance

### 13.1 Security Requirements

**Frontend Security:**
- CSP Headers: Configurado via next.config.js, permitir iframes de fontes confiaveis
- XSS Prevention: React escape por padrao, DOMPurify para HTML dinamico
- Secure Storage: Nao armazenar dados sensiveis no MVP (sem auth ainda)

**Backend Security:**
- Input Validation: Zod para validacao de inputs em API Routes
- Rate Limiting: Vercel built-in + custom para endpoints criticos
- CORS Policy: Restrito ao dominio eai.com.br

**Game Embeds:**
- Sandbox iframe: `sandbox="allow-scripts allow-same-origin"`
- CSP frame-src: Whitelist de dominios de jogos confiaveis

### 13.2 Performance Optimization

**Frontend Performance:**
- Bundle Size Target: < 200KB initial JS
- Loading Strategy: SSG para catalogos, lazy load para componentes pesados
- Image Optimization: Next/Image com WebP automatico
- Caching: ISR com revalidate de 1 hora para catalogos

**Backend Performance:**
- Response Time Target: < 200ms para API calls
- Database: Indices em campos de filtro, connection pooling
- Caching: Vercel Edge Cache para GET requests publicos

---

## 14. Testing Strategy

### 14.1 Test Organization

```
tests/
├── unit/
│   ├── components/
│   │   └── GameCard.test.tsx
│   ├── services/
│   │   └── games.service.test.ts
│   └── utils/
│       └── helpers.test.ts
├── integration/
│   └── api/
│       ├── games.test.ts
│       └── categories.test.ts
└── e2e/
    ├── home.spec.ts
    ├── arcade.spec.ts
    └── search.spec.ts
```

### 14.2 Test Examples

**Frontend Component Test:**
```typescript
// tests/unit/components/GameCard.test.tsx
import { render, screen } from '@testing-library/react';
import { GameCard } from '@/components/games/GameCard';

const mockGame = {
  slug: 'test-game',
  title: 'Test Game',
  thumbnailUrl: '/images/test.jpg',
  category: 'Puzzle',
  area: 'ARCADE' as const,
};

describe('GameCard', () => {
  it('renders game title', () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText('Test Game')).toBeInTheDocument();
  });

  it('links to game page', () => {
    render(<GameCard game={mockGame} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/arcade/test-game');
  });
});
```

**Backend API Test:**
```typescript
// tests/integration/api/games.test.ts
import { describe, it, expect } from 'vitest';

describe('GET /api/games', () => {
  it('returns list of games', async () => {
    const res = await fetch('http://localhost:3000/api/games');
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.games).toBeInstanceOf(Array);
    expect(data).toHaveProperty('total');
  });

  it('filters by area', async () => {
    const res = await fetch('http://localhost:3000/api/games?area=ARCADE');
    const data = await res.json();

    expect(res.status).toBe(200);
    data.games.forEach((game: any) => {
      expect(game.area).toBe('ARCADE');
    });
  });
});
```

**E2E Test:**
```typescript
// tests/e2e/arcade.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Arcade Catalog', () => {
  test('displays games grid', async ({ page }) => {
    await page.goto('/arcade');

    await expect(page.locator('h1')).toContainText('Arcade');
    await expect(page.locator('[data-testid="game-card"]')).toHaveCount.greaterThan(0);
  });

  test('filters by category', async ({ page }) => {
    await page.goto('/arcade');

    await page.click('[data-testid="category-puzzle"]');
    await expect(page).toHaveURL(/categoria=puzzle/);
  });
});
```

---

## 15. Coding Standards

### 15.1 Critical Fullstack Rules

- **Type Sharing:** Definir tipos em `src/types/` e importar em todo o projeto
- **API Calls:** Sempre usar `lib/api.ts`, nunca fetch direto nos componentes
- **Environment Variables:** Acessar apenas via `process.env` em server components/API routes
- **Error Handling:** Todas API routes devem usar try/catch com resposta padronizada
- **State Updates:** Usar Zustand stores, nunca useState para estado compartilhado
- **Server vs Client:** Componentes sao Server por padrao, adicionar 'use client' apenas quando necessario
- **Database Access:** Apenas em API Routes e Server Components, nunca no cliente

### 15.2 Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `GameCard.tsx` |
| Hooks | camelCase com 'use' | `useSearch.ts` |
| API Routes | kebab-case folders | `/api/games/[slug]/route.ts` |
| Database Tables | snake_case | `newsletter_subscriptions` |
| TypeScript Types | PascalCase | `interface Game {}` |
| CSS Classes | kebab-case (Tailwind) | `game-card-title` |

---

## 16. Error Handling Strategy

### 16.1 Error Response Format

```typescript
// types/api.ts
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

interface ApiSuccess<T> {
  data: T;
}

type ApiResponse<T> = ApiSuccess<T> | ApiError;
```

### 16.2 Backend Error Handling

```typescript
// lib/api-handler.ts
import { NextResponse } from 'next/server';

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: Record<string, any>
) {
  return NextResponse.json(
    { error: { code, message, details } },
    { status }
  );
}

// Usage in API Route
export async function GET(request: Request) {
  try {
    const games = await gamesService.getGames();
    return successResponse({ games });
  } catch (error) {
    console.error('Error fetching games:', error);
    return errorResponse('FETCH_FAILED', 'Failed to fetch games', 500);
  }
}
```

---

## 17. Monitoring and Observability

### 17.1 Monitoring Stack

- **Frontend Monitoring:** Vercel Analytics (Web Vitals, page views)
- **Backend Monitoring:** Vercel Logs + custom logging
- **Error Tracking:** Sentry (frontend + backend)
- **Performance Monitoring:** Vercel Speed Insights

### 17.2 Key Metrics

**Frontend Metrics:**
- Core Web Vitals (LCP, FID, CLS)
- JavaScript errors
- Page load times
- User interactions (clicks em jogos)

**Backend Metrics:**
- Request rate por endpoint
- Error rate
- Response time (p50, p95, p99)
- Database query performance

---

## 18. Checklist Results Report

*A ser preenchido apos revisao com Architect Checklist*

---

*Document created using BMAD-METHOD framework*
*Last updated: 2025-12-27*
