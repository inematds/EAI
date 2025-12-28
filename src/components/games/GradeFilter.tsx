'use client';

import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';

interface SchoolGrade {
  id: string;
  slug: string;
  name: string;
  grade: number;
  description: string;
}

interface GradeFilterProps {
  grades: SchoolGrade[];
  selected: string;
  onSelect: (slug: string) => void;
}

export function GradeFilter({ grades, selected, onSelect }: GradeFilterProps) {
  const allGrades = [{ id: '0', slug: 'todos', name: 'Todos', grade: 0, description: 'Todos os anos' }, ...grades];

  return (
    <div className="flex flex-wrap gap-2">
      {allGrades.map((grade) => (
        <button
          key={grade.slug}
          onClick={() => onSelect(grade.slug)}
          className={cn(
            'group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300',
            selected === grade.slug
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-cyan-500/30'
          )}
          title={grade.description}
        >
          {grade.grade > 0 && (
            <GraduationCap className={cn(
              'h-4 w-4',
              selected === grade.slug ? 'text-white' : 'text-cyan-400'
            )} />
          )}
          <span>{grade.name}</span>
          {grade.grade > 0 && selected !== grade.slug && (
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {grade.description}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
