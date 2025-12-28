'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Heart, Sparkles, Users } from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(game.id));
  }, [game.id]);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackGameClick(game.id);
    addToHistory(game.id, game.slug, game.area);

    // Check if it's an internal game (starts with /)
    if (game.embedUrl.startsWith('/')) {
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

  const isEaiGame = game.embedUrl.startsWith('/');

  return (
    <div
      onClick={handlePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative block overflow-hidden rounded-2xl cursor-pointer',
        'bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm',
        'border border-white/10 transition-all duration-500',
        'hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]',
        'hover:scale-[1.02] hover:-translate-y-1',
        isFeatured && 'md:col-span-2 md:row-span-2',
        isLarge && 'col-span-full md:col-span-2'
      )}
    >
      {/* Animated glow effect on hover */}
      <div className={cn(
        'absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 blur-sm transition-opacity duration-500 -z-10',
        isHovered && 'opacity-50'
      )} />

      {/* Thumbnail */}
      <div
        className={cn(
          'relative w-full overflow-hidden',
          isLarge ? 'aspect-[21/9]' : isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'
        )}
      >
        <Image
          src={game.thumbnailUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes={isFeatured || isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 640px) 50vw, 25vw'}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-transparent to-transparent" />

        {/* Hover overlay with play button */}
        <div className={cn(
          'absolute inset-0 bg-purple-900/30 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}>
          <div className={cn(
            'flex items-center justify-center rounded-full transition-all duration-500',
            'bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_30px_rgba(168,85,247,0.6)]',
            isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
            isLarge || isFeatured ? 'h-20 w-20' : 'h-14 w-14'
          )}>
            <Play className={cn(
              'fill-white text-white ml-1',
              isLarge || isFeatured ? 'h-9 w-9' : 'h-6 w-6'
            )} />
          </div>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className={cn(
            'absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 z-10',
            favorited
              ? 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]'
              : 'bg-black/40 backdrop-blur-sm text-white/70 opacity-0 group-hover:opacity-100 hover:bg-pink-500 hover:text-white'
          )}
          title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={cn('h-4 w-4', favorited && 'fill-current')} />
        </button>

        {/* EAI Badge */}
        {isEaiGame && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Sparkles className="h-3 w-3" />
            EAI
          </div>
        )}

        {/* Featured Badge */}
        {game.featured && !isEaiGame && (
          <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            Destaque
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn(
        'relative p-4',
        (isLarge || isFeatured) && 'absolute bottom-0 left-0 right-0'
      )}>
        {/* Category Badge */}
        <div className="mb-2">
          <span
            className={cn(
              'inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide',
              game.area === 'ARCADE'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
            )}
          >
            {game.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          'font-display font-bold text-white line-clamp-1',
          isLarge ? 'text-xl' : isFeatured ? 'text-lg' : 'text-sm'
        )}>
          {game.title}
        </h3>

        {/* Description for large/featured */}
        {(isLarge || isFeatured) && (
          <p className="text-sm text-white/60 line-clamp-2 mt-1.5">
            {game.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {game.playCount.toLocaleString('pt-BR')}
          </span>
          {game.ageRange && (
            <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/50">
              {game.ageRange} anos
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
