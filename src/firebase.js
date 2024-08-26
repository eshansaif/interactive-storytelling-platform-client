// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxipEPcVl-lxnG81MtI_Dq-YKOynbAiMQ",
  authDomain: "istp-a6343.firebaseapp.com",
  projectId: "istp-a6343",
  storageBucket: "istp-a6343.appspot.com",
  messagingSenderId: "432459789583",
  appId: "1:432459789583:web:8083fc5cde6fd7722b3a7a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
