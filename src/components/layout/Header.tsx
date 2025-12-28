'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, Gamepad2, BookOpen, Briefcase, Wrench, Heart } from 'lucide-react';

const navigation = [
  { name: 'Arcade', href: '/arcade', icon: Gamepad2 },
  { name: 'Educacional', href: '/educacional', icon: BookOpen },
  { name: 'Profissional', href: '/profissional', icon: Briefcase, soon: true },
  { name: 'Estudio', href: '/estudio', icon: Wrench, soon: true },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
      <nav className="container-main flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-arcade text-white font-display font-bold">
            E
          </div>
          <span className="font-display text-xl font-bold text-zinc-900">EAI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-1.5 text-sm font-medium transition ${
                item.soon
                  ? 'text-zinc-400 cursor-default'
                  : 'text-zinc-600 hover:text-primary'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
              {item.soon && (
                <span className="ml-1 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                  Em breve
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Search, Favorites & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <Link
            href="/busca"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-100 hover:text-primary"
            title="Buscar"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/meus-jogos"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-100 hover:text-red-500"
            title="Meus Jogos"
          >
            <Heart className="h-5 w-5" />
          </Link>

          <button
            type="button"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white animate-fade-in">
          <div className="container-main py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  item.soon
                    ? 'text-zinc-400'
                    : 'text-zinc-700 hover:bg-zinc-100 hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
                {item.soon && (
                  <span className="ml-auto rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">
                    Em breve
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
