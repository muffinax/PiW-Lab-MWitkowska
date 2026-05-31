import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "./_contexts/BoardGameContext";
import Link from "next/link";
import LoginButtons from "./_components/LoginButtons";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Board Game Shop",
  description: "Sklep i katalog z grami planszowymi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <GameProvider>
          <header>
            <div className="header-up">
              <h1>
                <Link href="/" className="header-title">Board Game Shop</Link>
              </h1>
              
              <div className="header-buttons">
                <Link href="/add" className="header-button">Nowa Gra</Link>
                <button className="header-button">Koszyk</button>
                <LoginButtons />
              </div>
            </div>
          </header>

          <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 pb-10">
            {children}
          </main>
        </GameProvider>
      </body>
    </html>
  );
}