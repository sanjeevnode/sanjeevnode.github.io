import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import AuthContext from "./context/AuthContext";

const nunito = Nunito({
  variable: "--font-custom",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased font-sans`}>
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
