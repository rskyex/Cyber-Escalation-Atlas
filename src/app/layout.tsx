import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cyber Escalation Atlas · Escalation Observatory",
  description:
    "An atlas of machine-speed geopolitical escalation. Interactive observatory mapping AI-mediated escalation, attribution uncertainty, machine-speed governance, and cross-domain conflict propagation. Part of the Faultline research ecosystem by Risa Koyanagi.",
  authors: [{ name: "Risa Koyanagi", url: "https://risakoyanagi.com" }],
  openGraph: {
    title: "Cyber Escalation Atlas · Escalation Observatory",
    description:
      "Seven interactive layers tracing how cyber operations now propagate through AI command systems, satellite infrastructure, nuclear signaling, and political authority, at speeds that outpace human deliberation.",
    siteName: "Cyber Escalation Atlas · Faultline",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Escalation Atlas · Escalation Observatory",
    description:
      "An atlas of machine-speed geopolitical escalation. Seven interactive layers and an escalation simulator.",
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
