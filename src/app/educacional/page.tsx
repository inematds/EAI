'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, TrendingUp, GraduationCap, Sparkles } from 'lucide-react';
import { CategoryFilter, AgeFilter, GradeFilter } from '@/components/games';
import {
  educationalGames,
  educationalCategories,
  ageRanges,
  schoolGrades,
  getEducationalGamesByAllFilters,
} from '@/data/educational-games';

// Apenas jogos EAI (embedUrl começa com /)
const eaiGames = educationalGames.filter((g) => g.embedUrl.startsWith('/'));

export default function EducacionalPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedAge, setSelectedAge] = useState('todos');
  const [selectedGrade, setSelectedGrade] = useState('todos');

  // Filtrar apenas jogos EAI
  const allFiltered = getEducationalGamesByAllFilters(selectedCategory, selectedAge, selectedGrade);
  const filteredGames = allFiltered.filter((g) => g.embedUrl.startsWith('/'));

  const totalPlayCount = eaiGames.reduce((acc, g) => acc + g.playCount, 0);

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-cyan-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Educacional</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Educacional
            </h1>
            <p className="text-white/60">Jogos EAI para aprender brincando!</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-4 py-2.5 text-sm">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="font-medium text-white">{eaiGames.length} jogos EAI</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="font-medium text-white">
              {totalPlayCount.toLocaleString('pt-BR')} jogadas
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 text-sm">
            <GraduationCap className="h-4 w-4 text-amber-400" />
            <span className="font-medium text-white">{educationalCategories.length} matérias</span>
          </div>
        </div>

        {/* Grade Filter - Nível Escolar */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-white/50 mb-3">Nível Escolar</h2>
          <GradeFilter
            grades={schoolGrades}
            selected={selectedGrade}
            onSelect={setSelectedGrade}
          />
        </div>

        {/* Age Filter */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-white/50 mb-3">Faixa Etária</h2>
          <AgeFilter
            ageRanges={ageRanges}
            selected={selectedAge}
            onSelect={setSelectedAge}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-white/50 mb-3">Matérias</h2>
          <CategoryFilter
            categories={educationalCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            accentColor="educational"
          />
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGames.map((game) => (
              <Link
                key={game.id}
                href={`/educacional/${game.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={game.thumbnailUrl}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
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
                  <span className="text-xs font-medium text-cyan-400 group-hover:text-cyan-300">Jogar agora →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 mb-4">
              <BookOpen className="h-8 w-8 text-cyan-400" />
            </div>
            <h2 className="font-display text-xl font-semibold text-white mb-2">
              Nenhum jogo encontrado
            </h2>
            <p className="text-white/50 max-w-md mx-auto mb-6">
              Não encontramos jogos com os filtros selecionados. Tente outra combinação!
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedAge('todos');
                setSelectedGrade('todos');
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
