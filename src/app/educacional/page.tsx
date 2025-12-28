import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Educacional',
  description: 'Jogos educativos para crianças. Aprenda brincando!',
};

export default function EducacionalPage() {
  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-900">Educacional</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-educational/10 text-educational">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
              Educacional
            </h1>
            <p className="text-zinc-600">Aprenda brincando!</p>
          </div>
        </div>

        {/* Em Construção */}
        <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-educational/10 text-educational mb-4">
            <BookOpen className="h-8 w-8" />
          </div>
          <h2 className="font-display text-xl font-semibold text-zinc-900 mb-2">
            Catálogo em Construção
          </h2>
          <p className="text-zinc-600 max-w-md mx-auto mb-6">
            Estamos preparando jogos educativos incríveis para crianças.
            Matemática, Português, Ciências e muito mais - tudo de forma divertida!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-educational px-4 py-2 text-sm font-medium text-white transition hover:bg-educational-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Home
          </Link>
        </div>
      </div>
    </main>
  );
}
