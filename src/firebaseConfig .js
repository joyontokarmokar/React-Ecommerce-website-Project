import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDwdPWSsNBcyof_lnJmVXSWmxUM09gfXGo",
  authDomain: "react-ecommerce-project-4a2ab.firebaseapp.com",
  projectId: "react-ecommerce-project-4a2ab",
  storageBucket: "react-ecommerce-project-4a2ab.firebasestorage.app",
  messagingSenderId: "80441095064",
  appId: "1:80441095064:web:ded1c104fff85086d171ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig