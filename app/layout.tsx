import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Vortex CS - Plataforma de Customer Success com IA",
  description: "Otimize a gestão do relacionamento com clientes B2B, consolide interações, feedback e acompanhe o progresso de projetos com insights de IA.",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ClerkProvider>
            <ConvexClientProvider>
              {children}
              <ScrollToTop />
              <Toaster richColors position="top-right" />
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
