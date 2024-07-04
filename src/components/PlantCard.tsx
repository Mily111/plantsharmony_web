import Image from "next/image";
import { Plant } from "../types/types";
import { PlantCardProps } from "@/types/types";

// interface PlantCardProps {
//   plant: Plant;
// }

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => (
  <div className="card bg-base-100 shadow-xl">
    <figure className="relative w-full h-48">
      <Image
        src={`/${plant.photo}`} // Assurez-vous que ce chemin est correct
        // src={`http://172.20.10.6:5000/${plant.photo}`}
        alt={plant.name_plant}
        layout="fill"
        objectFit="cover"
        className="rounded-t-lg"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{plant.name_plant}</h2>
      <p>Proposé par: {plant.username}</p>
    </div>
  </div>
);

export default PlantCard;
