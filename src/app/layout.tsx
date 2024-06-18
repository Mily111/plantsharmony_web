"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import PublicHeader from "@/components/PublicHeader";
import PrivateHeader from "@/components/PrivateHeader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" data-theme="light">
        <body className={inter.className}>
          <HeaderSelector />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}

const HeaderSelector = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <PrivateHeader /> : <PublicHeader />;
};
