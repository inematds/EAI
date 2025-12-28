import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="container-main py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-arcade text-white font-display font-bold text-sm">
              E
            </div>
            <span className="font-display font-semibold text-zinc-900">EAI</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/sobre" className="text-zinc-600 hover:text-primary transition">
              Sobre
            </Link>
            <Link href="/termos" className="text-zinc-600 hover:text-primary transition">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-zinc-600 hover:text-primary transition">
              Privacidade
            </Link>
            <Link href="/contato" className="text-zinc-600 hover:text-primary transition">
              Contato
            </Link>
          </nav>

          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} EAI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
