'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, TrendingUp, Star, GraduationCap, Sparkles } from 'lucide-react';
import { CategoryFilter, GameGrid, AgeFilter } from '@/components/games';
import {
  educationalGames,
  educationalCategories,
  ageRanges,
  getEducationalGamesByFilters,
  getFeaturedEducationalGames,
} from '@/data/educational-games';

// Separate EAI games from external games
const eaiGames = educationalGames.filter((g) => g.embedUrl.startsWith('/'));
const externalGames = educationalGames.filter((g) => !g.embedUrl.startsWith('/'));

export default function EducacionalPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedAge, setSelectedAge] = useState('todos');

  const filteredGames = getEducationalGamesByFilters(selectedCategory, selectedAge).filter((g) => !g.embedUrl.startsWith('/'));
  const filteredEaiGames = selectedCategory === 'todos' && selectedAge === 'todos'
    ? eaiGames
    : eaiGames.filter((g) => {
        const matchCategory = selectedCategory === 'todos' || g.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchAge = selectedAge === 'todos' || g.ageRange === selectedAge;
        return matchCategory && matchAge;
      });
  const featuredGames = getFeaturedEducationalGames();

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-900">Educacional</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-educational/10 text-educational">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
              Educacional
            </h1>
            <p className="text-zinc-600">Aprenda brincando!</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 rounded-lg bg-educational/5 px-4 py-2 text-sm">
            <BookOpen className="h-4 w-4 text-educational" />
            <span className="font-medium text-zinc-700">{educationalGames.length} jogos</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium text-zinc-700">{eaiGames.length} jogos EAI</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/5 px-4 py-2 text-sm">
            <TrendingUp className="h-4 w-4 text-secondary" />
            <span className="font-medium text-zinc-700">
              {educationalGames.reduce((acc, g) => acc + g.playCount, 0).toLocaleString('pt-BR')} jogadas
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-accent/5 px-4 py-2 text-sm">
            <GraduationCap className="h-4 w-4 text-accent" />
            <span className="font-medium text-zinc-700">{educationalCategories.length} matérias</span>
          </div>
        </div>

        {/* EAI Games Section */}
        {filteredEaiGames.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-educational text-white">
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
                  href={`/educacional/${game.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white border border-zinc-100 shadow-sm hover:shadow-lg hover:border-educational/30 transition-all"
                >
                  <div className="aspect-video relative overflow-hidden bg-zinc-100">
                    <img
                      src={game.thumbnailUrl}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 right-2 rounded-full bg-gradient-to-r from-primary to-educational px-2.5 py-1 text-xs font-bold text-white shadow">
                      EAI
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display font-bold text-white text-lg">{game.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-1">{game.description}</p>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{game.playCount.toLocaleString('pt-BR')} jogadas</span>
                    <span className="text-xs font-medium text-educational">Jogar no site →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Age Filter */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-zinc-500 mb-3">Faixa Etária</h2>
          <AgeFilter
            ageRanges={ageRanges}
            selected={selectedAge}
            onSelect={setSelectedAge}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-zinc-500 mb-3">Matérias</h2>
          <CategoryFilter
            categories={educationalCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            accentColor="educational"
          />
        </div>

        {/* External Games Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-educational/10 text-educational">
              <BookOpen className="h-4 w-4" />
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

        {/* Empty state */}
        {filteredGames.length === 0 && filteredEaiGames.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-educational/10 text-educational mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="font-display text-xl font-semibold text-zinc-900 mb-2">
              Nenhum jogo encontrado
            </h2>
            <p className="text-zinc-600 max-w-md mx-auto mb-6">
              Não encontramos jogos com os filtros selecionados. Tente outra combinação!
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedAge('todos');
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-educational px-4 py-2 text-sm font-medium text-white transition hover:bg-educational-dark"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
