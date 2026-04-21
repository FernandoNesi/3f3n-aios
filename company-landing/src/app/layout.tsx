import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3F3N | Engenharia de Conversão Determinística",
  description: "A primeira e única plataforma de IA OS projetada para escalar operações de alto ticket com precisão cirúrgica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}>
      <body className="font-sans min-h-full bg-background text-foreground selection:bg-brand-blue/30">
        {children}
      </body>
    </html>
  );
}
