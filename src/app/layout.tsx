import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrixJuste - Les vrais prix du bâtiment en Côte d'Ivoire",
  description: "Découvrez les prix réels des matériaux de construction, générez des devis intelligents et analysez vos devis pour éviter les arnaques.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#F6F8FA]">{children}</body>
    </html>
  );
}
