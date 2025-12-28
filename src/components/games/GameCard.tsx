'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, ExternalLink, Heart } from 'lucide-react';
import { Game } from '@/types';
import { cn } from '@/lib/utils';
import { isFavorite, toggleFavorite, addToHistory, trackGameClick } from '@/lib/storage';

interface GameCardProps {
  game: Game;
  variant?: 'default' | 'featured' | 'large';
}

export function GameCard({ game, variant = 'default' }: GameCardProps) {
  const isFeatured = variant === 'featured';
  const isLarge = variant === 'large';
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(game.id));
  }, [game.id]);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackGameClick(game.id);
    addToHistory(game.id, game.slug, game.area);

    // Check if it's an internal game (starts with /)
    if (game.embedUrl.startsWith('/')) {
      // Open internal games with full URL
      window.open(window.location.origin + game.embedUrl, '_blank');
    } else {
      window.open(game.embedUrl, '_blank');
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleFavorite(game.id);
    setFavorited(newState);
  };

  return (
    <div
      onClick={handlePlay}
      className={cn(
        'group relative block overflow-hidden rounded-xl bg-white shadow-sm border border-zinc-100 transition-all duration-200 cursor-pointer',
        'hover:shadow-lg hover:border-zinc-200 hover:-translate-y-1',
        isFeatured && 'md:col-span-2 md:row-span-2',
        isLarge && 'col-span-full md:col-span-2'
      )}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          'relative w-full overflow-hidden bg-zinc-100',
          isLarge ? 'aspect-[21/9]' : isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'
        )}
      >
        <Image
          src={game.thumbnailUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={isFeatured || isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 640px) 50vw, 25vw'}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            'flex items-center justify-center rounded-full bg-white/95 shadow-xl transition-all duration-300',
            'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100',
            isLarge || isFeatured ? 'h-16 w-16' : 'h-12 w-12'
          )}>
            <Play className={cn(
              'fill-current',
              isLarge || isFeatured ? 'h-7 w-7 text-primary' : 'h-5 w-5 text-primary'
            )} />
          </div>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className={cn(
            'absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-full transition-all z-10',
            favorited
              ? 'bg-red-500 text-white'
              : 'bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500'
          )}
          title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={cn('h-4 w-4', favorited && 'fill-current')} />
        </button>

        {/* EAI Badge - platform games */}
        {game.embedUrl.startsWith('/') && (
          <div className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-primary to-arcade px-2.5 py-1 text-xs font-semibold text-white shadow-sm flex items-center gap-1">
            <span className="font-bold">EAI</span>
          </div>
        )}

        {/* Featured Badge - only show if not EAI game */}
        {game.featured && !game.embedUrl.startsWith('/') && (
          <div className="absolute right-2 top-2 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            Destaque
          </div>
        )}

        {/* Category Badge - bottom */}
        <div className="absolute bottom-2 right-2">
          <div
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium text-white shadow-sm',
              game.area === 'ARCADE' ? 'bg-arcade' : 'bg-educational'
            )}
          >
            {game.category}
          </div>
        </div>

        {/* Title overlay for large cards */}
        {(isLarge || isFeatured) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className={cn(
              'font-display font-bold text-white',
              isLarge ? 'text-xl' : 'text-lg'
            )}>
              {game.title}
            </h3>
            <p className="text-sm text-white/80 line-clamp-1 mt-1">
              {game.description}
            </p>
          </div>
        )}
      </div>

      {/* Content - only for default cards */}
      {!isLarge && !isFeatured && (
        <div className="p-3">
          <h3 className="font-display font-semibold text-zinc-900 line-clamp-1 text-sm">
            {game.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-zinc-500">
            <span>{game.playCount.toLocaleString('pt-BR')} jogadas</span>
          </div>
        </div>
      )}
    </div>
  );
}
