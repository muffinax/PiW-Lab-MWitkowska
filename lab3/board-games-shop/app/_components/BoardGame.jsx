import React, { useContext, useState } from 'react';
import Link from 'next/link';
import BoardGameContext from '../_contexts/BoardGameContext';

export const BoardGame = ({ 
  id,
  title, 
  images,
  description,
  min_players, 
  max_players, 
  avg_play_time_minutes, 
  publisher, 
  is_expansion, 
  price_pln, 
  type,
  onAddToCart
}) => {
  const { cart } = useContext(BoardGameContext);
  
  const isBought = cart.some(item => item.id === id);
  const firstImage = images && images.length > 0 ? images[0] : null;

  const handleBuy = (e) => {
    e.preventDefault();
    if (onAddToCart) onAddToCart();
  };

  return (
    <div className={`game-card flex flex-col ${isBought ? 'opacity-50 grayscale' : ''}`}>
      <Link href={`/game/${id}`} className="flex flex-col h-full text-inherit no-underline cursor-pointer">
        <div className="game-image-container">
          {firstImage ? (
            <img src={firstImage} alt={`Okładka gry ${title}`} className="game-image" />
          ) : (
            <span style={{color: '#999'}}>Brak zdjęcia</span>
          )}
        </div>

        <div className="game-info flex-grow">
          <h3 className="game-title" title={title}>{title}</h3>
          
          <div className="game-tags">
            {type && <span className="game-tag">{type}</span>}
            {is_expansion && <span className="game-tag" style={{backgroundColor: '#e0b3ff'}}>Dodatek</span>}
          </div>

          <p className="game-details">
            Gracze: {min_players}-{max_players} | Czas: ~{avg_play_time_minutes} min<br/>
            Wydawca: {publisher || "Brak danych"}
          </p>
          
          <h4 className="game-price">
            {price_pln ? `${price_pln.toFixed(2)} zł` : "Niedostępna"}
          </h4>
        </div>
      </Link>
      
      <div className="p-4 pt-0 mt-auto">
        <button 
          onClick={handleBuy}
          disabled={isBought}
          className={`game-button w-full py-2 rounded font-bold text-white transition-opacity ${isBought ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:opacity-80'}`}
        >
          {isBought ? "Niedostępna" : "Kup Teraz"}
        </button>
      </div>
    </div>
  );
};

export default BoardGame;