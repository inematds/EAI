'use client';

import Link from 'next/link';
import { Gamepad2, BookOpen, Briefcase, Wrench, TrendingUp, Star, ChevronRight, Sparkles } from 'lucide-react';
import { GameCard } from '@/components/games';
import { arcadeGames } from '@/data/arcade-games';
import { educationalGames } from '@/data/educational-games';

const areas = [
  {
    name: 'Arcade',
    description: 'Jogos casuais para se divertir',
    icon: Gamepad2,
    href: '/arcade',
    color: 'arcade',
    available: true,
    count: arcadeGames.length,
  },
  {
    name: 'Educacional',
    description: 'Aprenda brincando',
    icon: BookOpen,
    href: '/educacional',
    color: 'educational',
    available: true,
    count: educationalGames.length,
  },
  {
    name: 'Profissional',
    description: 'Evolua sua carreira',
    icon: Briefcase,
    href: '/profissional',
    color: 'primary',
    available: false,
  },
  {
    name: 'Estúdio',
    description: 'Crie seus jogos',
    icon: Wrench,
    href: '/estudio',
    color: 'accent',
    available: false,
  },
];

// Get featured and popular games
const featuredArcade = arcadeGames.filter((g) => g.featured).slice(0, 3);
const featuredEducational = educationalGames.filter((g) => g.featured).slice(0, 3);
const popularGames = [...arcadeGames, ...educationalGames]
  .sort((a, b) => b.playCount - a.playCount)
  .slice(0, 8);

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-arcade to-primary-dark py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="container-main relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90 mb-6">
              <Sparkles className="h-4 w-4" />
              <span>{arcadeGames.length + educationalGames.length} jogos disponíveis</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Jogue. Aprenda. Evolua.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              A plataforma que combina diversão e aprendizado. Jogos casuais,
              conteúdo educacional e desenvolvimento profissional em um só lugar.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/arcade"
                className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary shadow-lg transition hover:bg-white/90 hover:scale-105 flex items-center gap-2"
              >
                <Gamepad2 className="h-5 w-5" />
                Jogar Agora
              </Link>
              <Link
                href="/educacional"
                className="rounded-xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10 flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Ver Educacional
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-12 lg:py-16 bg-zinc-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-zinc-900">
                  Mais Jogados
                </h2>
                <p className="text-sm text-zinc-500">Os favoritos da comunidade</p>
              </div>
            </div>
            <Link
              href="/busca"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Arcade Featured */}
      <section className="py-12 lg:py-16">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-arcade/10 text-arcade">
                <Gamepad2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-zinc-900">
                  Destaques Arcade
                </h2>
                <p className="text-sm text-zinc-500">Jogos casuais para se divertir</p>
              </div>
            </div>
            <Link
              href="/arcade"
              className="flex items-center gap-1 text-sm font-medium text-arcade hover:underline"
            >
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredArcade.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                variant={index === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Educational Featured */}
      <section className="py-12 lg:py-16 bg-educational/5">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-educational/10 text-educational">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-zinc-900">
                  Destaques Educacionais
                </h2>
                <p className="text-sm text-zinc-500">Aprenda brincando</p>
              </div>
            </div>
            <Link
              href="/educacional"
              className="flex items-center gap-1 text-sm font-medium text-educational hover:underline"
            >
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredEducational.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                variant={index === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-12 lg:py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
              Explore o Ecossistema EAI
            </h2>
            <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">
              Quatro áreas pensadas para diferentes momentos da sua jornada
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => {
              const Icon = area.icon;
              const isAvailable = area.available;

              return (
                <Link
                  key={area.name}
                  href={area.href}
                  className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition ${
                    isAvailable
                      ? 'hover:shadow-lg hover:scale-[1.02] hover:border-primary/50'
                      : 'opacity-75'
                  }`}
                >
                  {!isAvailable && (
                    <span className="absolute top-4 right-4 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                      Em breve
                    </span>
                  )}
                  <div
                    className={`inline-flex rounded-xl p-3 ${
                      area.color === 'arcade'
                        ? 'bg-arcade/10 text-arcade'
                        : area.color === 'educational'
                        ? 'bg-educational/10 text-educational'
                        : area.color === 'primary'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/10 text-accent'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-zinc-900">
                    {area.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">{area.description}</p>
                  {area.count && (
                    <p className="mt-3 text-xs font-medium text-zinc-400">
                      {area.count} jogos disponíveis
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-900 py-16 lg:py-20">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Por que escolher a EAI?
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/20 text-secondary">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">Zero Fricção</h3>
              <p className="mt-2 text-zinc-400">
                Jogue instantaneamente, sem cadastro ou downloads necessários
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-educational/20 text-educational">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">Aprenda Brincando</h3>
              <p className="mt-2 text-zinc-400">
                Conteúdo educacional divertido e engajante para todas as idades
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary-light">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">Seguro para Crianças</h3>
              <p className="mt-2 text-zinc-400">
                Conteúdo curado e apropriado para todas as idades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="container-main">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-arcade p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Pronto para começar?
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              Escolha sua área favorita e comece a jogar agora mesmo. Sem cadastro, sem complicação.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/arcade"
                className="rounded-xl bg-white px-8 py-4 font-semibold text-primary shadow-lg transition hover:bg-white/90 hover:scale-105"
              >
                Explorar Arcade
              </Link>
              <Link
                href="/educacional"
                className="rounded-xl bg-white/10 border-2 border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/20"
              >
                Explorar Educacional
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
