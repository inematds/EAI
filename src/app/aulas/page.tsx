'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Gamepad2,
  Star,
  ChevronRight,
  Sparkles,
  Trophy,
  Target,
  Users,
  Check,
  Lock
} from 'lucide-react';
import { schoolGrades } from '@/data/educational-games';
import { getLessonPlansByGrade } from '@/data/lesson-plans';

const gradeEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
const gradeColors = [
  'from-pink-500 to-rose-500',
  'from-orange-500 to-amber-500',
  'from-yellow-500 to-lime-500',
  'from-emerald-500 to-teal-500',
  'from-cyan-500 to-blue-500',
];

interface StudentProgress {
  currentGrade: number | null;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  completedGames: string[];
  completedLessons: string[];
  achievements: string[];
  streak: number;
  lastAccess: string | null;
}

export default function AulasPage() {
  const [studentProgress, setStudentProgress] = useState<StudentProgress | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    // Carregar progresso do aluno do localStorage
    const saved = localStorage.getItem('eai-student-progress');
    if (saved) {
      setStudentProgress(JSON.parse(saved));
    }
  }, []);

  const handleStartJourney = (grade: number) => {
    if (!studentProgress) {
      setShowNameInput(true);
      // Salvar temporariamente o ano escolhido
      localStorage.setItem('eai-temp-grade', grade.toString());
    }
  };

  const handleCreateStudent = () => {
    const tempGrade = localStorage.getItem('eai-temp-grade');
    const grade = tempGrade ? parseInt(tempGrade) : 1;

    const newStudent: StudentProgress = {
      currentGrade: grade,
      name: newName || 'Estudante EAI',
      avatar: '🧑‍🎓',
      level: 1,
      xp: 0,
      coins: 50, // Moedas iniciais
      completedGames: [],
      completedLessons: [],
      achievements: ['first_access'],
      streak: 1,
      lastAccess: new Date().toISOString(),
    };

    localStorage.setItem('eai-student-progress', JSON.stringify(newStudent));
    localStorage.removeItem('eai-temp-grade');
    setStudentProgress(newStudent);
    setShowNameInput(false);

    // Redirecionar para a página do ano
    window.location.href = `/aulas/${grade}ano`;
  };

  const fundamentalGrades = schoolGrades.filter(g => g.grade <= 5);

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Aulas</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/25">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Minhas Aulas
            </h1>
            <p className="text-white/60">Escolha seu ano e comece a aprender!</p>
          </div>
        </div>

        {/* Student Card (if exists) */}
        {studentProgress && (
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-3xl">
                {studentProgress.avatar}
              </div>
              <div className="flex-1">
                <h2 className="font-display text-xl font-bold text-white mb-1">
                  Olá, {studentProgress.name}! 👋
                </h2>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-4 w-4" />
                    Nível {studentProgress.level}
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Sparkles className="h-4 w-4" />
                    {studentProgress.xp} XP
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    🪙 {studentProgress.coins} moedas
                  </span>
                  <span className="flex items-center gap-1 text-orange-400">
                    🔥 {studentProgress.streak} dias seguidos
                  </span>
                </div>
              </div>
              {studentProgress.currentGrade && (
                <Link
                  href={`/aulas/${studentProgress.currentGrade}ano`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                >
                  Continuar {studentProgress.currentGrade}º Ano
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* XP Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                <span>Progresso para Nível {studentProgress.level + 1}</span>
                <span>{studentProgress.xp % 100}/100 XP</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                  style={{ width: `${studentProgress.xp % 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20">
              <Target className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold text-white mb-1">
                Aprenda de forma personalizada
              </h2>
              <p className="text-white/60 text-sm">
                Cada ano tem planos de aula completos, jogos educativos alinhados à BNCC, e um sistema de recompensas
                para você acompanhar seu progresso. Colecione moedas e abra o Baú EAI!
              </p>
            </div>
          </div>
        </div>

        {/* Grade Selection */}
        <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-purple-400" />
          Escolha seu Ano
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
          {fundamentalGrades.map((grade, index) => {
            const plansCount = getLessonPlansByGrade(grade.grade).length;
            const isCurrentGrade = studentProgress?.currentGrade === grade.grade;

            return (
              <Link
                key={grade.id}
                href={studentProgress ? `/aulas/${grade.grade}ano` : '#'}
                onClick={(e) => {
                  if (!studentProgress) {
                    e.preventDefault();
                    handleStartJourney(grade.grade);
                  }
                }}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isCurrentGrade
                    ? 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]'
                    : 'border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                }`}
              >
                {/* Gradient Header */}
                <div className={`h-28 bg-gradient-to-br ${gradeColors[index]} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-50">{gradeEmojis[index]}</span>
                  </div>

                  {isCurrentGrade && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-purple-600">
                      <Check className="h-3 w-3" />
                      Atual
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 bg-white/5">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {grade.grade}º Ano
                  </h3>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">
                    {grade.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {plansCount} planos
                    </span>
                    <span className="flex items-center gap-1">
                      <Gamepad2 className="h-3.5 w-3.5" />
                      Jogos BNCC
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between bg-white/5">
                  <span className="text-xs text-white/40">
                    Fundamental I
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-purple-400 group-hover:text-purple-300">
                    {studentProgress ? 'Entrar' : 'Começar'}
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Features Grid */}
        <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-400" />
          O que você vai encontrar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 mb-4">
              <BookOpen className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-display font-bold text-white mb-2">Planos de Aula</h3>
            <p className="text-white/60 text-sm">
              Aulas completas alinhadas à BNCC com objetivos, materiais e jogos integrados.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 mb-4">
              <Gamepad2 className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-display font-bold text-white mb-2">Jogos Educativos</h3>
            <p className="text-white/60 text-sm">
              Jogos específicos para cada matéria e ano escolar. Aprenda brincando!
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 mb-4">
              <Target className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-display font-bold text-white mb-2">Progresso Pessoal</h3>
            <p className="text-white/60 text-sm">
              Acompanhe seu nível, XP e conquistas. Veja sua evolução ao longo do tempo!
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 mb-4">
              <span className="text-2xl">🎁</span>
            </div>
            <h3 className="font-display font-bold text-white mb-2">Caixa Mágica</h3>
            <p className="text-white/60 text-sm">
              Colecione moedas e abra caixas com recompensas especiais e surpresas!
            </p>
          </div>
        </div>

        {/* CTA Section */}
        {!studentProgress && (
          <div className="rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-8 text-center">
            <span className="text-5xl mb-4 block">🚀</span>
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-6">
              Escolha seu ano escolar acima e ganhe suas primeiras moedas para abrir a Caixa Mágica!
              Sua aventura de aprendizado começa agora.
            </p>
            <div className="flex items-center justify-center gap-2 text-purple-400">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Ganhe 50 moedas ao começar!</span>
            </div>
          </div>
        )}
      </div>

      {/* Name Input Modal */}
      {showNameInput && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e] rounded-2xl border border-purple-500/30 p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">👋</span>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Qual é seu nome?
              </h2>
              <p className="text-white/60 text-sm">
                Vamos personalizar sua experiência de aprendizado!
              </p>
            </div>

            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 mb-4"
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowNameInput(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateStudent}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition"
              >
                Começar! 🚀
              </button>
            </div>

            <p className="text-center text-white/40 text-xs mt-4">
              Você ganhará 50 moedas para começar!
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
