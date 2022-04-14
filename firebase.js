// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  GeoPoint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  where,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCENhv95HhwfHGIJ8b8LqdLvQ9fmoWcj4",
  authDomain: "buzzex-36e3e.firebaseapp.com",
  projectId: "buzzex-36e3e",
  storageBucket: "buzzex-36e3e.appspot.com",
  messagingSenderId: "929417952930",
  appId: "1:929417952930:web:6b2c5690687836ede461fb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const complete_jobs = "delivery_jobs";
const incomplete_jobs = "incomplete_jobs";

export async function getUser() {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

export function generateGeolocation(lat, long) {
  return new GeoPoint(lat, long);
}

export function getCurrentUser() {
  return getAuth().currentUser;
}

export async function addUser(data) {
  await setDoc(doc(db, "users", data.id), data);
  return;
}

export async function removeUser(data) {
  await deleteDoc(doc(db, "users", data.id));
  return;
}

// deliveries

export function getServerTimestamp() {
  return serverTimestamp();
}

export async function completeDeliveryJob(job) {
  const docRef = doc(db, incomplete_jobs, job.id);
  if (docRef.exists) {
    await getDoc(job);
    await deleteDoc(doc(db, incomplete_jobs, job.id));
    await setDoc(doc(db, complete_jobs, job.id), job);
  } else {
    throw new ReferenceError(`Deivery Job ${job.id} does not exist`);
  }
}

export async function getJob(job) {
  // TODO fix
  return await addDoc(collection(db, incomplete_jobs), job);
}

export async function addNewDeliveryJob(job) {
  return await addDoc(collection(db, incomplete_jobs), job);
}

export async function getAllCompleteJobs() {
  return (querySnapshot = await getDocs(collection(db, complete_jobs)));
}

export async function getIncompleteJobs() {
  // const q = query(
  //   collection(db, incomplete_jobs),
  //   where(
  //     "sender_uid",
  //     "!=",
  //     "CP5x%3unwf-WvTqAkL2FNVG*yd?Q4hZs_=aebmt>H@$JXE6MS7"
  //   )
  // );
  // let allIncompleteJobs = [];
  // onSnapshot(q, (querySnapshot) => {
  //   allIncompleteJobs = [];
  //   querySnapshot.forEach((doc) => {
  //     allIncompleteJobs.push({ id: doc.id, data: doc.data() });
  //   });
  //   // console.log(allIncompleteJobs);
  //   return allIncompleteJobs;
  // });

  const querySnapshot = await getDocs(collection(db, incomplete_jobs));
  const a = [];
  querySnapshot.forEach((doc) => {
    a.push({ id: doc.id, data: doc.data() });
  });
  return a;
}

export async function updateIncompleteDeliveryJob(jobID, updates) {
  const job = doc(db, incomplete_jobs, jobID);
  await updateDoc(job, updates);
}
