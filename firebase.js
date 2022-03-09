// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAk-14ElpptbF60KWv4tToNYoFUMMEOTw",
  authDomain: "buzzex-auth.firebaseapp.com",
  projectId: "buzzex-auth",
  storageBucket: "buzzex-auth.appspot.com",
  messagingSenderId: "209806511215",
  appId: "1:209806511215:web:148bcf55bfb2f5f556d19a"
};

// Initialize Firebase with the boilder plate config object
// if not already initialized 
// else use the already inititalized firebase app 
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}
const auth = firebase.auth()

export {auth};