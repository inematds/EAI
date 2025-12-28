'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, TrendingUp, ExternalLink, Swords } from 'lucide-react';
import { CategoryFilter, GameGrid } from '@/components/games';
import { arcadeGames, arcadeCategories, getGamesByCategory } from '@/data/arcade-games';

// Apenas jogos externos (que não começam com /)
const externalGames = arcadeGames.filter((g) => !g.embedUrl.startsWith('/'));

export default function ArcadePage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const filteredGames = selectedCategory === 'todos'
    ? externalGames
    : externalGames.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase());

  const totalPlayCount = externalGames.reduce((acc, g) => acc + g.playCount, 0);

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
            <Swords className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Arcade
            </h1>
            <p className="text-white/60">Jogos externos para se divertir - Abre em nova aba</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="flex items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-4 py-2.5 text-sm">
            <Swords className="h-4 w-4 text-purple-400" />
            <span className="font-medium text-white">{externalGames.length} jogos</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-pink-500/10 border border-pink-500/20 px-4 py-2.5 text-sm">
            <ExternalLink className="h-4 w-4 text-pink-400" />
            <span className="font-medium text-white">Abre em nova aba</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="font-medium text-white">
              {totalPlayCount.toLocaleString('pt-BR')} jogadas
            </span>
          </div>
        </div>

        {/* Link para Jogos EAI */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-display font-bold text-white mb-1">Procurando os Jogos EAI?</h3>
              <p className="text-white/60 text-sm">Jogos desenvolvidos para jogar direto na plataforma</p>
            </div>
            <Link
              href="/jogos"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <Gamepad2 className="h-4 w-4" />
              Ver Jogos EAI
            </Link>
          </div>
        </div>

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

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <GameGrid games={filteredGames} showFeatured={false} />
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20 mb-4">
              <Swords className="h-8 w-8 text-purple-400" />
            </div>
            <h2 className="font-display text-xl font-semibold text-white mb-2">
              Nenhum jogo encontrado
            </h2>
            <p className="text-white/50 max-w-md mx-auto mb-6">
              Não encontramos jogos externos nesta categoria.
            </p>
            <button
              onClick={() => setSelectedCategory('todos')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              Ver todos os jogos
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
