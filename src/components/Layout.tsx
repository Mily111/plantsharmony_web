// components/Layout.tsx
import { ReactNode } from "react";
import PrivateHeader from "./PrivateHeader";
import PublicHeader from "./PublicHeader";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <header>{isAuthenticated ? <PrivateHeader /> : <PublicHeader />}</header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
