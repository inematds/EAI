import Link from 'next/link';
import { Gamepad2, BookOpen, Briefcase, Wrench } from 'lucide-react';

const areas = [
  {
    name: 'Arcade',
    description: 'Jogos casuais para se divertir',
    icon: Gamepad2,
    href: '/arcade',
    color: 'arcade',
    available: true,
  },
  {
    name: 'Educacional',
    description: 'Aprenda brincando',
    icon: BookOpen,
    href: '/educacional',
    color: 'educational',
    available: true,
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
    name: 'Estudio',
    description: 'Crie seus jogos',
    icon: Wrench,
    href: '/estudio',
    color: 'accent',
    available: false,
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-arcade to-primary-dark py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="container-main relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Jogue. Aprenda. Evolua.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              A plataforma que combina diversao e aprendizado. Jogos casuais,
              conteudo educacional e desenvolvimento profissional em um so lugar.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Link
                href="/arcade"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition hover:bg-white/90 hover:scale-105"
              >
                Comecar a Jogar
              </Link>
              <Link
                href="/educacional"
                className="rounded-lg border-2 border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Ver Educacional
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <h2 className="font-display text-2xl font-bold text-center text-zinc-900 sm:text-3xl">
            Explore o Ecossistema EAI
          </h2>
          <p className="mt-4 text-center text-zinc-600 max-w-2xl mx-auto">
            Quatro areas pensadas para diferentes momentos da sua jornada
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => {
              const Icon = area.icon;
              const isAvailable = area.available;

              return (
                <Link
                  key={area.name}
                  href={area.href}
                  className={`group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition ${
                    isAvailable
                      ? 'hover:shadow-lg hover:scale-[1.02] hover:border-primary/50'
                      : 'opacity-75 cursor-default'
                  }`}
                >
                  {!isAvailable && (
                    <span className="absolute top-3 right-3 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
                      Em breve
                    </span>
                  )}
                  <div
                    className={`inline-flex rounded-lg p-3 ${
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
                  <p className="mt-2 text-sm text-zinc-600">{area.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-50 py-16 lg:py-24">
        <div className="container-main">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-semibold text-zinc-900">Zero Friccao</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Jogue instantaneamente, sem cadastro ou downloads
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-educational/10 text-educational">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-semibold text-zinc-900">Aprenda Brincando</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Conteudo educacional divertido e engajante
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-semibold text-zinc-900">Seguro para Criancas</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Conteudo curado e apropriado para todas as idades
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
