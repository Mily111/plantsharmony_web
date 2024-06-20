"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import PublicHeader from "@/components/PublicHeader";
import PrivateHeader from "@/components/PrivateHeader";
import "../utils/fontawesome";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" data-theme="light">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMiMyomnZAc5WbF41t2knv5K3PHxDoSmcbBx4YW"
            crossOrigin="anonymous"
          />
        </head>
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
