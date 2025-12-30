'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Gamepad2,
  Star,
  Sparkles,
  Trophy,
  Target,
  Users,
  Check,
  Lock,
  Gift,
  Flame,
  Settings,
  Play
} from 'lucide-react';
import { schoolGrades, educationalGames } from '@/data/educational-games';

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
  favoriteTeachers: string[];
  unlockedAvatars: string[];
  bauOpened: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  coinReward: number;
  unlocked: boolean;
}

const avatarOptions = ['🧑‍🎓', '👧', '👦', '🧒', '👨‍🎓', '👩‍🎓', '🦸', '🦹', '🧙', '🧚', '🧜', '🧝', '🤖', '👽', '🦊', '🐱', '🐶', '🦁', '🐯', '🐼'];

const achievements: Achievement[] = [
  { id: 'first_access', title: 'Primeiro Passo', description: 'Começou sua jornada na EAI', icon: '🎯', xpReward: 10, coinReward: 5, unlocked: false },
  { id: 'first_game', title: 'Gamer Iniciante', description: 'Completou seu primeiro jogo', icon: '🎮', xpReward: 20, coinReward: 10, unlocked: false },
  { id: 'first_lesson', title: 'Estudante Dedicado', description: 'Completou sua primeira aula', icon: '📚', xpReward: 25, coinReward: 15, unlocked: false },
  { id: 'streak_3', title: 'Em Chamas', description: '3 dias seguidos de estudo', icon: '🔥', xpReward: 30, coinReward: 20, unlocked: false },
  { id: 'streak_7', title: 'Determinado', description: '7 dias seguidos de estudo', icon: '💪', xpReward: 50, coinReward: 30, unlocked: false },
  { id: 'games_5', title: 'Explorador', description: 'Jogou 5 jogos diferentes', icon: '🗺️', xpReward: 40, coinReward: 25, unlocked: false },
  { id: 'games_10', title: 'Mestre dos Jogos', description: 'Jogou 10 jogos diferentes', icon: '👑', xpReward: 75, coinReward: 50, unlocked: false },
  { id: 'bau_first', title: 'Caçador de Tesouros', description: 'Abriu sua primeira Caixa Mágica', icon: '🎁', xpReward: 15, coinReward: 0, unlocked: false },
  { id: 'level_5', title: 'Em Ascensão', description: 'Alcançou o nível 5', icon: '⭐', xpReward: 100, coinReward: 50, unlocked: false },
  { id: 'level_10', title: 'Veterano', description: 'Alcançou o nível 10', icon: '🌟', xpReward: 200, coinReward: 100, unlocked: false },
];

const bauRewards = [
  { type: 'coins', min: 10, max: 50, icon: '🪙', message: 'moedas!' },
  { type: 'xp', min: 15, max: 40, icon: '⭐', message: 'XP bonus!' },
  { type: 'avatar', icon: '🎭', message: 'Novo avatar desbloqueado!' },
  { type: 'sticker', options: ['🏆', '🌈', '🚀', '💎', '🎪', '🎨', '🌸', '⚡'], icon: '🏷️', message: 'Sticker especial!' },
];

