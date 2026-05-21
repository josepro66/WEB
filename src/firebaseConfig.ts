import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYj5YoP4TMHfJZosVpmvAjpIgTaWPt9Fg",
  authDomain: "creart-tech.firebaseapp.com",
  projectId: "creart-tech",
  storageBucket: "creart-tech.firebasestorage.app",
  messagingSenderId: "207111471489",
  appId: "1:207111471489:web:11c5b14de017c599fb6880",
  measurementId: "G-YLVGS89EGT"
};

// Evita inicializar múltiples veces en hot-reload (desarrollo)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export default app;
