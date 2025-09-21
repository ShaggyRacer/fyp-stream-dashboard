import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCujgYf0PZkwh1i7qjO-n4zu5yngt2HN8A",
  authDomain: "fyp-stream-dashboard.firebaseapp.com",
  projectId: "fyp-stream-dashboard",
  storageBucket: "fyp-stream-dashboard.firebasestorage.app",
  messagingSenderId: "838573504155",
  appId: "1:838573504155:web:754c20698b77143d1c383e",
  measurementId: "G-XXKZCKV3EJ"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
