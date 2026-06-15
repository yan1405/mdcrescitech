import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "mdcrescitech | Conversão de arquivos para Markdown",
  description: "Converta seus arquivos para Markdown — Crescitech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans text-brand-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
