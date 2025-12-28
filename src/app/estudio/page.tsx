import Link from 'next/link';
import { Wrench, ArrowLeft } from 'lucide-react';

export default function EstudioPage() {
  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Estúdio</span>
        </nav>

        {/* Em Breve */}
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25 mb-8">
            <Wrench className="h-12 w-12 text-white" />
          </div>

          <span className="inline-block rounded-full bg-amber-500/20 border border-amber-500/30 px-4 py-1.5 text-sm font-medium text-amber-400 mb-6">
            Em Breve
          </span>

          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl mb-6">
            Estúdio EAI
          </h1>

          <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">
            Crie seus próprios jogos! Uma plataforma completa para desenvolvedores
            criarem, publicarem e monetizarem seus games na EAI.
          </p>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition"
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
