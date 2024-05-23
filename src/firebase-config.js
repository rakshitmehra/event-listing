import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

    const firebaseConfig = {
        apiKey: "AIzaSyBXT7cWHjJ9FWZggg0JU70N8eP7NNltupA",
        authDomain: "event-list--auth.firebaseapp.com",
        projectId: "event-list--auth",
        storageBucket: "event-list--auth.appspot.com",
        messagingSenderId: "245945071192",
        appId: "1:245945071192:web:c6ac8c36480a32e09dbc2d",
        measurementId: "G-EK3JZQR98J"
};
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const googleAuthProvider = new GoogleAuthProvider();
    const db = getFirestore(app);
    const storage = getStorage(app);

export { app, auth, googleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, db, storage, AuthErrorCodes, signInWithEmailAndPassword };