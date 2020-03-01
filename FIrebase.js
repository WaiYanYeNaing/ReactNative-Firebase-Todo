import * as firebase from "firebase";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyAU3H2Pdon8afgYHSthoRGhfWSO_3KZ5SM",
  authDomain: "fir-reactnative-todo.firebaseapp.com",
  databaseURL: "https://fir-reactnative-todo.firebaseio.com",
  projectId: "fir-reactnative-todo",
  storageBucket: "fir-reactnative-todo.appspot.com",
  messagingSenderId: "861476344211",
  appId: "1:861476344211:web:6ed40cc7c737e212735866",
  measurementId: "G-JN5L6P883Q"
};
firebase.initializeApp(config);

export default firebase;
