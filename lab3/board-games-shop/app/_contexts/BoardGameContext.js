"use client";

import { createContext, useEffect, useState, useReducer } from "react";
import { db } from "../_data/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";

const BoardGameContext = createContext();
export default BoardGameContext;

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.find(item => item.id === action.payload.id)) return state;
      const addedState = [...state, action.payload];
      localStorage.setItem("cart", JSON.stringify(addedState));
      return addedState;
      
    case "REMOVE_FROM_CART":
      const removedState = state.filter(item => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(removedState));
      return removedState;

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatchCart({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }

    // LAB 3 API

    // fetch("https://szandala.github.io/piwo-api/board-games.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data && data.board_games) {
    //       setGames(data.board_games);
    //     }
    //   })
    //   .catch(() => alert("Nie udało się pobrać listy gier z API!"));

    const fetchGames = async () => {
      try {
        const q = query(collection(db, "boardgames"), limit(10));
        const querySnapshot = await getDocs(q);
        
        const gamesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setGames(gamesData);
      } catch (error) {
        console.error("Błąd bazy: ", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <BoardGameContext.Provider value={{ games, setGames, cart, dispatchCart }}>
      {children}
    </BoardGameContext.Provider>
  );
};