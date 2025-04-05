// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrk52cbgDq6BDdrVj3cRkju6MBe0UOemc",
  authDomain: "ubuntu-mobility.firebaseapp.com",
  projectId: "ubuntu-mobility",
  storageBucket: "ubuntu-mobility.appspot.com",
  messagingSenderId: "196340367288",
  appId: "1:196340367288:android:3d15384ba04ee45d5f194d",
};

// ✅ Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
