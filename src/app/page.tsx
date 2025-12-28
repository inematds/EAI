'use client';

import Link from 'next/link';
import { Gamepad2, BookOpen, Briefcase, Wrench, TrendingUp, Star, ChevronRight, Sparkles, Zap, Shield, Play } from 'lucide-react';
import { GameCard } from '@/components/games';
import { arcadeGames } from '@/data/arcade-games';
import { educationalGames } from '@/data/educational-games';

const areas = [
  {
    name: 'Arcade',
    description: 'Jogos casuais para se divertir',
    icon: Gamepad2,
    href: '/arcade',
    gradient: 'from-purple-600 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    available: true,
    count: arcadeGames.length,
  },
  {
    name: 'Educacional',
    description: 'Aprenda brincando',
    icon: BookOpen,
    href: '/educacional',
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    available: true,
    count: educationalGames.length,
  },
  {
    name: 'Profissional',
    description: 'Evolua sua carreira',
    icon: Briefcase,
    href: '/profissional',
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    available: false,
  },
  {
    name: 'Estúdio',
    description: 'Crie seus jogos',
    icon: Wrench,
    href: '/estudio',
    gradient: 'from-amber-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.4)',
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
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#0d0d18] to-pink-900/20" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse" />

        <div className="container-main relative">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-2 text-sm text-white/80 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>{arcadeGames.length + educationalGames.length} jogos disponíveis</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
              <span className="text-white">Jogue. </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Aprenda.
              </span>
              <span className="text-white"> Evolua.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              A plataforma que combina diversão e aprendizado. Jogos casuais,
              conteúdo educacional e desenvolvimento profissional em um só lugar.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/arcade"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105"
              >
                <Play className="h-5 w-5 fill-current" />
                Jogar Agora
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/educacional"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                <BookOpen className="h-5 w-5" />
                Explorar Educacional
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        <div className="container-main relative">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Mais Jogados
                </h2>
                <p className="text-sm text-white/50">Os favoritos da comunidade</p>
              </div>
            </div>
            <Link
              href="/busca"
              className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
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
      <section className="py-16 lg:py-24 relative">
        <div className="container-main">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Destaques Arcade
                </h2>
                <p className="text-sm text-white/50">Jogos casuais para se divertir</p>
              </div>
            </div>
            <Link
              href="/arcade"
              className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
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
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />
        <div className="container-main relative">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Destaques Educacionais
                </h2>
                <p className="text-sm text-white/50">Aprenda brincando</p>
              </div>
            </div>
            <Link
              href="/educacional"
              className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
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
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl mb-4">
              Explore o Ecossistema <span className="gradient-text">EAI</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
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
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 ${
                    isAvailable
                      ? 'hover:scale-[1.03] hover:-translate-y-1'
                      : 'opacity-60'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Hover glow */}
                  {isAvailable && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ boxShadow: `0 0 60px ${area.glowColor}` }}
                    />
                  )}

                  {!isAvailable && (
                    <span className="absolute top-4 right-4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/50">
                      Em breve
                    </span>
                  )}

                  <div className={`inline-flex rounded-xl p-3 bg-gradient-to-br ${area.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {area.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/50">{area.description}</p>

                  {area.count && (
                    <p className="mt-4 text-xs font-medium text-white/30">
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
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
        <div className="container-main relative">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Por que escolher a <span className="gradient-text">EAI</span>?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg shadow-amber-500/25 mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">Zero Fricção</h3>
              <p className="text-white/50">
                Jogue instantaneamente, sem cadastro ou downloads necessários
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">Aprenda Brincando</h3>
              <p className="text-white/50">
                Conteúdo educacional divertido e engajante para todas as idades
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">Seguro para Crianças</h3>
              <p className="text-white/50">
                Conteúdo curado e apropriado para todas as idades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-gradient" />
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />

            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl mb-4">
                Pronto para começar?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Escolha sua área favorita e comece a jogar agora mesmo. Sem cadastro, sem complicação.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link
                  href="/arcade"
                  className="px-8 py-4 rounded-xl bg-white text-purple-600 font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
                >
                  Explorar Arcade
                </Link>
                <Link
                  href="/educacional"
                  className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/20"
                >
                  Explorar Educacional
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
