"use client";

import React from "react";
// Remplacez les imports depuis 'next/router' par ceux depuis 'next/navigation'
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css"; // Assurez-vous de créer un fichier CSS correspondant dans le même dossier ou ajustez le chemin d'importation
import Header from "@/components/Header";
import Button from "./ui/Button";
import NavBar from "@/components/NavBar";

// eslint-disable-next-line @next/next/no-async-client-component
export default function Home() {
  return (
    <main className="bg-[url('/images/bgHome.png')] bg-cover bg-no-repeat bg-center">
      <div className={styles.homeContainer}>
        <Header />
        <h1
          className="overline"
          style={{
            position: "absolute",
            top: "15%",
            left: "57%",
            transform: "translate(-50%, -50%)",
            color: "#10b981",
            fontSize: "40px",
            fontWeight: "bold",
            zIndex: 2, // Assurez-vous que le texte est au-dessus de l'image de fond
          }}
        >
          Bienvenue dans PlantsHarmony
        </h1>

        <div className={styles.pContainer}>
          <p className={styles.textOverlay}>
            PlantsHarmony, là où la passion pour les plantes rencontre la
            technologie pour créer une expérience florale exceptionnelle.
            Plongez dans un univers où l'équilibre entre la nature et la
            technologie se fusionne harmonieusement pour vous offrir une
            connexion authentique avec le monde végétal. 🌿 Cultivez votre
            bonheur PlantsHarmony vous accompagne dans votre voyage vers une vie
            florissante. Recevez des conseils personnalisés pour chaque plante,
            que ce soit une beauté d'intérieur délicate ou une éclatante
            création en plein air. Trouvez la plante parfaite qui s'accorde
            naturellement avec votre espace de vie, créant un équilibre visuel
            et émotionnel unique. 📸 Capturez la beauté, découvrez
            l'intelligence Prenez une photo de votre plante mystère, laissez
            notre intelligence artificielle révéler son nom et ses secrets. Une
            expérience intuitive qui ajoute une touche de fascination à votre
            aventure végétale. 🌱 Partagez, Échangez, Prospérez Dans notre
            communauté PlantsHarmony, partagez vos connaissances, échangez des
            boutures et créez des liens avec des passionnés de plantes du monde
            entier. Cultivez non seulement des plantes, mais aussi des amitiés
            et une compréhension plus profonde de la nature. 🌞 Connectez-vous à
            la nature en temps réel Explorez les bienfaits de la météo en direct
            pour guider vos soins aux plantes. Adaptez vos rituels de jardinage
            aux conditions météorologiques, créant ainsi une harmonie parfaite
            entre la nature et votre jardin.
          </p>
          {/* Le reste du texte */}
        </div>

        <div className={styles.footerSection}>
          <Link href="/inscription" className={styles.buttonLink}>
            Créer un compte
          </Link>
          <Link href="/connexion" className={styles.buttonLink}>
            Se Connecter
          </Link>
        </div>
      </div>
    </main>
  );
}
