// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCENhv95HhwfHGIJ8b8LqdLvQ9fmoWcj4",
  authDomain: "buzzex-36e3e.firebaseapp.com",
  projectId: "buzzex-36e3e",
  storageBucket: "buzzex-36e3e.appspot.com",
  messagingSenderId: "929417952930",
  appId: "1:929417952930:web:6b2c5690687836ede461fb"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };