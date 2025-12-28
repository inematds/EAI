import { Game } from '@/types';
import { arcadeGames } from './arcade-games';
import { educationalGames } from './educational-games';

export function getAllGames(): Game[] {
  return [...arcadeGames, ...educationalGames];
}

export function searchGames(query: string): Game[] {
  if (!query || query.trim().length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const allGames = getAllGames();

  return allGames.filter((game) => {
    const matchTitle = game.title.toLowerCase().includes(normalizedQuery);
    const matchDescription = game.description.toLowerCase().includes(normalizedQuery);
    const matchCategory = game.category.toLowerCase().includes(normalizedQuery);
    const matchTags = game.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
    const matchSubject = game.subject?.toLowerCase().includes(normalizedQuery);

    return matchTitle || matchDescription || matchCategory || matchTags || matchSubject;
  });
}

export function searchGamesByArea(query: string, area: 'ARCADE' | 'EDUCATIONAL'): Game[] {
  const results = searchGames(query);
  return results.filter((game) => game.area === area);
}
