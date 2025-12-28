'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, Gamepad2, BookOpen, Briefcase, Wrench, Heart, Sparkles } from 'lucide-react';

const navigation = [
  { name: 'Arcade', href: '/arcade', icon: Gamepad2, color: 'from-purple-500 to-pink-500' },
  { name: 'Educacional', href: '/educacional', icon: BookOpen, color: 'from-cyan-500 to-blue-500' },
  { name: 'Profissional', href: '/profissional', icon: Briefcase, soon: true },
  { name: 'Estudio', href: '/estudio', icon: Wrench, soon: true },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d18]/90 backdrop-blur-xl border-b border-white/10">
      <nav className="container-main flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 text-white font-display font-bold text-lg shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/50 transition-shadow">
            <span className="relative z-10">E</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              EAI Games
            </span>
            <span className="text-[10px] text-purple-400 font-medium -mt-0.5">Play & Learn</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                item.soon
                  ? 'text-white/30 cursor-default'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
              {item.soon && (
                <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/40">
                  Em breve
                </span>
              )}
              {!item.soon && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-pink-500/0 hover:from-purple-500/10 hover:via-purple-500/5 hover:to-pink-500/10 transition-all duration-300" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Link
            href="/busca"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            title="Buscar"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Favorites */}
          <Link
            href="/meus-jogos"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
            title="Meus Jogos"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Play Now Button - Desktop */}
          <Link
            href="/arcade"
            className="hidden sm:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Jogar
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/5 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0d0d18]/95 backdrop-blur-xl animate-fade-in">
          <div className="container-main py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  item.soon
                    ? 'text-white/30'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  item.soon ? 'bg-white/5' : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                }`}>
                  <item.icon className="h-4 w-4" />
                </div>
                {item.name}
                {item.soon && (
                  <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/40">
                    Em breve
                  </span>
                )}
              </Link>
            ))}

            {/* Mobile Play Button */}
            <div className="pt-4 border-t border-white/10 mt-4">
              <Link
                href="/arcade"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles className="h-4 w-4" />
                Jogar Agora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
