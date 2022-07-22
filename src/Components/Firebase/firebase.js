import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo6hj0pX5lgH5LYMEJImNr2DumiGlpOyw",
  authDomain: "crowdly-912ef.firebaseapp.com",
  projectId: "crowdly-912ef",
  storageBucket: "crowdly-912ef.appspot.com",
  messagingSenderId: "851222400496",
  appId: "1:851222400496:web:cfadca0cd60012c5516135"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
