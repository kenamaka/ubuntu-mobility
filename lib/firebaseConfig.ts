import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrk52cbgDq6BDdrVj3cRkju6MBe0UOemc",
  authDomain: "ubuntu-mobility.firebaseapp.com",
  projectId: "ubuntu-mobility",
  storageBucket: "ubuntu-mobility.firebasestorage.app",
  messagingSenderId: "196340367288",
  appId: "1:196340367288:web:a92d04746229ddc15f194d",
  measurementId: "G-FH8781TTRY",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebaseConfig };
export { firebase };
