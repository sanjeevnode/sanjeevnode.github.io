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

export const metadata: Metadata = {
  title: "Sanjeev Singh | Software Engineer",
  description: "I am a software engineer with a passion for building web applications.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${nunito.variable} ${jost.variable} ${jetbrains.variable} antialiased font-sans`}>
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
