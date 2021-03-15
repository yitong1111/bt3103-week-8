import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCms1ltdFiYpPPhbXhEKSPLDEIXs_f-nfI",
    authDomain: "bt3103-week-6-30b17.firebaseapp.com",
    projectId: "bt3103-week-6-30b17",
    storageBucket: "bt3103-week-6-30b17.appspot.com",
    messagingSenderId: "730873569437",
    appId: "1:730873569437:web:d0f4ee7a4a0a7d133db474",
    measurementId: "G-BS3MB9MX54"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;