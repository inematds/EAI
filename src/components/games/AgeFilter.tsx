'use client';

import { cn } from '@/lib/utils';

interface AgeRange {
  id: string;
  slug: string;
  name: string;
}

interface AgeFilterProps {
  ageRanges: AgeRange[];
  selected: string;
  onSelect: (slug: string) => void;
}

export function AgeFilter({ ageRanges, selected, onSelect }: AgeFilterProps) {
  const allAges = [{ id: '0', slug: 'todos', name: 'Todas as idades' }, ...ageRanges];

  return (
    <div className="flex flex-wrap gap-2">
      {allAges.map((age) => (
        <button
          key={age.slug}
          onClick={() => onSelect(age.slug)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            selected === age.slug
              ? 'bg-educational text-white'
              : 'bg-zinc-100 text-zinc-700 hover:bg-educational/10 hover:text-educational'
          )}
        >
          {age.name}
        </button>
      ))}
    </div>
  );
}
