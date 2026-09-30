import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import type { Metadata } from "next";
import {Figtree} from "next/font/google";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Cognix AI - Agentic Workflow Platform",
  description: "Next generation autonomous AI agentic platform.",
};

const figtree = Figtree({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body style={{ margin: 0, padding: 0 }} className={figtree.className} >
          <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
