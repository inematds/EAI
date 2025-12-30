import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  ChevronRight,
  ChevronLeft,
  Target,
  Gamepad2,
  ClipboardList,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Star,
  Package,
  Timer,
  Brain,
  Sparkles,
  Play
} from 'lucide-react';
import {
  lessonPlans,
  getLessonPlanBySlug,
  subjectColors,
  subjectIcons,
} from '@/data/lesson-plans';
import { educationalGames } from '@/data/educational-games';
import { arcadeGames } from '@/data/arcade-games';

// Generate static params
export function generateStaticParams() {
  return lessonPlans.map((plan) => ({
    slug: plan.slug,
  }));
}

const difficultyLabels = {
  facil: { label: 'Fácil', color: 'bg-green-500/20 text-green-400 border-green-500/30', desc: 'Ideal para iniciantes' },
  medio: { label: 'Médio', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', desc: 'Requer conhecimento prévio' },
  avancado: { label: 'Avançado', color: 'bg-red-500/20 text-red-400 border-red-500/30', desc: 'Para turmas experientes' },
};

export default async function PlanoAulaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plan = getLessonPlanBySlug(slug);

  if (!plan) {
    notFound();
  }

  // Find games in the platform
  const allGames = [...educationalGames, ...arcadeGames];
  const platformGames = plan.games.map(gameRef => {
    const foundGame = allGames.find(g => g.slug === gameRef.slug);
    return { ...gameRef, platformGame: foundGame };
  });

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-emerald-400 transition">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/plano-aula" className="hover:text-emerald-400 transition">
            Planos de Aula
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white truncate max-w-[200px]">{plan.title}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/plano-aula"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar aos planos
        </Link>

        {/* Header */}
        <div className={`rounded-2xl bg-gradient-to-r ${subjectColors[plan.subject] || 'from-gray-500 to-gray-600'} p-6 md:p-8 mb-8 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute right-4 top-4 text-8xl opacity-20">
            {plan.subjectIcon}
          </div>

          <div className="relative z-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                {plan.subjectIcon} {plan.subject}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-medium border ${difficultyLabels[plan.difficulty].color}`}>
                {difficultyLabels[plan.difficulty].label}
              </span>
              {plan.featured && (
                <span className="flex items-center gap-1 rounded-full bg-yellow-500/90 px-2.5 py-1 text-xs font-bold text-yellow-900">
                  <Star className="h-3 w-3" />
                  Destaque
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">
              {plan.title}
            </h1>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 md:gap-6 text-white/90 text-sm">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {plan.grades.length === 1
                  ? `${plan.grades[0]}º ano`
                  : `${plan.grades[0]}º ao ${plan.grades[plan.grades.length - 1]}º ano`}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {plan.duration}
              </span>
              <span className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                {plan.games.length} jogo{plan.games.length !== 1 ? 's' : ''}
              </span>
              {plan.bnccCodes && plan.bnccCodes.length > 0 && (
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  BNCC: {plan.bnccCodes.join(', ')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Objectives */}
            <section className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                  <Target className="h-5 w-5 text-emerald-400" />
                </div>
                <h2 className="font-display text-xl font-bold text-white">Objetivos de Aprendizagem</h2>
              </div>
              <ul className="space-y-3">
                {plan.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/80">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Step by Step */}
            <section className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
                  <ClipboardList className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="font-display text-xl font-bold text-white">Passo a Passo</h2>
              </div>

              <div className="space-y-6">
                {plan.steps.map((step, index) => (
                  <div key={index} className="relative pl-8 pb-6 border-l-2 border-white/10 last:border-l-0 last:pb-0">
                    {/* Step Number */}
                    <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-bold text-white">
                      {index + 1}
                    </div>

                    {/* Step Content */}
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{step.phase}</h3>
                        <span className="flex items-center gap-1 text-xs text-white/50 bg-white/5 px-2 py-1 rounded-full">
                          <Timer className="h-3 w-3" />
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 mb-3">{step.description}</p>
                      <ul className="space-y-2">
                        {step.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start gap-2 text-sm text-white/80">
                            <ArrowRight className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Games Section */}
            <section className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20">
                  <Gamepad2 className="h-5 w-5 text-pink-400" />
                </div>
                <h2 className="font-display text-xl font-bold text-white">Jogos Utilizados</h2>
              </div>

              <div className="space-y-4">
                {platformGames.map((game, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    {/* Game thumbnail */}
                    <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                      {game.platformGame ? (
                        <img
                          src={game.platformGame.thumbnailUrl}
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Gamepad2 className="h-8 w-8 text-white/30" />
                      )}
                    </div>

                    {/* Game info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{game.title}</h3>
                      <p className="text-sm text-white/60 mb-2">{game.usage}</p>
                      <div className="flex items-center gap-3 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {game.duration}
                        </span>
                        {game.platformGame && (
                          <Link
                            href={game.platformGame.area === 'EDUCATIONAL' ? `/educacional/${game.slug}` : `/arcade/${game.slug}`}
                            className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition font-medium"
                          >
                            <Play className="h-3 w-3" />
                            Jogar agora
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Assessment */}
            <section className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
                  <Brain className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="font-display text-xl font-bold text-white">Avaliação</h2>
              </div>
              <ul className="space-y-3">
                {plan.assessment.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/80">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Materials */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-4 w-4 text-amber-400" />
                <h3 className="font-semibold text-white">Materiais Necessários</h3>
              </div>
              <ul className="space-y-2">
                {plan.materials.map((material, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-amber-400">•</span>
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Teacher Tips */}
            {plan.teacherTips && plan.teacherTips.length > 0 && (
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  <h3 className="font-semibold text-white">Dicas para o Professor</h3>
                </div>
                <ul className="space-y-2">
                  {plan.teacherTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="text-yellow-400">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extensions */}
            {plan.extensions && plan.extensions.length > 0 && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-semibold text-white">Extensões / Lição de Casa</h3>
                </div>
                <ul className="space-y-2">
                  {plan.extensions.map((extension, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="text-cyan-400">+</span>
                      <span>{extension}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* BNCC Codes */}
            {plan.bnccCodes && plan.bnccCodes.length > 0 && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  <h3 className="font-semibold text-white">Códigos BNCC</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.bnccCodes.map((code, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-mono font-medium"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Difficulty Info */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
                <h3 className="font-semibold text-white">Nível de Dificuldade</h3>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${difficultyLabels[plan.difficulty].color}`}>
                <span className="font-medium">{difficultyLabels[plan.difficulty].label}</span>
              </div>
              <p className="text-sm text-white/50 mt-2">
                {difficultyLabels[plan.difficulty].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Plans CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/plano-aula"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
          >
            <ChevronLeft className="h-4 w-4" />
            Ver todos os planos
          </Link>
        </div>
      </div>
    </main>
  );
}
