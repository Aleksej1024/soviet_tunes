import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDAT32tS2mFvUII7CLPWqQ5GyKttjv9WRA",
    authDomain: "soviet-tunes.firebaseapp.com",
    projectId: "soviet-tunes",
    storageBucket: "soviet-tunes.appspot.com",
    messagingSenderId: "292500037377",
    appId: "1:292500037377:web:cb1813bd61d46576b70500"
});

const db = firebaseApp.firestore();
export default db;