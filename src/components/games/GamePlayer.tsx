'use client';

import { useState, useEffect, useRef } from 'react';
import { Expand, Minimize, RotateCcw, Gamepad2, ExternalLink, AlertTriangle, Heart, Sparkles } from 'lucide-react';
import { Game } from '@/types';
import { cn } from '@/lib/utils';
import { isFavorite, toggleFavorite, trackGameClick, addToHistory } from '@/lib/storage';

// basePath para GitHub Pages
const basePath = '/EAI';

interface GamePlayerProps {
  game: Game;
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Check if it's an EAI game (hosted on our platform)
  const isEaiGame = game.embedUrl.startsWith('/');
  // Get the proper URL for the iframe (add basePath for local games)
  const iframeSrc = isEaiGame ? `${basePath}${game.embedUrl}` : game.embedUrl;

  // Load favorite status
  useEffect(() => {
    setFavorited(isFavorite(game.id));
    // Track game view
    trackGameClick(game.id);
    addToHistory(game.id, game.slug, game.area);
  }, [game.id, game.slug, game.area]);

  // Reset states when game changes
  useEffect(() => {
    setLoadError(false);
    setIsLoading(true);
    setKey((prev) => prev + 1);
  }, [game.slug]);

  const handleFavorite = () => {
    const newState = toggleFavorite(game.id);
    setFavorited(newState);
  };

  // Timeout to detect blocked iframes (only for external games)
  useEffect(() => {
    // EAI games always load, no need for timeout
    if (isEaiGame) return;

    const timeout = setTimeout(() => {
      if (isLoading) {
        // Still loading after 5s, might be blocked
        setLoadError(true);
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isLoading, key, isEaiGame]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    // Try to detect if iframe loaded correctly
    try {
      const iframe = iframeRef.current;
      if (iframe) {
        // This will throw if blocked by CORS/X-Frame-Options
        // but we can't reliably detect it, so we rely on timeout
      }
    } catch {
      setLoadError(true);
    }
  };

  const handleFullscreen = () => {
    const container = document.getElementById('game-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleRestart = () => {
    setLoadError(false);
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    window.open(iframeSrc, '_blank');
  };

  const handleReportBlocked = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  return (
    <div
      id="game-container"
      className={cn(
        'relative overflow-hidden rounded-2xl bg-zinc-900',
        isFullscreen && 'fixed inset-0 z-50 rounded-none'
      )}
    >
      {/* Game area */}
      <div className="aspect-[16/9] w-full relative">
        {loadError ? (
          // Error state - iframe blocked
          <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 mb-6">
              <AlertTriangle className="h-10 w-10 text-amber-500" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Jogo Bloqueado</h3>
            <p className="text-zinc-400 text-center max-w-md px-4 mb-6">
              Este jogo não permite ser carregado aqui. Clique no botão abaixo para jogar em uma nova aba.
            </p>
            <button
              onClick={handleOpenExternal}
              className="flex items-center gap-2 rounded-xl bg-arcade px-6 py-3 font-semibold text-white transition hover:bg-arcade-dark"
            >
              <ExternalLink className="h-5 w-5" />
              Abrir {game.title}
            </button>
          </div>
        ) : (
          <>
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-arcade/20 mb-4 animate-pulse">
                  <Gamepad2 className="h-8 w-8 text-arcade" />
                </div>
                <p className="text-zinc-400 mb-4">Carregando {game.title}...</p>
                <button
                  onClick={handleReportBlocked}
                  className="text-sm text-zinc-500 hover:text-zinc-300 underline"
                >
                  Não está carregando? Clique aqui
                </button>
              </div>
            )}
            <iframe
              ref={iframeRef}
              key={key}
              src={iframeSrc}
              title={game.title}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={() => setLoadError(true)}
            />
          </>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
        <div className="flex items-center gap-3 text-white">
          <h2 className="font-display font-semibold">{game.title}</h2>
          {isEaiGame && (
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-arcade px-2.5 py-1 text-xs font-bold">
              <Sparkles className="h-3 w-3" />
              EAI
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Favorite button with indication */}
          <button
            onClick={handleFavorite}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-lg transition',
              favorited
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            )}
            title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart className={cn('h-5 w-5', favorited && 'fill-current')} />
            {!favorited && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-amber-900">
                +
              </span>
            )}
          </button>
          <button
            onClick={handleRestart}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
            title="Reiniciar jogo"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={handleOpenExternal}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
            title="Abrir em nova aba"
          >
            <ExternalLink className="h-5 w-5" />
          </button>
          <button
            onClick={handleFullscreen}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
