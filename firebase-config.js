const firebaseConfig = {
  apiKey: "AIzaSyC6RyJehH4Tb89Q3BbThySjDfsQUE_94tM",
  authDomain: "crud-firestore-f3400.firebaseapp.com",
  databaseURL: "https://crud-firestore-f3400.firebaseio.com",
  projectId: "crud-firestore-f3400",
  storageBucket: "crud-firestore-f3400.appspot.com",
  messagingSenderId: "582601335148",
  appId: "1:582601335148:web:b51ca6206a754740229349",
  measurementId: "G-YBXPEQ91FB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
