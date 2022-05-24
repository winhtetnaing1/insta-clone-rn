// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBs5ixCsVT-R85EgZsuYRR2w3v2WPciWCU",
    authDomain: "rn-instagram-clone-17124.firebaseapp.com",
    projectId: "rn-instagram-clone-17124",
    storageBucket: "rn-instagram-clone-17124.appspot.com",
    messagingSenderId: "420662559750",
    appId: "1:420662559750:web:04bc551732e77a741d6f87"
};

// Initialize Firebase
initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()
const storage = getStorage()



export { db, auth, storage }

