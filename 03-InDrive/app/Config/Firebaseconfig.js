
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDrCMo1hmlxQdaF-PA3u1vTjghYl2MFAuA",
  authDomain: "indrive-clone-ee8d5.firebaseapp.com",
  projectId: "indrive-clone-ee8d5",
  storageBucket: "indrive-clone-ee8d5.firebasestorage.app",
  messagingSenderId: "1055183268953",
  appId: "1:1055183268953:web:7c4c331d0af882358c5548",
  measurementId: "G-ME962SG14B"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

