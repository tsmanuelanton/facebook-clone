import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionContextProvider from "@/context/SessionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facebook",
  description: "Facebook clone for learning purposes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionContextProvider>{children}</SessionContextProvider>
      </body>
    </html>
  );
}
