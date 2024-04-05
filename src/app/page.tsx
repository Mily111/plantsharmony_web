'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.css'; // Assurez-vous de créer un fichier CSS correspondant dans le même dossier ou ajustez le chemin d'importation
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';

export default function Home() {
  const [isInView, setIsInView] = useState(false);
  const backgroundSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        root: null, // null signifie le viewport
        rootMargin: '0px',
        threshold: 0.1, // 10% de l'élément doit être visible
      }
    );

    if (backgroundSectionRef.current) {
      observer.observe(backgroundSectionRef.current);
    }

    return () => {
      if (backgroundSectionRef.current) {
        observer.unobserve(backgroundSectionRef.current);
      }
    };
  }, []); // Ce useEffect remplace celui que vous aviez avec onScroll

  return (
    <div>
      <Header />
      <h1 style={{
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#006400',
  fontSize: '48px', // Ceci est un exemple de vert foncé.
  fontWeight: 'bold', // Assurez-vous que cette propriété est écrite correctement.
  zIndex: 1, // S'assurer que le texte est au-dessus des autres éléments
}}>Bienvenue dans PlantsHarmony</h1>
      <section className={styles.homeSection}>
        {/* Utilisation du composant Header */}
        
        <div className={styles.imageContainer}>
          <Image src="/images/bgHome.png" alt="Plants" layout="fill" objectFit="cover" />
        </div>
        
          <p>PlantsHarmony, là où la passion pour les plantes rencontre la technologie pour créer une expérience florale exceptionnelle...</p>
          {/* Le reste du texte */}
  
      </section>
        <Link href="/register">
          Enregistrer
        </Link>
        <Link href="/login">
          Connexion
        </Link>
      
    </div>
  );
}






// // src/app/home/page.tsx
// import Image from 'next/image';
// import Header from '@/components/Header';

// export default function HomePage() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Utilisation du composant Header */}
//       <Header />
//       {/* Hero section */}
//       <section className="relative h-screen">
//         {/* Hero Image */}
//         <div className="relative h-full w-full">
//         <Image
//             src="/images/image1.PNG" // Assure-toi que le chemin est correct
//             alt="Description"
//             width={1920} // Utilise la largeur réelle de ton image en pixels
//             height={1080} // Utilise la hauteur réelle de ton image en pixels
//             layout="responsive" // Cela permettra à l'image de s'adapter à la taille de son conteneur
//           />
//         </div>
//         {/* Overlay Content */}
//         <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-center items-center p-10 text-center">
//           <h1 className="text-6xl font-bold text-white">Plants Harmony</h1>
//           <p className="mt-4 text-xl text-gray-200">
//             Bienvenue dans PlantsHarmony...
//             {/* Autres détails ici */}
//           </p>
//         </div>
//       </section>

//       {/* Content after Hero section */}
//       <main className="flex-grow">
//         {/* ...content */}
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-100 p-4 text-center">
//         {/* ...footer content */}
//       </footer>
//     </div>
//   );
// }
