'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wrench, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function EstudioPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simular envio - no futuro conectar com API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
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
          <span className="text-zinc-900">Estúdio</span>
        </nav>

        {/* Em Breve */}
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent mb-6">
            <Wrench className="h-10 w-10" />
          </div>

          <span className="inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent mb-4">
            Em Breve
          </span>

          <h1 className="font-display text-3xl font-bold text-zinc-900 sm:text-4xl mb-4">
            Estúdio EAI
          </h1>

          <p className="text-lg text-zinc-600 mb-8">
            Crie seus próprios jogos! Uma plataforma completa para desenvolvedores
            criarem, publicarem e monetizarem seus games na EAI.
          </p>

          {/* Newsletter Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <p className="text-sm text-zinc-500 mb-4">
                Quer ser um dos primeiros criadores? Deixe seu email:
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-zinc-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : 'Avise-me'}
                </button>
              </div>
            </form>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-lg bg-secondary/10 px-4 py-3 text-secondary">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Email cadastrado com sucesso!</span>
            </div>
          )}

          <div className="mt-12">
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
