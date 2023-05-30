import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8daCPFiB6wK9yKAVok4XcZpSTuCaNKCo",
  authDomain: "rn-project-f86ca.firebaseapp.com",
  projectId: "rn-project-f86ca",
  storageBucket: "rn-project-f86ca.appspot.com",
  messagingSenderId: "410220850731",
  appId: "1:410220850731:web:573a769c9c8152dacc046e",
  measurementId: "G-DLTNY5DS8V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
