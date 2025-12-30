'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  ChevronRight,
  Sparkles,
  Filter,
  Star,
  Target,
  Gamepad2
} from 'lucide-react';
import {
  lessonPlans,
  getLessonPlansByFilters,
  getSubjects,
  subjectColors,
  subjectIcons,
} from '@/data/lesson-plans';
import { schoolGrades } from '@/data/educational-games';

const difficultyLabels = {
  facil: { label: 'Fácil', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  medio: { label: 'Médio', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  avancado: { label: 'Avançado', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

export default function PlanoAulaPage() {
  const [selectedSubject, setSelectedSubject] = useState('todos');
  const [selectedGrade, setSelectedGrade] = useState('todos');

  const subjects = getSubjects();
  const filteredPlans = getLessonPlansByFilters(selectedSubject, selectedGrade);

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-emerald-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Planos de Aula</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Planos de Aula
            </h1>
            <p className="text-white/60">Aulas prontas usando jogos EAI - Para professores</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
              <Sparkles className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold text-white mb-1">
                Planos completos alinhados à BNCC
              </h2>
              <p className="text-white/60 text-sm">
                Cada plano inclui objetivos, materiais, passo a passo, avaliação e jogos EAI integrados.
                Pronto para usar em sala de aula!
              </p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              {lessonPlans.length} planos disponíveis
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-sm">
            <GraduationCap className="h-4 w-4 text-emerald-400" />
            <span className="font-medium text-white">{lessonPlans.length} planos</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/20 px-4 py-2.5 text-sm">
            <BookOpen className="h-4 w-4 text-blue-400" />
            <span className="font-medium text-white">{subjects.length} matérias</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-4 py-2.5 text-sm">
            <Users className="h-4 w-4 text-purple-400" />
            <span className="font-medium text-white">1º ao 9º ano</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-pink-500/10 border border-pink-500/20 px-4 py-2.5 text-sm">
            <Gamepad2 className="h-4 w-4 text-pink-400" />
            <span className="font-medium text-white">Jogos integrados</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-4 text-white/70">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filtrar planos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject Filter */}
            <div>
              <label className="block text-xs text-white/50 mb-2">Matéria</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubject('todos')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedSubject === 'todos'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Todas
                </button>
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedSubject === subject
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{subjectIcons[subject]}</span>
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Filter */}
            <div>
              <label className="block text-xs text-white/50 mb-2">Ano Escolar</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedGrade('todos')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedGrade === 'todos'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Todos
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade.toString())}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedGrade === grade.toString()
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {grade}º
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-white/60 text-sm">
            {filteredPlans.length} plano{filteredPlans.length !== 1 ? 's' : ''} encontrado{filteredPlans.length !== 1 ? 's' : ''}
          </p>
          {(selectedSubject !== 'todos' || selectedGrade !== 'todos') && (
            <button
              onClick={() => {
                setSelectedSubject('todos');
                setSelectedGrade('todos');
              }}
              className="text-sm text-emerald-400 hover:text-emerald-300 transition"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Lesson Plans Grid */}
        {filteredPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlans.map((plan) => (
              <Link
                key={plan.id}
                href={`/plano-aula/${plan.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300"
              >
                {/* Header with gradient */}
                <div className={`h-24 bg-gradient-to-r ${subjectColors[plan.subject] || 'from-gray-500 to-gray-600'} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl opacity-30">{plan.subjectIcon}</span>
                  </div>

                  {/* Featured badge */}
                  {plan.featured && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-yellow-500/90 px-2 py-1 text-xs font-bold text-yellow-900">
                      <Star className="h-3 w-3" />
                      Destaque
                    </div>
                  )}

                  {/* Subject badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                    <span>{plan.subjectIcon}</span>
                    {plan.subject}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {plan.title}
                  </h3>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${difficultyLabels[plan.difficulty].color}`}>
                      {difficultyLabels[plan.difficulty].label}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/10 text-white/70">
                      {plan.grades.length === 1
                        ? `${plan.grades[0]}º ano`
                        : `${plan.grades[0]}º-${plan.grades[plan.grades.length - 1]}º ano`}
                    </span>
                  </div>

                  {/* Duration and games */}
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {plan.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gamepad2 className="h-3.5 w-3.5" />
                      {plan.games.length} jogo{plan.games.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Objectives preview */}
                  <div className="flex items-start gap-2 text-white/60 text-sm">
                    <Target className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                    <span className="line-clamp-2">{plan.objectives[0]}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-white/40">
                    {plan.bnccCodes?.length ? `BNCC: ${plan.bnccCodes.slice(0, 2).join(', ')}${plan.bnccCodes.length > 2 ? '...' : ''}` : 'Alinhado à BNCC'}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 group-hover:text-emerald-300">
                    Ver plano
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 mb-4">
              <GraduationCap className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="font-display text-xl font-semibold text-white mb-2">
              Nenhum plano encontrado
            </h2>
            <p className="text-white/50 max-w-md mx-auto mb-6">
              Não encontramos planos com os filtros selecionados. Tente outra combinação!
            </p>
            <button
              onClick={() => {
                setSelectedSubject('todos');
                setSelectedGrade('todos');
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Precisa de um plano específico?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-6">
            Nossos planos são criados por educadores e alinhados à BNCC.
            Cada jogo EAI foi desenvolvido pensando no uso pedagógico em sala de aula.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/educacional"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <Gamepad2 className="h-4 w-4" />
              Ver Jogos Educacionais
            </Link>
            <Link
              href="/jogos"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <Sparkles className="h-4 w-4" />
              Todos os Jogos EAI
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
