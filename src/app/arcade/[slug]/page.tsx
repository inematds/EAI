import Link from 'next/link';
import { ArrowLeft, Gamepad2, Play, Tag, TrendingUp } from 'lucide-react';
import { GamePlayer, RelatedGames } from '@/components/games';
import { getGameBySlug, getRelatedGames, arcadeGames } from '@/data/arcade-games';

// Gera os parâmetros estáticos para export
export function generateStaticParams() {
  return arcadeGames.map((game) => ({
    slug: game.slug,
  }));
}

interface GamePageProps {
  params: { slug: string };
}

export default function GamePage({ params }: GamePageProps) {
  const { slug } = params;
  const game = getGameBySlug(slug);

  if (!game) {
    return (
      <main className="flex-1">
        <div className="container-main py-8 text-center">
          <h1 className="font-display text-2xl font-bold text-zinc-900 mb-4">
            Jogo não encontrado
          </h1>
          <p className="text-zinc-600 mb-6">O jogo que você procura não existe.</p>
          <Link href="/arcade" className="text-arcade hover:underline">
            Voltar para Arcade
          </Link>
        </div>
      </main>
    );
  }

  const relatedGames = getRelatedGames(game, 4);

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/arcade" className="hover:text-primary transition">
            Arcade
          </Link>
          <span>/</span>
          <span className="text-zinc-900 line-clamp-1">{game.title}</span>
        </nav>

        {/* Game Player */}
        <div className="mb-8">
          <GamePlayer game={game} />
        </div>

        {/* Game Info */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Title and Description */}
            <h1 className="font-display text-2xl font-bold text-zinc-900 sm:text-3xl mb-4">
              {game.title}
            </h1>
            <p className="text-zinc-600 text-lg mb-6">{game.description}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 rounded-lg bg-arcade/10 px-4 py-2 text-sm">
                <Gamepad2 className="h-4 w-4 text-arcade" />
                <span className="font-medium text-zinc-700">{game.category}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary/10 px-4 py-2 text-sm">
                <TrendingUp className="h-4 w-4 text-secondary" />
                <span className="font-medium text-zinc-700">
                  {game.playCount.toLocaleString('pt-BR')} jogadas
                </span>
              </div>
            </div>

            {/* Tags */}
            {game.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="flex items-center gap-2 text-sm font-medium text-zinc-500 mb-3">
                  <Tag className="h-4 w-4" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Play Button */}
            <a
              href="#game-container"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-arcade py-4 text-lg font-semibold text-white transition hover:bg-arcade-dark"
            >
              <Play className="h-5 w-5 fill-current" />
              Jogar Agora
            </a>

            {/* Share */}
            <div className="rounded-xl border border-zinc-200 p-4">
              <h3 className="font-display font-semibold text-zinc-900 mb-3">
                Compartilhar
              </h3>
              <p className="text-sm text-zinc-500">
                Gostou do jogo? Compartilhe com seus amigos!
              </p>
            </div>
          </div>
        </div>

        {/* Related Games */}
        <div className="mt-12 pt-8 border-t border-zinc-200">
          <RelatedGames games={relatedGames} />
        </div>

        {/* Back to Arcade */}
        <div className="mt-8 text-center">
          <Link
            href="/arcade"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-arcade transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Arcade
          </Link>
        </div>
      </div>
    </main>
  );
}
