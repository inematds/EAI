'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Clock, Trash2, ArrowLeft } from 'lucide-react';
import { GameCard, GameGrid } from '@/components/games';
import { getFavorites, getPlayHistory, clearHistory, PlayHistoryItem } from '@/lib/storage';
import { arcadeGames } from '@/data/arcade-games';
import { educationalGames } from '@/data/educational-games';
import { Game } from '@/types';

const allGames = [...arcadeGames, ...educationalGames];

function getGameById(id: string): Game | undefined {
  return allGames.find((g) => g.id === id);
}

export default function MeusJogosPage() {
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [history, setHistory] = useState<(PlayHistoryItem & { game?: Game })[]>([]);
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');

  useEffect(() => {
    // Load favorites
    const favIds = getFavorites();
    const favGames = favIds.map(getGameById).filter((g): g is Game => g !== undefined);
    setFavorites(favGames);

    // Load history
    const historyItems = getPlayHistory();
    const historyWithGames = historyItems.map((item) => ({
      ...item,
      game: getGameById(item.gameId),
    }));
    setHistory(historyWithGames);
  }, []);

  const handleClearHistory = () => {
    if (confirm('Tem certeza que deseja limpar o histórico?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-900">Meus Jogos</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
            Meus Jogos
          </h1>
          <p className="text-zinc-600 mt-1">
            Seus favoritos e jogos recentes
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'favorites'
                ? 'bg-primary text-white'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Heart className="h-4 w-4" />
            Favoritos ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'history'
                ? 'bg-primary text-white'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Clock className="h-4 w-4" />
            Histórico ({history.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'favorites' ? (
          favorites.length > 0 ? (
            <GameGrid games={favorites} showFeatured={false} />
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h2 className="font-display text-xl font-semibold text-zinc-900 mb-2">
                Nenhum favorito ainda
              </h2>
              <p className="text-zinc-600 max-w-md mx-auto mb-6">
                Clique no coração nos jogos para adicioná-los aos seus favoritos!
              </p>
              <Link
                href="/arcade"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                Explorar Jogos
              </Link>
            </div>
          )
        ) : (
          <>
            {history.length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 text-sm text-zinc-500 hover:text-red-500 transition"
                >
                  <Trash2 className="h-4 w-4" />
                  Limpar histórico
                </button>
              </div>
            )}

            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((item, index) =>
                  item.game ? (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition cursor-pointer"
                      onClick={() => {
                        const url = item.game!.embedUrl;
                        window.open(url.startsWith('/') ? window.location.origin + url : url, '_blank');
                      }}
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-zinc-100">
                        <img
                          src={item.game.thumbnailUrl}
                          alt={item.game.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-zinc-900 truncate">
                          {item.game.title}
                        </h3>
                        <p className="text-sm text-zinc-500">
                          {item.area === 'ARCADE' ? 'Arcade' : 'Educacional'} • {item.game.category}
                        </p>
                      </div>
                      <div className="text-sm text-zinc-400">
                        {formatDate(item.playedAt)}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-zinc-400 mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h2 className="font-display text-xl font-semibold text-zinc-900 mb-2">
                  Nenhum jogo recente
                </h2>
                <p className="text-zinc-600 max-w-md mx-auto mb-6">
                  Os jogos que você jogar aparecerão aqui!
                </p>
                <Link
                  href="/arcade"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
                >
                  Começar a Jogar
                </Link>
              </div>
            )}
          </>
        )}

        {/* Back */}
        <div className="mt-8 text-center">
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
