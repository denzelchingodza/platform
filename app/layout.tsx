import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import Cursor from "@/components/Cursor";
import AudioPlayer from "@/components/AudioPlayer";
import DataLines from "@/components/DataLines";
import { TransitionProvider } from "@/context/TransitionContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "DenzOS",
  description: "A live software ecosystem built by Denzel Chingodza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable}`}>
        <TransitionProvider>
          <Cursor />
          <AudioPlayer />
          <DataLines />
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}