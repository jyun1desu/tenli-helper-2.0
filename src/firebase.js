import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBM7Ngt-fF9GDPL6B5wYwKKjWWeOMNpx38",
  authDomain: "tlhelper2.firebaseapp.com",
  projectId: "tlhelper2",
  storageBucket: "tlhelper2.firebasestorage.app",
  messagingSenderId: "900512035304",
  appId: "1:900512035304:web:b13d62720041c0c9f7f45d",
  measurementId: "G-ZSQTTF9MK1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
