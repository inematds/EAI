import Link from 'next/link';
import { ArrowLeft, BookOpen, Tag, TrendingUp, GraduationCap, Users } from 'lucide-react';
import { GamePlayer, RelatedGames } from '@/components/games';
import { getEducationalGameBySlug, getRelatedEducationalGames, educationalGames } from '@/data/educational-games';

// Gera os parâmetros estáticos para export
export function generateStaticParams() {
  return educationalGames.map((game) => ({
    slug: game.slug,
  }));
}

interface GamePageProps {
  params: { slug: string };
}

export default function EducationalGamePage({ params }: GamePageProps) {
  const { slug } = params;
  const game = getEducationalGameBySlug(slug);

  if (!game) {
    return (
      <main className="flex-1">
        <div className="container-main py-8 text-center">
          <h1 className="font-display text-2xl font-bold text-white mb-4">
            Jogo não encontrado
          </h1>
          <p className="text-white/60 mb-6">O jogo educacional que você procura não existe.</p>
          <Link href="/educacional" className="text-cyan-400 hover:underline">
            Voltar para Educacional
          </Link>
        </div>
      </main>
    );
  }

  const relatedGames = getRelatedEducationalGames(game, 4);

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-cyan-400 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/educacional" className="hover:text-cyan-400 transition">
            Educacional
          </Link>
          <span>/</span>
          <span className="text-white line-clamp-1">{game.title}</span>
        </nav>

        {/* Game Player */}
        <div className="mb-8">
          <GamePlayer game={game} />
        </div>

        {/* Game Info */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Title and Description */}
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl mb-4">
              {game.title}
            </h1>
            <p className="text-white/60 text-lg mb-6">{game.description}</p>

            {/* Educational Goal */}
            {game.educationalGoal && (
              <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4 mb-6">
                <div className="flex items-center gap-2 text-cyan-400 font-medium mb-2">
                  <GraduationCap className="h-5 w-5" />
                  Objetivo Educacional
                </div>
                <p className="text-white/70">{game.educationalGoal}</p>
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm">
                <BookOpen className="h-4 w-4 text-cyan-400" />
                <span className="font-medium text-white/70">{game.category}</span>
              </div>
              {game.ageRange && (
                <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-4 py-2 text-sm">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="font-medium text-white/70">{game.ageRange} anos</span>
                </div>
              )}
              <div className="flex items-center gap-2 rounded-lg bg-pink-500/10 px-4 py-2 text-sm">
                <TrendingUp className="h-4 w-4 text-pink-400" />
                <span className="font-medium text-white/70">
                  {game.playCount.toLocaleString('pt-BR')} jogadas
                </span>
              </div>
            </div>

            {/* Tags */}
            {game.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="flex items-center gap-2 text-sm font-medium text-white/50 mb-3">
                  <Tag className="h-4 w-4" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/60"
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-4 text-lg font-semibold text-white transition hover:from-cyan-700 hover:to-blue-700 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <BookOpen className="h-5 w-5" />
              Jogar Agora
            </a>

            {/* Info for Parents/Teachers */}
            <div className="rounded-xl border border-white/10 p-4">
              <h3 className="font-display font-semibold text-white mb-3">
                Para Pais e Professores
              </h3>
              <ul className="text-sm text-white/60 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  Jogo educativo seguro para crianças
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  Sem anúncios ou compras
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  Desenvolve habilidades de {game.category.toLowerCase()}
                </li>
              </ul>
            </div>

            {/* Share */}
            <div className="rounded-xl border border-white/10 p-4">
              <h3 className="font-display font-semibold text-white mb-3">
                Compartilhar
              </h3>
              <p className="text-sm text-white/50">
                Gostou do jogo? Compartilhe com outros pais e professores!
              </p>
            </div>
          </div>
        </div>

        {/* Related Games */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <RelatedGames games={relatedGames} title="Jogos Educacionais Relacionados" />
        </div>

        {/* Back to Educational */}
        <div className="mt-8 text-center">
          <Link
            href="/educacional"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-cyan-400 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Educacional
          </Link>
        </div>
      </div>
    </main>
  );
}
