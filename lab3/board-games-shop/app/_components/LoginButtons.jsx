"use client";

import useUser from "../_data/useUser";
import Link from "next/link";
import { logout } from "../_data/auth";

export default function LoginButtons() {
  const user = useUser();
  
  if (user) {
    return (
      <button onClick={logout} className="header-button cursor-pointer">
        Cześć, {user.displayName?.split(' ')[0] || "Użytkowniku"} (Wyloguj)
      </button>
    );
  }

  return (
    <Link href="/login" className="header-button flex items-center justify-center no-underline cursor-pointer">
      Logowanie
    </Link>
  );
}