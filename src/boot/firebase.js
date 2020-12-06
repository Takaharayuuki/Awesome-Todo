import firebase from "firebase/app";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe9SxzOuIX51WYjX4TEpWlXzDAoMqsE10",
  authDomain: "awesome-todo-dc321.firebaseapp.com",
  databaseURL: "https://awesome-todo-dc321-default-rtdb.firebaseio.com",
  projectId: "awesome-todo-dc321",
  storageBucket: "awesome-todo-dc321.appspot.com",
  messagingSenderId: "572051597741",
  appId: "1:572051597741:web:7b472acae09535ee2b1924"
}

let firebaseApp = firebase.initializeApp(firebaseConfig);

let firebaseAuth = firebaseApp.auth()

export { firebaseAuth }
