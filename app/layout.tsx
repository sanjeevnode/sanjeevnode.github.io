import type { Metadata } from "next";
import { Nunito, Jost, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AuthContext from "./context/AuthContext";

const nunito = Nunito({
  variable: "--font-custom",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const jost = Jost({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://www.sanjeevnode.in";
const TITLE = "Sanjeev Singh | Full Stack Software Engineer & Builder";
const DESCRIPTION =
  "Sanjeev Singh is a software development engineer building full-stack web and mobile products — Next.js, Flutter, Node.js, AWS serverless, and ML-powered systems shipped to production.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Sanjeev Singh", "Software Engineer", "Full Stack Developer",
    "Next.js", "Flutter", "Node.js", "AWS", "Machine Learning", "Portfolio",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sanjeev Singh",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/web-app-manifest-512x512.png", width: 512, height: 512, alt: "Sanjeev Singh" }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/web-app-manifest-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "Sanjeev Singh | Software Engineer",
    capable: true,
  },
  manifest: "/site.webmanifest",
};

// runs before paint: dark by default, honor a saved choice
const themeInit = `try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t?t==='dark':true)}catch(e){document.documentElement.classList.add('dark')}`;

// identity schema for search engines and LLMs
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sanjeev Singh",
  url: SITE_URL,
  jobTitle: "Software Development Engineer",
  worksFor: { "@type": "Organization", name: "AlignTogether Solutions Pvt. Ltd." },
  address: { "@type": "PostalAddress", addressLocality: "Bhopal", addressCountry: "IN" },
  email: "mailto:me.sanjeevks@gmail.com",
  sameAs: [
    "https://github.com/sanjeevnode",
    "https://www.linkedin.com/in/sanjeevnode",
  ],
  knowsAbout: [
    "Full Stack Development", "Next.js", "React", "Flutter", "Node.js",
    "AWS", "MongoDB", "PostgreSQL", "Machine Learning", "Computer Vision",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${nunito.variable} ${jost.variable} ${jetbrains.variable} antialiased font-sans`}>
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
