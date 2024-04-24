// src/components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-500 bg-green-100 p-4 ">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" passHref>
          <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
            Accueil
          </span>
        </Link>
        <Link href="/conseils" passHref>
          <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
            Conseils plantes
          </span>
        </Link>
        <Link href="/meteo" passHref>
          <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
            Meteo
          </span>
        </Link>
        <Link href="/trocPlante" passHref>
          <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
            Troc' ta plante
          </span>
        </Link>
        <Link href="/identification" passHref>
          <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
            Quelle est ma plante?
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
