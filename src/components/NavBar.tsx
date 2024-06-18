// components/NavBar.tsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/meteo">Météo</Link>
        </li>
        <li>
          <Link href="/infosConseilsPlantes">Infos & Conseils Plantes</Link>
        </li>
        <li>
          <Link href="/trocPlants">Troc Ta Plante</Link>
        </li>
        <li>
          <Link href="/plantsAvailable">Plantes disponibles pour le troc</Link>
        </li>
        <li>
          <Link href="/addPlants">Ajouter une Plante</Link>
        </li>
      </ul>
    </nav>
  );
}
