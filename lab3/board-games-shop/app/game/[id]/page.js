"use client";

import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BoardGameContext from "../../_contexts/BoardGameContext";
import Link from "next/link";

export default function GameDetails() {
  const params = useParams();
  const { games } = useContext(BoardGameContext);
  const [game, setGame] = useState(null);

  useEffect(() => {
    const foundGame = games.find((g) => g.id.toString() === params.id);
    setGame(foundGame);
  }, [games, params.id]);

  if (!game) {
    return <div className="text-center mt-10">Ładowanie szczegółów gry... (Upewnij się, że lista z Contextu zdążyła się załadować)</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6 border border-gray-200">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Wróć do listy gier</Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div className="bg-gray-100 p-4 rounded flex items-center justify-center min-h-[300px]">
          {game.images && game.images.length > 0 ? (
            <img src={game.images[0]} alt={game.title} className="max-w-full h-auto object-contain max-h-[400px]" />
          ) : (
            <p className="text-gray-500">Brak zdjęcia</p>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
          <p className="text-2xl font-bold text-orange-600 mb-6">{game.price_pln ? `${game.price_pln.toFixed(2)} zł` : "Brak ceny"}</p>
          
          <div className="space-y-2 mb-6 text-gray-700">
            <p><strong>Wydawca:</strong> {game.publisher}</p>
            <p><strong>Liczba graczy:</strong> {game.min_players} - {game.max_players}</p>
            <p><strong>Średni czas gry:</strong> ~{game.avg_play_time_minutes} min</p>
            <p><strong>Typ:</strong> {game.type} {game.is_expansion ? "(Dodatek)" : ""}</p>
          </div>

          <div className="border-t pt-4 mt-6">
            <h2 className="text-xl font-semibold mb-2">Opis gry:</h2>
            <div className="text-gray-600 space-y-2">
              {Array.isArray(game.description) 
                ? game.description.map((par, i) => <p key={i}>{par}</p>) 
                : <p>{game.description || "Brak opisu."}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}