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
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-900">Busca</span>
        </nav>

        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="font-display text-2xl font-bold text-zinc-900 text-center mb-6">
            Buscar Jogos
          </h1>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite o nome do jogo, categoria ou matéria..."
              className="w-full rounded-xl border border-zinc-300 bg-white py-3.5 pl-12 pr-4 text-base placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>

          {/* Quick stats */}
          <p className="text-center text-sm text-zinc-500 mt-3">
            {allGames.length} jogos disponíveis para busca
          </p>
        </div>

        {/* Results */}
        {hasSearched ? (
          results.length > 0 ? (
            <div className="space-y-10">
              {/* Results count */}
              <p className="text-zinc-600">
                <span className="font-semibold">{results.length}</span> resultado{results.length !== 1 ? 's' : ''} para &quot;{query}&quot;
              </p>

              {/* Arcade Results */}
              {arcadeResults.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-arcade/10 text-arcade">
                      <Gamepad2 className="h-4 w-4" />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-zinc-900">
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-educational/10 text-educational">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-zinc-900">
                      Educacional ({educationalResults.length})
                    </h2>
                  </div>
                  <GameGrid games={educationalResults} showFeatured={false} />
                </section>
              )}
            </div>
          ) : (
            // No results
            <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-zinc-400 mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-2">
                Nenhum resultado encontrado
              </h2>
              <p className="text-zinc-600 max-w-md mx-auto mb-6">
                Não encontramos jogos para &quot;{query}&quot;. Tente buscar por outro termo.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/arcade"
                  className="inline-flex items-center gap-2 rounded-lg bg-arcade px-4 py-2 text-sm font-medium text-white transition hover:bg-arcade-dark"
                >
                  Ver Arcade
                </Link>
                <Link
                  href="/educacional"
                  className="inline-flex items-center gap-2 rounded-lg bg-educational px-4 py-2 text-sm font-medium text-white transition hover:bg-educational-dark"
                >
                  Ver Educacional
                </Link>
              </div>
            </div>
          )
        ) : (
          // Initial state - suggestions
          <div className="space-y-8">
            <div className="text-center text-zinc-500 mb-8">
              Digite pelo menos 2 caracteres para buscar
            </div>

            {/* Popular searches / suggestions */}
            <div className="max-w-2xl mx-auto">
              <h2 className="text-sm font-medium text-zinc-500 mb-3">Sugestões de busca</h2>
              <div className="flex flex-wrap gap-2">
                {['puzzle', 'matemática', 'ação', 'clássico', 'lógica', 'inglês', 'geografia'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-200 transition"
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
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-4 hover:border-arcade hover:shadow-sm transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-arcade/10 text-arcade">
                  <Gamepad2 className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-zinc-900">Arcade</div>
                  <div className="text-sm text-zinc-500">Jogos casuais</div>
                </div>
              </Link>
              <Link
                href="/educacional"
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-4 hover:border-educational hover:shadow-sm transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-educational/10 text-educational">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-zinc-900">Educacional</div>
                  <div className="text-sm text-zinc-500">Aprenda brincando</div>
                </div>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-primary transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Home
          </Link>
        </div>
      </div>
    </main>
  );
}
