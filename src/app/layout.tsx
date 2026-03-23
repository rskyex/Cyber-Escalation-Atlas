import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cyber Escalation Atlas™",
  description:
    "A policy-grade interactive reference for understanding cyber operations, escalation dynamics, and governance frameworks.",
  openGraph: {
    title: "Cyber Escalation Atlas™",
    description:
      "Strategic behavior, governance, and infrastructure entanglement — a policy-grade interactive reference for cyber conflict analysis.",
    siteName: "Cyber Escalation Atlas™",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Escalation Atlas™",
    description:
      "Strategic behavior, governance, and infrastructure entanglement — a policy-grade interactive reference for cyber conflict analysis.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-ink-800 text-ink dark:text-steel-200 font-sans">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
