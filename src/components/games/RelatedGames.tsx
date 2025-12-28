import { Game } from '@/types';
import { GameCard } from './GameCard';

interface RelatedGamesProps {
  games: Game[];
  title?: string;
}

export function RelatedGames({ games, title = 'Jogos Relacionados' }: RelatedGamesProps) {
  if (games.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-xl font-bold text-zinc-900 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
