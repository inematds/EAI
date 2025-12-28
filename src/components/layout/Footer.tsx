import Link from 'next/link';
import { Gamepad2, BookOpen, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a14]">
      <div className="container-main py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 text-white font-display font-bold">
                E
              </div>
              <span className="font-display text-xl font-bold text-white">EAI Games</span>
            </div>
            <p className="text-sm text-white/50 max-w-sm">
              A plataforma que combina diversão e aprendizado. Jogos casuais, conteúdo educacional e desenvolvimento profissional em um só lugar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Explorar</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/arcade" className="text-white/50 hover:text-purple-400 transition flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Arcade
              </Link>
              <Link href="/educacional" className="text-white/50 hover:text-cyan-400 transition flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Educacional
              </Link>
              <Link href="/meus-jogos" className="text-white/50 hover:text-pink-400 transition flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Meus Jogos
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Legal</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/sobre" className="text-white/50 hover:text-white transition">
                Sobre
              </Link>
              <Link href="/termos" className="text-white/50 hover:text-white transition">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="text-white/50 hover:text-white transition">
                Privacidade
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} EAI Games. Todos os direitos reservados.
          </p>
          <p className="text-sm text-white/30">
            Feito com <span className="text-pink-500">♥</span> para educação e diversão
          </p>
        </div>
      </div>
    </footer>
  );
}
