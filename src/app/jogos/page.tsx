'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, Sparkles, TrendingUp, BookOpen, Swords } from 'lucide-react';
import { GameGrid } from '@/components/games';
import { arcadeGames } from '@/data/arcade-games';
import { educationalGames } from '@/data/educational-games';

// Todos os jogos combinados (todos são EAI)
const allGames = [...arcadeGames, ...educationalGames];

type FilterType = 'todos' | 'arcade' | 'educacional';

export default function JogosPage() {
  const [filter, setFilter] = useState<FilterType>('todos');

  const filteredGames = filter === 'todos'
    ? allGames
    : filter === 'arcade'
      ? arcadeGames
      : educationalGames;

  const totalPlayCount = allGames.reduce((acc, g) => acc + g.playCount, 0);

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Jogos EAI</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 shadow-lg shadow-purple-500/25">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Jogos EAI
            </h1>
            <p className="text-white/60">Jogos desenvolvidos para a plataforma - Jogue aqui mesmo!</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-4 py-2.5 text-sm">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="font-medium text-white">{allGames.length} jogos EAI</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-pink-500/10 border border-pink-500/20 px-4 py-2.5 text-sm">
            <Swords className="h-4 w-4 text-pink-400" />
            <span className="font-medium text-white">{arcadeGames.length} arcade</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-4 py-2.5 text-sm">
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <span className="font-medium text-white">{educationalGames.length} educacionais</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="font-medium text-white">
              {totalPlayCount.toLocaleString('pt-BR')} jogadas
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setFilter('todos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              filter === 'todos'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Todos ({allGames.length})
          </button>
          <button
            onClick={() => setFilter('arcade')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              filter === 'arcade'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Swords className="h-4 w-4" />
            Arcade ({arcadeGames.length})
          </button>
          <button
            onClick={() => setFilter('educacional')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              filter === 'educacional'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Educacionais ({educationalGames.length})
          </button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredGames.map((game) => (
            <Link
              key={game.id}
              href={game.area === 'ARCADE' ? `/arcade/${game.slug}` : `/educacional/${game.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={game.thumbnailUrl}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-transparent to-transparent" />

                {/* Badge EAI */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  EAI
                </div>

                {/* Badge de tipo */}
                <div className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg ${
                  game.area === 'ARCADE'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600'
                }`}>
                  {game.area === 'ARCADE' ? <Swords className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                  {game.area === 'ARCADE' ? 'Arcade' : 'Edu'}
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

        {/* Empty state */}
        {filteredGames.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20 mb-4">
              <Sparkles className="h-8 w-8 text-purple-400" />
            </div>
            <h2 className="font-display text-xl font-semibold text-white mb-2">
              Nenhum jogo encontrado
            </h2>
            <p className="text-white/50 max-w-md mx-auto">
              Não encontramos jogos com o filtro selecionado.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
