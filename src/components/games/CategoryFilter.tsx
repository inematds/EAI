'use client';

import { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (slug: string) => void;
  accentColor?: 'arcade' | 'educational';
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
  accentColor = 'arcade',
}: CategoryFilterProps) {
  const colorClasses = {
    arcade: {
      active: 'bg-arcade text-white',
      inactive: 'bg-zinc-100 text-zinc-700 hover:bg-arcade/10 hover:text-arcade',
    },
    educational: {
      active: 'bg-educational text-white',
      inactive: 'bg-zinc-100 text-zinc-700 hover:bg-educational/10 hover:text-educational',
    },
  };

  const allCategories = [
    { id: '0', slug: 'todos', name: 'Todos', area: categories[0]?.area || 'ARCADE', order: 0 },
    ...categories,
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onSelect(category.slug)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            selected === category.slug
              ? colorClasses[accentColor].active
              : colorClasses[accentColor].inactive
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
