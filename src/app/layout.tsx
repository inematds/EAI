import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'EAI - Jogue. Aprenda. Evolua.',
    template: '%s | EAI',
  },
  description:
    'Plataforma de jogos casuais e educacionais. Jogue sem cadastro, aprenda brincando, evolua suas habilidades.',
  keywords: ['jogos', 'games', 'educacional', 'aprendizado', 'arcade', 'casual'],
  authors: [{ name: 'EAI' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'EAI',
    title: 'EAI - Jogue. Aprenda. Evolua.',
    description: 'Plataforma de jogos casuais e educacionais.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
