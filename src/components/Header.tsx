
// src/components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-500 bg-green-100 p-4 ">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" passHref>
          <span className="cursor-pointer text-black p-4 hover:bg-green-200">Accueil</span>
        </Link>
        <Link href="/conseils-plantes" passHref>
          <span className="cursor-pointer text-black p-4 hover:bg-green-200">Conseils plantes</span>
        </Link>
        <Link href="/meteo" passHref>
          <span className="cursor-pointer text-black p-4 hover:bg-green-200">Meteo</span>
        </Link>
        <Link href="/troc-plante" passHref>
          <span className="cursor-pointer text-black p-4 hover:bg-green-200">Troc' ta plante</span>
        </Link>
        <Link href="/identification-plante" passHref>
          <span className="cursor-pointer text-black p-4 hover:bg-green-200">Quelle est ma plante</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
