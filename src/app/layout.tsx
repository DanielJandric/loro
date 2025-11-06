import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "E-billets Loro.ch : Anomalies Statistiques Détectées";
const description =
  "Analyse indépendante (p < 0.01) démontrant une dépendance temporelle et un RTP anormalement bas sur les e-billets Loro.ch.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_CH",
    siteName: "Analyse E-billets Loro.ch",
    images: [
      {
        url: "/og", // generated dynamically by opengraph-image.tsx
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Report',
              name: title,
              inLanguage: 'fr-CH',
              description,
              dateModified: new Date().toISOString(),
              author: {
                '@type': 'Person',
                name: 'Analyse indépendante',
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
