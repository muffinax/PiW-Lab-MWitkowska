"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { loginWithGoogle, loginWithEmailPass } from "../_data/auth";
import useUser from "../_data/useUser";

export default function LoginPage() {
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) redirect("/");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmailPass(email, password);
    } catch (err) {
      console.error("Błąd logowania:", err);
      setError("Nieprawidłowy email lub hasło.");
    }
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-black text-base";

  return (
    <section className="form-container mt-10 shadow-md" style={{ maxWidth: "400px", width: "100%", margin: "2rem auto" }}>
      <h2 className="list-title text-xl font-bold mb-6 text-center">Logowanie do sklepu</h2>
      
      <form onSubmit={handleEmailLogin} className="flex flex-col w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className={inputClass} 
          placeholder="twoj@email.com" 
          required 
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className={inputClass} 
          placeholder="••••••••" 
          required 
        />

        {error && <p className="error-text text-center mb-3">{error}</p>}

        <button type="submit" className="game-button mb-4">
          Zaloguj się
        </button>
      </form>

      <hr className="my-4 border-gray-200" />

      <button 
        onClick={loginWithGoogle}
        className="game-button"
        style={{ backgroundColor: "#4285F4" }}
      >
        Kontynuuj z Google
      </button>

      {/* NOWY LINK DO REJESTRACJI */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Nie masz konta?{" "}
        <a href="/register" className="text-blue-600 hover:underline font-bold">
          Zarejestruj się
        </a>
      </p>

    </section>
  );
}