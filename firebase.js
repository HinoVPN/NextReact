// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfSW8bKSTmbzzoPIrtJgjXVcyX0dnZ7uc",
  authDomain: "nextreact-8865d.firebaseapp.com",
  projectId: "nextreact-8865d",
  storageBucket: "nextreact-8865d.appspot.com",
  messagingSenderId: "192056244188",
  appId: "1:192056244188:web:370e9499a49fd320a24119",
  measurementId: "G-X8DG092BFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db