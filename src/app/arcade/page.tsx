'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, TrendingUp, Star, Sparkles } from 'lucide-react';
import { CategoryFilter, GameGrid, GameCard } from '@/components/games';
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
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-900">Arcade</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-arcade/10 text-arcade">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
              Arcade
            </h1>
            <p className="text-zinc-600">Jogos casuais para se divertir</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 rounded-lg bg-arcade/5 px-4 py-2 text-sm">
            <Gamepad2 className="h-4 w-4 text-arcade" />
            <span className="font-medium text-zinc-700">{arcadeGames.length} jogos</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium text-zinc-700">{eaiGames.length} jogos EAI</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/5 px-4 py-2 text-sm">
            <TrendingUp className="h-4 w-4 text-secondary" />
            <span className="font-medium text-zinc-700">
              {arcadeGames.reduce((acc, g) => acc + g.playCount, 0).toLocaleString('pt-BR')} jogadas
            </span>
          </div>
        </div>

        {/* EAI Games Section */}
        {filteredEaiGames.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-arcade text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-zinc-900">
                  Jogos EAI
                </h2>
                <p className="text-sm text-zinc-500">Desenvolvidos para a plataforma - Jogue aqui mesmo!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEaiGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/arcade/${game.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white border border-zinc-100 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className="aspect-video relative overflow-hidden bg-zinc-100">
                    <img
                      src={game.thumbnailUrl}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 right-2 rounded-full bg-gradient-to-r from-primary to-arcade px-2.5 py-1 text-xs font-bold text-white shadow">
                      EAI
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display font-bold text-white text-lg">{game.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-1">{game.description}</p>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{game.playCount.toLocaleString('pt-BR')} jogadas</span>
                    <span className="text-xs font-medium text-primary">Jogar no site →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-zinc-500 mb-3">Categorias</h2>
          <CategoryFilter
            categories={arcadeCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            accentColor="arcade"
          />
        </div>

        {/* External Games Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-arcade/10 text-arcade">
              <Gamepad2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-zinc-900">
                Mais Jogos
              </h2>
              <p className="text-sm text-zinc-500">Abre em nova aba</p>
            </div>
          </div>

          <GameGrid games={filteredGames} showFeatured={false} />
        </section>
      </div>
    </main>
  );
}
