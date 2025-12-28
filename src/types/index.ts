export type GameArea = 'ARCADE' | 'EDUCATIONAL';
export type NewsletterArea = 'PROFESSIONAL' | 'STUDIO';

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  embedUrl: string;
  area: GameArea;
  category: string;
  subject?: string | null;
  ageRange?: string | null;
  educationalGoal?: string | null;
  tags: string[];
  playCount: number;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  area: GameArea;
  icon?: string | null;
  order: number;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  area: NewsletterArea;
  createdAt: Date;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface GameListResponse {
  games: Game[];
  total: number;
  hasMore: boolean;
}

export interface SearchResponse {
  results: Game[];
  query: string;
  total: number;
}
