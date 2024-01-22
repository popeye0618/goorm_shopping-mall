import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCi7PX61Py8F4oUBCsQsyvc9qJDdJoOVzc",
  authDomain: "shopping-mall-38c49.firebaseapp.com",
  projectId: "shopping-mall-38c49",
  storageBucket: "shopping-mall-38c49.appspot.com",
  messagingSenderId: "85929746106",
  appId: "1:85929746106:web:6dda5e9428e8791f332c83",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
