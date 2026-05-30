"use client";

import { useContext, useState, useMemo, useEffect } from "react";
import BoardGameContext from "./_contexts/BoardGameContext";
import BoardGame from "./_components/BoardGame";

export default function Home() {
  const { games } = useContext(BoardGameContext);
  const [query, setQuery] = useState("");

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const lowerQuery = query.toLowerCase();
      return (
        (game.title && game.title.toLowerCase().includes(lowerQuery)) ||
        (game.publisher && game.publisher.toLowerCase().includes(lowerQuery)) ||
        (game.type && game.type.toLowerCase().includes(lowerQuery))
      );
    });
  }, [games, query]);

  return (
    <section className="flex flex-col w-full">
      
      <h2 className="font-bold text-2xl text-gray-800 text-center mb-6">
        Katalog Gier Planszowych
      </h2>

      <div className="home-search-container">
        <label htmlFor="game-name" className="home-search-label">
          Znajdź grę w katalogu:
        </label>
        <input
          type="text"
          id="game-name"
          placeholder="Szukaj po nazwie lub wydawcy..."
          className="header-input home-search-input" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <hr className="my-2 border-gray-200 mb-8" />

      {filteredGames.length === 0 ? (
        <p className="text-gray-500 italic text-center text-lg mt-4">
          Brak wyników dla &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div className="shop-grid">
          {filteredGames.map((game) => (
            <BoardGame 
              key={game.id} 
              {...game} 
              onAddToCart={(title) => {
                alert(`Dodano ${title} do koszyka!`);
              }} 
            />
          ))}
        </div>
      )}
    </section>
  );
}