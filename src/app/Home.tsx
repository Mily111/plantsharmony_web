"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import Header from "@/components/Header";
import Button from "../../ui/Button";

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <Image
          priority={false} // {false} | {true}
          src="/images/bgHome.png" // Assurez-vous que le chemin vers l'image est correct
          alt="Background image"
          layout="fill"
          objectFit="cover"
          className={styles.backgroundImage}
        />

        <Header />
        <h1
          className="overline"
          style={{
            position: "absolute",
            top: "15%",
            left: "57%",
            transform: "translate(-50%, -50%)",
            color: "#10b981",
            fontSize: "45px",
            fontWeight: "bold",
            zIndex: 2, // Assurez-vous que le texte est au-dessus de l'image de fond
          }}
        >
          Bienvenue chez PlantsHarmony
        </h1>
        <section className={styles.homeSection}>
          {/* Utilisation du composant Header */}

          <div className={styles.imageContainer}>
            <Image
              src="/images/bgHome.png"
              alt="Plants"
              layout="fill"
              object-fit="cover"
            />
            <p className={styles.textOverlay}>
              PlantsHarmony, là où la passion pour les plantes rencontre la
              technologie pour créer une expérience florale exceptionnelle.
              Plongez dans un univers où l'équilibre entre la nature et la
              technologie se fusionne harmonieusement pour vous offrir une
              connexion authentique avec le monde végétal. 🌿 Cultivez votre
              bonheur PlantsHarmony vous accompagne dans votre voyage vers une
              vie florissante. Recevez des conseils personnalisés pour chaque
              plante, que ce soit une beauté d'intérieur délicate ou une
              éclatante création en plein air. Trouvez la plante parfaite qui
              s'accorde naturellement avec votre espace de vie, créant un
              équilibre visuel et émotionnel unique. 📸 Capturez la beauté,
              découvrez l'intelligence Prenez une photo de votre plante mystère,
              laissez notre intelligence artificielle révéler son nom et ses
              secrets. Une expérience intuitive qui ajoute une touche de
              fascination à votre aventure végétale. 🌱 Partagez, Échangez,
              Prospérez Dans notre communauté PlantsHarmony, partagez vos
              connaissances, échangez des boutures et créez des liens avec des
              passionnés de plantes du monde entier. Cultivez non seulement des
              plantes, mais aussi des amitiés et une compréhension plus profonde
              de la nature. 🌞 Connectez-vous à la nature en temps réel Explorez
              les bienfaits de la météo en direct pour guider vos soins aux
              plantes. Adaptez vos rituels de jardinage aux conditions
              météorologiques, créant ainsi une harmonie parfaite entre la
              nature et votre jardin.
            </p>
            {/* Le reste du texte */}
            <Button />
          </div>
        </section>
        <section className={styles.footerSection}>
          <Link href="/" className={styles.buttonLink}>
            Se Deconnecter
          </Link>
        </section>
      </div>
    </>
  );
}