export default function AulaAnoClient() {
  const params = useParams();
  const router = useRouter();
  const anoParam = params.ano as string;
  const gradeNumber = parseInt(anoParam.replace('ano', ''));

  const [studentProgress, setStudentProgress] = useState<StudentProgress | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'bau'>('overview');
  const [showBauModal, setShowBauModal] = useState(false);
  const [bauResult, setBauResult] = useState<{ type: string; value: any; message: string } | null>(null);
  const [isOpeningBau, setIsOpeningBau] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Get grade info
  const gradeInfo = schoolGrades.find(g => g.grade === gradeNumber);
  const gradeGames = educationalGames.filter(game => {
    if (!game.schoolGrade) return false;
    if (Array.isArray(game.schoolGrade)) {
      return game.schoolGrade.includes(gradeNumber);
    }
    return game.schoolGrade === gradeNumber;
  });

  useEffect(() => {
    const saved = localStorage.getItem('eai-student-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      // Update current grade if different
      if (progress.currentGrade !== gradeNumber) {
        progress.currentGrade = gradeNumber;
        localStorage.setItem('eai-student-progress', JSON.stringify(progress));
      }
      setStudentProgress(progress);
    } else {
      // Redirect to aulas page if no student data
      router.push('/aulas');
    }
  }, [gradeNumber, router]);

  const updateProgress = (updates: Partial<StudentProgress>) => {
    if (!studentProgress) return;

    const newProgress = { ...studentProgress, ...updates };

    // Level up check
    const xpForNextLevel = newProgress.level * 100;
    if (newProgress.xp >= xpForNextLevel) {
      newProgress.level += 1;
      newProgress.xp = newProgress.xp - xpForNextLevel;
    }

    localStorage.setItem('eai-student-progress', JSON.stringify(newProgress));
    setStudentProgress(newProgress);
  };

  const markGamePlayed = (slug: string) => {
    if (!studentProgress) return;
    if (!studentProgress.completedGames.includes(slug)) {
      const newCompletedGames = [...studentProgress.completedGames, slug];
      updateProgress({
        completedGames: newCompletedGames,
        xp: studentProgress.xp + 10,
        coins: studentProgress.coins + 5,
      });
    }
  };

  const openBau = () => {
    if (!studentProgress || studentProgress.coins < 25) return;

    setIsOpeningBau(true);

    // Animate for 2 seconds
    setTimeout(() => {
      // Random reward
      const rewardType = bauRewards[Math.floor(Math.random() * bauRewards.length)];
      let result: { type: string; value: any; message: string };

      if (rewardType.type === 'coins') {
        const amount = Math.floor(Math.random() * (rewardType.max! - rewardType.min! + 1)) + rewardType.min!;
        result = { type: 'coins', value: amount, message: `+${amount} ${rewardType.message}` };
        updateProgress({
          coins: studentProgress.coins - 25 + amount,
          xp: studentProgress.xp + 5,
          bauOpened: (studentProgress.bauOpened || 0) + 1,
        });
      } else if (rewardType.type === 'xp') {
        const amount = Math.floor(Math.random() * (rewardType.max! - rewardType.min! + 1)) + rewardType.min!;
        result = { type: 'xp', value: amount, message: `+${amount} ${rewardType.message}` };
        updateProgress({
          coins: studentProgress.coins - 25,
          xp: studentProgress.xp + amount,
          bauOpened: (studentProgress.bauOpened || 0) + 1,
        });
      } else if (rewardType.type === 'avatar') {
        const availableAvatars = avatarOptions.filter(a => !studentProgress.unlockedAvatars?.includes(a));
        if (availableAvatars.length > 0) {
          const newAvatar = availableAvatars[Math.floor(Math.random() * availableAvatars.length)];
          result = { type: 'avatar', value: newAvatar, message: rewardType.message };
          updateProgress({
            coins: studentProgress.coins - 25,
            xp: studentProgress.xp + 5,
            unlockedAvatars: [...(studentProgress.unlockedAvatars || []), newAvatar],
            bauOpened: (studentProgress.bauOpened || 0) + 1,
          });
        } else {
          // All avatars unlocked, give coins instead
          const amount = 30;
          result = { type: 'coins', value: amount, message: `+${amount} moedas! (todos avatares desbloqueados)` };
          updateProgress({
            coins: studentProgress.coins - 25 + amount,
            xp: studentProgress.xp + 5,
            bauOpened: (studentProgress.bauOpened || 0) + 1,
          });
        }
      } else {
        const sticker = rewardType.options![Math.floor(Math.random() * rewardType.options!.length)];
        result = { type: 'sticker', value: sticker, message: `${sticker} ${rewardType.message}` };
        updateProgress({
          coins: studentProgress.coins - 25,
          xp: studentProgress.xp + 5,
          bauOpened: (studentProgress.bauOpened || 0) + 1,
        });
      }

      setBauResult(result);
      setIsOpeningBau(false);
    }, 2000);
  };

  const changeAvatar = (avatar: string) => {
    updateProgress({ avatar });
    setShowAvatarPicker(false);
  };

  if (!studentProgress || !gradeInfo) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-white/60">Carregando...</div>
      </main>
    );
  }

  const xpForNextLevel = studentProgress.level * 100;
  const xpProgress = (studentProgress.xp / xpForNextLevel) * 100;

  return (
    <main className="flex-1">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-purple-400 transition">Home</Link>
          <span>/</span>
          <Link href="/aulas" className="hover:text-purple-400 transition">Aulas</Link>
          <span>/</span>
          <span className="text-white">{gradeNumber}º Ano</span>
        </nav>

        {/* Header with Student Info */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Avatar */}
            <button
              onClick={() => setShowAvatarPicker(true)}
              className="relative group"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-4xl shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/50 transition">
                {studentProgress.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs text-white opacity-0 group-hover:opacity-100 transition">
                <Settings className="h-3 w-3" />
              </div>
            </button>

            {/* Student Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-2xl font-bold text-white">
                  {studentProgress.name}
                </h1>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold">
                  {gradeNumber}º Ano
                </span>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 text-sm mb-3">
                <div className="flex items-center gap-1.5 text-yellow-400">
                  <Star className="h-4 w-4" />
                  <span className="font-bold">Nível {studentProgress.level}</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Sparkles className="h-4 w-4" />
                  <span>{studentProgress.xp} XP</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <span>🪙</span>
                  <span>{studentProgress.coins} moedas</span>
                </div>
                <div className="flex items-center gap-1.5 text-orange-400">
                  <Flame className="h-4 w-4" />
                  <span>{studentProgress.streak} dias</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Trophy className="h-4 w-4" />
                  <span>{studentProgress.achievements?.length || 1} conquistas</span>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="max-w-md">
                <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                  <span>Nível {studentProgress.level} → {studentProgress.level + 1}</span>
                  <span>{studentProgress.xp}/{xpForNextLevel} XP</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowBauModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition"
              >
                <Gift className="h-5 w-5" />
                Caixa Mágica
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: 'Minhas Tarefas', icon: Target },
            { id: 'profile', label: 'Perfil', icon: Users },
            { id: 'bau', label: 'Caixa Mágica', icon: Gift },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">{gradeGames.length}</div>
                <div className="text-sm text-white/60">Jogos do {gradeNumber}º Ano</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{studentProgress.completedGames.filter(g => gradeGames.some(gg => gg.slug === g)).length}</div>
                <div className="text-sm text-white/60">Concluídos</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                <div className="text-3xl font-bold text-orange-400">{gradeGames.length - studentProgress.completedGames.filter(g => gradeGames.some(gg => gg.slug === g)).length}</div>
                <div className="text-sm text-white/60">Pendentes</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                <div className="text-3xl font-bold text-pink-400">{studentProgress.bauOpened || 0}</div>
                <div className="text-sm text-white/60">Caixas Abertas</div>
              </div>
            </div>

            {/* Games Checklist - Minhas Tarefas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-400" />
                  Minhas Tarefas
                </h2>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-green-400">
                    <Check className="h-4 w-4" />
                    <span>{studentProgress.completedGames.filter(g => gradeGames.some(gg => gg.slug === g)).length}</span>
                  </div>
                  <span className="text-white/40">/</span>
                  <span className="text-white/60">{gradeGames.length} jogos</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${gradeGames.length > 0 ? (studentProgress.completedGames.filter(g => gradeGames.some(gg => gg.slug === g)).length / gradeGames.length) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-xs text-white/50 mt-2">
                  {studentProgress.completedGames.filter(g => gradeGames.some(gg => gg.slug === g)).length === gradeGames.length
                    ? '🎉 Parabéns! Você completou todos os jogos!'
                    : `Complete os jogos para ganhar XP e moedas!`}
                </p>
              </div>

              {/* Games List */}
              <div className="space-y-2">
                {gradeGames.map((game, index) => {
                  const isPlayed = studentProgress.completedGames.includes(game.slug);
                  return (
                    <Link
                      key={game.id}
                      href={`/educacional/${game.slug}`}
                      onClick={() => markGamePlayed(game.slug)}
                      className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        isPlayed
                          ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
                          : 'bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-white/10'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                        isPlayed
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 text-white/30 group-hover:bg-purple-500/20 group-hover:text-purple-400'
                      }`}>
                        {isPlayed ? <Check className="h-5 w-5" /> : <span className="text-sm font-bold">{index + 1}</span>}
                      </div>

                      {/* Game Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-display font-bold text-sm mb-0.5 ${
                          isPlayed ? 'text-green-400' : 'text-white group-hover:text-purple-400'
                        } transition`}>
                          {game.title}
                        </h3>
                        <p className="text-xs text-white/50 truncate">{game.description}</p>
                      </div>

                      {/* Category & Rewards */}
                      <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/60">
                          {game.category}
                        </span>
                        {!isPlayed && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-cyan-400">+10 XP</span>
                            <span className="text-amber-400">+5 🪙</span>
                          </div>
                        )}
                      </div>

                      {/* Play Button */}
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 transition ${
                        isPlayed
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white'
                      }`}>
                        {isPlayed ? <Check className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Achievements Preview */}
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Suas Conquistas
              </h2>
              <div className="flex flex-wrap gap-3">
                {achievements.slice(0, 6).map((achievement) => {
                  const isUnlocked = studentProgress.achievements?.includes(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                        isUnlocked
                          ? 'bg-yellow-500/10 border-yellow-500/30'
                          : 'bg-white/5 border-white/10 opacity-50'
                      }`}
                    >
                      <span className="text-xl">{achievement.icon}</span>
                      <span className={`text-sm font-medium ${isUnlocked ? 'text-white' : 'text-white/50'}`}>
                        {achievement.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Info */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Meu Perfil
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setShowAvatarPicker(true)}
                    className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-4xl hover:shadow-lg hover:shadow-purple-500/25 transition"
                  >
                    {studentProgress.avatar}
                  </button>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{studentProgress.name}</h3>
                    <p className="text-white/60">{gradeNumber}º Ano - Fundamental I</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="text-2xl font-bold text-yellow-400">{studentProgress.level}</div>
                    <div className="text-sm text-white/60">Nível</div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="text-2xl font-bold text-cyan-400">{studentProgress.xp}</div>
                    <div className="text-sm text-white/60">XP Total</div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="text-2xl font-bold text-amber-400">{studentProgress.coins}</div>
                    <div className="text-sm text-white/60">Moedas</div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="text-2xl font-bold text-orange-400">{studentProgress.streak}</div>
                    <div className="text-sm text-white/60">Dias Seguidos</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-400" />
                  Estatísticas
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-white/60">Jogos Jogados</span>
                      <span className="text-white">{studentProgress.completedGames.length}/{gradeGames.length}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        style={{ width: `${(studentProgress.completedGames.length / gradeGames.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-white/60">Caixas Abertas</span>
                      <span className="text-white">{studentProgress.bauOpened || 0}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                        style={{ width: `${Math.min((studentProgress.bauOpened || 0) * 10, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Conquistas
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => {
                  const isUnlocked = studentProgress.achievements?.includes(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${
                        isUnlocked
                          ? 'bg-yellow-500/10 border-yellow-500/30'
                          : 'bg-white/5 border-white/10 opacity-60'
                      }`}
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
                        isUnlocked ? 'bg-yellow-500/20' : 'bg-white/10'
                      }`}>
                        {isUnlocked ? achievement.icon : <Lock className="h-5 w-5 text-white/30" />}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-white/50'}`}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-white/50">{achievement.description}</p>
                      </div>
                      {isUnlocked && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-cyan-400">+{achievement.xpReward} XP</span>
                          <span className="text-amber-400">+{achievement.coinReward} 🪙</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bau' && (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl bg-gradient-to-b from-amber-500/20 to-orange-500/10 border border-amber-500/30 p-8 text-center">
              <div className="text-8xl mb-6 animate-bounce">🎁</div>
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Caixa Mágica
              </h2>
              <p className="text-white/70 mb-6">
                Abra caixas para ganhar moedas, XP, avatares e stickers especiais!
                Cada caixa custa 25 moedas.
              </p>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="rounded-xl bg-white/10 px-6 py-3">
                  <div className="text-2xl font-bold text-amber-400">🪙 {studentProgress.coins}</div>
                  <div className="text-sm text-white/60">Suas moedas</div>
                </div>
                <div className="rounded-xl bg-white/10 px-6 py-3">
                  <div className="text-2xl font-bold text-purple-400">{studentProgress.bauOpened || 0}</div>
                  <div className="text-sm text-white/60">Caixas abertas</div>
                </div>
              </div>

              <button
                onClick={() => setShowBauModal(true)}
                disabled={studentProgress.coins < 25}
                className={`px-8 py-4 rounded-2xl text-lg font-bold transition-all ${
                  studentProgress.coins >= 25
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                {studentProgress.coins >= 25 ? '🎁 Abrir Caixa (25 moedas)' : '🔒 Moedas insuficientes'}
              </button>

              {/* How to earn coins */}
              <div className="mt-8 text-left">
                <h3 className="font-display font-bold text-white mb-3">Como ganhar moedas:</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-blue-400" />
                    <span>+5 moedas por jogo jogado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    <span>+10 moedas por aula completada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span>+5-100 moedas por conquista</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-400" />
                    <span>+5 moedas por dia de streak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bau Modal */}
      {showBauModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e] rounded-2xl border border-amber-500/30 p-8 max-w-md w-full text-center">
            {!bauResult ? (
              <>
                <div className={`text-8xl mb-6 ${isOpeningBau ? 'animate-bounce' : ''}`}>
                  {isOpeningBau ? '✨' : '🎁'}
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  {isOpeningBau ? 'Abrindo...' : 'Abrir Caixa Mágica?'}
                </h2>
                {!isOpeningBau && (
                  <>
                    <p className="text-white/60 mb-6">
                      Custa 25 moedas. Você tem {studentProgress.coins} moedas.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowBauModal(false)}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={openBau}
                        disabled={studentProgress.coins < 25}
                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition disabled:opacity-50"
                      >
                        Abrir! 🎁
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="text-8xl mb-6 animate-pulse">
                  {bauResult.type === 'coins' ? '🪙' :
                   bauResult.type === 'xp' ? '⭐' :
                   bauResult.type === 'avatar' ? bauResult.value :
                   bauResult.value}
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  Parabéns! 🎉
                </h2>
                <p className="text-xl text-amber-400 font-bold mb-6">
                  {bauResult.message}
                </p>
                <button
                  onClick={() => {
                    setBauResult(null);
                    setShowBauModal(false);
                  }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition"
                >
                  Legal! 🙌
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e] rounded-2xl border border-purple-500/30 p-8 max-w-md w-full">
            <h2 className="font-display text-2xl font-bold text-white mb-6 text-center">
              Escolha seu Avatar
            </h2>
            <div className="grid grid-cols-5 gap-3 mb-6">
              {avatarOptions.map((avatar) => {
                const isUnlocked = avatar === '🧑‍🎓' || studentProgress.unlockedAvatars?.includes(avatar);
                const isSelected = studentProgress.avatar === avatar;
                return (
                  <button
                    key={avatar}
                    onClick={() => isUnlocked && changeAvatar(avatar)}
                    disabled={!isUnlocked}
                    className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl transition ${
                      isSelected
                        ? 'bg-purple-500 ring-2 ring-purple-400'
                        : isUnlocked
                          ? 'bg-white/10 hover:bg-white/20'
                          : 'bg-white/5 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    {isUnlocked ? avatar : <Lock className="h-4 w-4 text-white/30" />}
                  </button>
                );
              })}
            </div>
            <p className="text-center text-white/50 text-sm mb-4">
              Desbloqueie mais avatares abrindo a Caixa Mágica!
            </p>
            <button
              onClick={() => setShowAvatarPicker(false)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
