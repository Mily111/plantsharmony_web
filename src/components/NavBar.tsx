// components/NavBar.tsx
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/meteo">Météo</Link></li>
        <li><Link href="/infosConseilsPlantes">Infos & Conseils Plantes</Link></li>
        <li><Link href="/trocTaPlante">Troc'Ta Plante</Link></li>
        <li><Link href="/quelleEstMaPlante">Quelle Est Ma Plante?</Link></li>
      </ul>
    </nav>
  );
}
