import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Busca',
  description: 'Busque jogos na plataforma EAI',
};

export default function BuscaPage() {
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
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-2xl font-bold text-zinc-900 text-center mb-6">
            Buscar Jogos
          </h1>

          {/* Search Input */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="search"
              placeholder="Digite o nome do jogo..."
              className="w-full rounded-xl border border-zinc-300 bg-white py-3.5 pl-12 pr-4 text-base placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>

          {/* Em Construção */}
          <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h2 className="font-display text-xl font-semibold text-zinc-900 mb-2">
              Busca em Construção
            </h2>
            <p className="text-zinc-600 max-w-md mx-auto mb-6">
              Em breve você poderá buscar jogos por nome, categoria ou tags.
              Por enquanto, navegue pelos catálogos Arcade e Educacional.
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
      </div>
    </main>
  );
}
