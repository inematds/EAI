import { Game } from '@/types';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: Game[];
  showFeatured?: boolean;
}

export function GameGrid({ games, showFeatured = true }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
        <p className="text-zinc-600">Nenhum jogo encontrado nesta categoria.</p>
      </div>
    );
  }

  const featuredGames = showFeatured ? games.filter((g) => g.featured) : [];
  const regularGames = showFeatured ? games.filter((g) => !g.featured) : games;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {featuredGames.map((game) => (
        <GameCard key={game.id} game={game} variant="featured" />
      ))}
      {regularGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
