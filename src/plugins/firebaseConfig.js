import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDUL4nWhvBkxuXUhYdRrzs1UDj8PZRZPb0",
  authDomain: "assignment2-ideen.firebaseapp.com",
  // databaseURL: "https://assignment2-ideen-default-rtdb.firebaseio.com",
  projectId: "assignment2-ideen",
  storageBucket: "assignment2-ideen.appspot.com",
  messagingSenderId: "243741490153",
  appId: "1:243741490153:web:7c89e4de2e91568913e978",
  measurementId: "G-WMQMQTKYJL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore;