import type {Metadata} from 'next';
import { Inter } from "next/font/google";
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AnimatedBackground } from "./components/animated-background";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: 'Esports Oracle',
  description: 'AI-powered predictions for your favorite esports titles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased relative`}>
        <AnimatedBackground />
        <div className="relative z-0">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
