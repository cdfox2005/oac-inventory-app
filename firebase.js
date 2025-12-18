// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC-0-0ntFU7-VDXaqnLGCG_iYxaVg2T1-0",
  authDomain: "oac-inventory-app.firebaseapp.com",
  projectId: "oac-inventory-app",
  storageBucket: "oac-inventory-app.firebasestorage.app",
  messagingSenderId: "353803122216",
  appId: "1:353803122216:web:a29c63afb60fcd15b2271d",
  measurementId: "G-Q3VC2M1B4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };