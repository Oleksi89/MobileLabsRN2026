import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCG1Av-6F6Jb6gvdrq4HalcXWArRE_I3sk",
    authDomain: "lab6--rmd.firebaseapp.com",
    projectId: "lab6--rmd",
    storageBucket: "lab6--rmd.firebasestorage.app",
    messagingSenderId: "379188864902",
    appId: "1:379188864902:web:0b2f7012e6f673b11a2e07",
    measurementId: "G-QE4D4NMTG6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);