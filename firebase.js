// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth} from 'firebase/auth'
import {getFirestore, collection, getDocs, setDoc, deleteDoc, doc} from 'firebase/firestore/lite';

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


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getUser() {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
}

export async function addUser(data) {
  await setDoc(doc(db, "users", data.id), data);
  return;
}

export async function removeUser(data) {
  await deleteDoc(doc(db, "users", data.id));
  return;
}

