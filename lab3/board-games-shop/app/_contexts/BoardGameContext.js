"use client";

import { createContext, useEffect, useState } from "react";


const BoardGameContext = createContext();
export default BoardGameContext;

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);


  useEffect(() => {
    // API
    fetch("https://szandala.github.io/piwo-api/board-games.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.board_games) {
          setGames(data.board_games);
        }
      })
      .catch(() => alert("Nie udało się pobrać listy gier z API!"));
  }, []);

  const addNewGame = (gameData) => {
    const newGame = {
      ...gameData,
      id: Date.now(), 
    };
    
    setGames((prevGames) => [...prevGames, newGame]);

  };

  const removeGame = (id) => {
    const newGames = games.filter((game) => game.id !== id);
    setGames(newGames);
  };

  return (
    <BoardGameContext.Provider value={{ games, setGames, addNewGame, removeGame }}>
      {children}
    </BoardGameContext.Provider>
  );
};