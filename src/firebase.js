import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyAkyc6cheJ7Dx2DAc8gdqSTwxbRGQ_QNtg",
    authDomain: "messenger-clone-85d04.firebaseapp.com",
    projectId: "messenger-clone-85d04",
    storageBucket: "messenger-clone-85d04.appspot.com",
    messagingSenderId: "870408716167",
    appId: "1:870408716167:web:ddd763fc4a5d1969b55d22",
    measurementId: "G-EDV496E9HK"
});

const db = firebaseApp.firestore();

export default db;