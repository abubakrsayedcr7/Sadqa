import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEFRbjcq276sl2DrupUAfyX1z98NoA4RI",
  authDomain: "donate-islam.firebaseapp.com",
  projectId: "donate-islam",
  storageBucket: "donate-islam.firebasestorage.app",
  messagingSenderId: "776137769368",
  appId: "1:776137769368:web:5aeef090de5d4dd0092bed",
  measurementId: "G-JZQ0J54N6Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);