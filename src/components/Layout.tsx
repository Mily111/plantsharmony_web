import Link from "next/link";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faPlus,
  faExchangeAlt,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto p-4">
      <header className="bg-primary text-primary-content p-4 rounded-lg mb-4">
        <h1 className="text-3xl font-bold">
          <FontAwesomeIcon icon={faSeedling} /> Troc Ta Plante
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/addPlants"
                className="btn btn-secondary flex items-center"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Ajoute ta plante pour un troc
              </Link>
            </li>
            <li>
              <Link
                href="/trocPlants"
                className="btn btn-secondary flex items-center"
              >
                <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                Troc ta plante
              </Link>
            </li>
            <li>
              <Link
                href="/plantsAvailable"
                className="btn btn-secondary flex items-center"
              >
                <FontAwesomeIcon icon={faLeaf} className="mr-2" />
                Plantes disponibles pour le troc
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
