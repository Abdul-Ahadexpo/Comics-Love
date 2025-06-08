import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBm3lMeYP8YkcbDcZjGNZhydWl9XbYQpz4",
  authDomain: "all-in-one-website-49c28.firebaseapp.com",
  databaseURL: "https://all-in-one-website-49c28-default-rtdb.firebaseio.com",
  projectId: "all-in-one-website-49c28",
  storageBucket: "all-in-one-website-49c28.firebasestorage.app",
  messagingSenderId: "1082996858070",
  appId: "1:1082996858070:web:d0dcac6337930e4fb77d77"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);