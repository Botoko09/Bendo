import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Téléphones Congo",
  description: "Découvrez les téléphones disponibles et contactez directement le vendeur.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
