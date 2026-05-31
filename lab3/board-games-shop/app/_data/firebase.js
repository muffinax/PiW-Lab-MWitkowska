import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlnXusK74_ElBjg3QLvk-rckSKDzde7TU",
  authDomain: "board-game-shop-cc657.firebaseapp.com",
  projectId: "board-game-shop-cc657",
  storageBucket: "board-game-shop-cc657.firebasestorage.app",
  messagingSenderId: "224452891711",
  appId: "1:224452891711:web:c2289f790f0f12b4fa548a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();