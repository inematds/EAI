'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, TrendingUp, Sparkles } from 'lucide-react';
import { CategoryFilter, GameGrid } from '@/components/games';
import { arcadeGames, arcadeCategories, getGamesByCategory, getFeaturedGames } from '@/data/arcade-games';

// Separate EAI games from external games
const eaiGames = arcadeGames.filter((g) => g.embedUrl.startsWith('/'));
const externalGames = arcadeGames.filter((g) => !g.embedUrl.startsWith('/'));

export default function ArcadePage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const filteredGames = getGamesByCategory(selectedCategory).filter((g) => !g.embedUrl.startsWith('/'));
  const filteredEaiGames = selectedCategory === 'todos'
    ? eaiGames
    : eaiGames.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase());
  const featuredGames = getFeaturedGames();

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Arcade</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25">
            <Gamepad2 className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Arcade
            </h1>
            <p className="text-white/60">Jogos casuais para se divertir</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="flex items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-4 py-2.5 text-sm">
            <Gamepad2 className="h-4 w-4 text-purple-400" />
            <span className="font-medium text-white">{arcadeGames.length} jogos</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-pink-500/10 border border-pink-500/20 px-4 py-2.5 text-sm">
            <Sparkles className="h-4 w-4 text-pink-400" />
            <span className="font-medium text-white">{eaiGames.length} jogos EAI</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="font-medium text-white">
              {arcadeGames.reduce((acc, g) => acc + g.playCount, 0).toLocaleString('pt-BR')} jogadas
            </span>
          </div>
        </div>

        {/* EAI Games Section */}
        {filteredEaiGames.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Jogos EAI
                </h2>
                <p className="text-sm text-white/50">Desenvolvidos para a plataforma - Jogue aqui mesmo!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEaiGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/arcade/${game.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={game.thumbnailUrl}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      <Sparkles className="h-3 w-3" />
                      EAI
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display font-bold text-white text-lg">{game.title}</h3>
                      <p className="text-white/70 text-sm line-clamp-1">{game.description}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between border-t border-white/5">
                    <span className="text-xs text-white/40">{game.playCount.toLocaleString('pt-BR')} jogadas</span>
                    <span className="text-xs font-medium text-purple-400 group-hover:text-purple-300">Jogar agora →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-white/50 mb-3">Categorias</h2>
          <CategoryFilter
            categories={arcadeCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            accentColor="arcade"
          />
        </div>

        {/* External Games Section */}
        {filteredGames.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30">
                <Gamepad2 className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Mais Jogos
                </h2>
                <p className="text-sm text-white/50">Abre em nova aba</p>
              </div>
            </div>

            <GameGrid games={filteredGames} showFeatured={false} />
          </section>
        )}
      </div>
    </main>
  );
}
