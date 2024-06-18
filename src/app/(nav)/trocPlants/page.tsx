"use client";
import AuthMiddleware from "@/middleware/authMiddleware";
import React, { useEffect, useState } from "react";
import {
  getAllTrades,
  deleteTradeRequest,
  updateTradeRequest,
} from "@/utils/api";
import { Trade } from "@/types/types";
import Image from "next/image";

export default function TrocPlants() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    getAllTrades()
      .then((data) => setTrades(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id: number) => {
    const res = await deleteTradeRequest(id);
    if (res.message === "Trade deleted") {
      setTrades(trades.filter((trade) => trade.Id_request !== id));
    } else {
      alert("Erreur lors de la suppression de la demande d'échange");
    }
  };

  const handleUpdate = async (id: number, data: Partial<Trade>) => {
    const res = await updateTradeRequest(id, data);
    if (res.message === "Trade updated") {
      setTrades(
        trades.map((trade) =>
          trade.Id_request === id ? { ...trade, ...data } : trade
        )
      );
    } else {
      alert("Erreur lors de la mise à jour de la demande d'échange");
    }
  };

  return (
    <AuthMiddleware>
      <h1 className="text-2xl font-bold mb-4">Demandes de troc de plantes</h1>
      <ul>
        {trades.map((trade) => (
          <li
            key={trade.Id_request}
            className="card bg-base-100 shadow-xl mb-4"
          >
            <div className="card-body">
              <h2 className="card-title">{trade.name_plant}</h2>
              <p>{trade.state_exchange}</p>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={`/${trade.photo}`}
                  alt={trade.name_plant}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <p>Proposé par: {trade.username}</p>
              <button
                onClick={() =>
                  handleUpdate(trade.Id_request, {
                    // Mettre à jour les données ici
                  })
                }
                className="btn btn-secondary mr-2"
              >
                Mettre à jour
              </button>
              <button
                onClick={() => handleDelete(trade.Id_request)}
                className="btn btn-error"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </AuthMiddleware>
  );
}
