import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpHzO79STW6etC3RP9NFaCaqTRBw_kd3A",
  authDomain: "crowdly-8456a.firebaseapp.com",
  projectId: "crowdly-8456a",
  storageBucket: "crowdly-8456a.appspot.com",
  messagingSenderId: "966369452676",
  appId: "1:966369452676:web:9e122ba60ffae69d0198d1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)