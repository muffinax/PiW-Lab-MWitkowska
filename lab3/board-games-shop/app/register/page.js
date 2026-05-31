"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { registerWithEmailPass } from "../_data/auth";
import useUser from "../_data/useUser";
import Link from "next/link";

export default function RegisterPage() {
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) redirect("/");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmailPass(email, password);
    } catch (err) {
      console.error("Błąd rejestracji:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Konto z tym adresem email już istnieje.");
      } else if (err.code === "auth/weak-password") {
        setError("Hasło musi mieć co najmniej 6 znaków.");
      } else {
        setError("Nie udało się utworzyć konta.");
      }
    }
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-black text-base";

  return (
    <section className="form-container mt-10 shadow-md" style={{ maxWidth: "400px", width: "100%", margin: "2rem auto" }}>
      <h2 className="list-title text-xl font-bold mb-6 text-center">Załóż nowe konto</h2>
      
      <form onSubmit={handleRegister} className="flex flex-col w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className={inputClass} 
          placeholder="twoj@email.com" 
          minLength="6"
          required 
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Hasło (min. 6 znaków)</label>
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
          Zarejestruj się
        </button>
      </form>

      <hr className="my-4 border-gray-200" />

      <p className="text-center text-sm text-gray-500 mt-2">
        Masz już konto?{" "}
        <Link href="/login" className="text-blue-600 hover:underline font-bold">
          Zaloguj się
        </Link>
      </p>
    </section>
  );
}