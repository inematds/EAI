'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, Gamepad2, BookOpen } from 'lucide-react';
import { GameGrid } from '@/components/games';
import { searchGames, getAllGames } from '@/data/search';
import { Game } from '@/types';

export default function BuscaPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const allGames = useMemo(() => getAllGames(), []);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = searchGames(query);
      setResults(searchResults);
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [query]);

  const arcadeResults = results.filter((g) => g.area === 'ARCADE');
  const educationalResults = results.filter((g) => g.area === 'EDUCATIONAL');

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Busca</span>
        </nav>

        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="font-display text-2xl font-bold text-white text-center mb-6">
            Buscar Jogos
          </h1>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite o nome do jogo, categoria ou matéria..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-base text-white placeholder:text-white/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              autoFocus
            />
          </div>

          {/* Quick stats */}
          <p className="text-center text-sm text-white/50 mt-3">
            {allGames.length} jogos disponíveis para busca
          </p>
        </div>

        {/* Results */}
        {hasSearched ? (
          results.length > 0 ? (
            <div className="space-y-10">
              {/* Results count */}
              <p className="text-white/60">
                <span className="font-semibold text-white">{results.length}</span> resultado{results.length !== 1 ? 's' : ''} para &quot;{query}&quot;
              </p>

              {/* Arcade Results */}
              {arcadeResults.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                      <Gamepad2 className="h-4 w-4" />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-white">
                      Arcade ({arcadeResults.length})
                    </h2>
                  </div>
                  <GameGrid games={arcadeResults} showFeatured={false} />
                </section>
              )}

              {/* Educational Results */}
              {educationalResults.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-white">
                      Educacional ({educationalResults.length})
                    </h2>
                  </div>
                  <GameGrid games={educationalResults} showFeatured={false} />
                </section>
              )}
            </div>
          ) : (
            // No results
            <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white/40 mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h2 className="font-display text-xl font-semibold text-white mb-2">
                Nenhum resultado encontrado
              </h2>
              <p className="text-white/60 max-w-md mx-auto mb-6">
                Não encontramos jogos para &quot;{query}&quot;. Tente buscar por outro termo.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/arcade"
                  className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                >
                  Ver Arcade
                </Link>
                <Link
                  href="/educacional"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
                >
                  Ver Educacional
                </Link>
              </div>
            </div>
          )
        ) : (
          // Initial state - suggestions
          <div className="space-y-8">
            <div className="text-center text-white/50 mb-8">
              Digite pelo menos 2 caracteres para buscar
            </div>

            {/* Popular searches / suggestions */}
            <div className="max-w-2xl mx-auto">
              <h2 className="text-sm font-medium text-white/50 mb-3">Sugestões de busca</h2>
              <div className="flex flex-wrap gap-2">
                {['puzzle', 'matemática', 'ação', 'clássico', 'lógica', 'inglês', 'geografia'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/20 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="flex justify-center gap-4">
              <Link
                href="/arcade"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 hover:border-purple-500/50 hover:shadow-sm transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                  <Gamepad2 className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Arcade</div>
                  <div className="text-sm text-white/50">Jogos casuais</div>
                </div>
              </Link>
              <Link
                href="/educacional"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 hover:border-cyan-500/50 hover:shadow-sm transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Educacional</div>
                  <div className="text-sm text-white/50">Aprenda brincando</div>
                </div>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-purple-400 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Home
          </Link>
        </div>
      </div>
    </main>
  );
}
