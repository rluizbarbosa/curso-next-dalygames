import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/header";


export const metadata: Metadata = {
  title: "Daly Games - Descubra os melhores jogos da atualidade para se divertir",
  description: "Mais de 10 mil jogos separados e organizados.",
  keywords: ["games", "jogos", "steam"],
  openGraph: {
    images: [`${process.env.PROJECT_URL}public/preview.png`]
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={``}
      >
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
