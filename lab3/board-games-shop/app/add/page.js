"use client";

import { useContext, useState, useRef } from "react";
import BoardGameContext from "../_contexts/BoardGameContext"; 

const NewGame = () => {
  const { addNewGame } = useContext(BoardGameContext);

  const [formData, setFormData] = useState({
    title: "",
    publisher: "",
    image: "",
    min_players: 1,
    max_players: 4,
    avg_play_time_minutes: 60,
    price_pln: "",
    type: "",
    is_expansion: false,
  });

  const descriptionRef = useRef(null);
  
  const [toast, setToast] = useState(false);
  const [error, setError] = useState(""); 

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = (e) => {
    if (e) e.preventDefault();

    if (!formData.title.trim()) {
      setError("Tytuł gry nie może być pusty!");
      return;
    }
    setError("");

    const rawDescription = descriptionRef.current?.value || "";
    const descriptionArray = rawDescription
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const gameData = {
      title: formData.title.trim(),
      images: formData.image ? [formData.image.trim()] : [],
      description: descriptionArray, // Tablica stringów
      min_players: Number(formData.min_players),
      max_players: Number(formData.max_players),
      avg_play_time_minutes: Number(formData.avg_play_time_minutes),
      publisher: formData.publisher.trim(),
      is_expansion: formData.is_expansion,
      price_pln: Number(formData.price_pln) || 0,
      type: formData.type.trim(),
    };

    addNewGame(gameData);

    setFormData({
      title: "",
      publisher: "",
      image: "",
      min_players: 1,
      max_players: 4,
      avg_play_time_minutes: 60,
      price_pln: "",
      type: "",
      is_expansion: false,
    });
    if (descriptionRef.current) {
      descriptionRef.current.value = "";
    }

    showToast();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black text-base";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <section className="list-card" style={{ maxWidth: "600px", width: "100%" }}>
      <h2 className="list-title">Nowa Gra Planszowa</h2>
      
      <form onSubmit={handleAdd} className="flex flex-col w-full mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div>
            <label className={labelClass}>Tytuł gry *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="Np. Terraformacja Marsa" />
          </div>
          <div>
            <label className={labelClass}>Wydawca</label>
            <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} className={inputClass} placeholder="Np. Rebel" />
          </div>
        </div>

        <div>
          <label className={labelClass}>URL okładki obrazka</label>
          <input type="url" name="image" value={formData.image} onChange={handleChange} className={inputClass} placeholder="https://link.jpg" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <div>
            <label className={labelClass}>Min graczy</label>
            <input type="number" min="1" name="min_players" value={formData.min_players} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Max graczy</label>
            <input type="number" min="1" name="max_players" value={formData.max_players} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Czas (min)</label>
            <input type="number" min="1" name="avg_play_time_minutes" value={formData.avg_play_time_minutes} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Cena (PLN)</label>
            <input type="number" step="0.01" min="0" name="price_pln" value={formData.price_pln} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 items-center mb-4">
          <div>
            <label className={labelClass}>Kategoria / Typ</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} className={inputClass.replace("mb-4", "")} placeholder="Np. Strategiczna" />
          </div>
          <div className="flex gap-4 mt-4 md:mt-0 justify-start pl-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input type="checkbox" name="is_expansion" checked={formData.is_expansion} onChange={handleChange} className="w-4 h-4" />
              Dodatek
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass}>Opis gry (Każdy enter to nowy akapit)</label>
          <textarea ref={descriptionRef} className={`${inputClass} h-24 resize-y`} placeholder="Wpisz krótki opis gry..." />
        </div>

        {error && <p className="text-red-500 text-sm mb-3 font-medium">{error}</p>}

        <button type="submit" className="board-game-button self-start" style={{ width: "auto", padding: "10px 24px" }}>
          Dodaj grę
        </button>
      </form>

      {toast && <div className="toast">Dodano pomyślnie!</div>}
    </section>
  );
};

export default NewGame;