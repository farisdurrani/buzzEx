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
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
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

const delivery_jobs = "delivery_jobs";

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

export function getCurrentTimestamp() {
  return serverTimestamp();
}

export async function completeDeliveryJob(jobID) {
  updateDeliveryJob(jobID, { complete: true });
}

export async function getJob(jobID) {
  const docRef = doc(db, delivery_jobs, jobID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists) {
    return { id: docSnap.id, data: docSnap.data() };
  } else {
    throw new ReferenceError(`Deivery Job ${jobID} does not exist`);
  }
}

export async function addNewDeliveryJob(jobData) {
  const docSnap = await addDoc(collection(db, delivery_jobs), jobData);
  return docSnap.id;
}

export async function getUnstartedJobs() {
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

  const q = query(
    collection(db, delivery_jobs),
    where("picked_up", "==", false),
    where("ready_to_pickup", "==", false)
  );

  const querySnapshot = await getDocs(q);
  const need_to_pick_up = [];
  querySnapshot.forEach((doc) => {
    need_to_pick_up.push({ id: doc.id, data: doc.data() });
  });
  need_to_pick_up.sort((a, b) => a.data.createdAt - b.data.createdAt);
  return need_to_pick_up;
}

export async function setReadyToPickup(jobID, tip) {
  const docRef = doc(db, delivery_jobs, jobID);
  const package_info = (await getJob(jobID)).data.package;
  package_info.tip = Number(tip);

  await updateDeliveryJob(jobID, {
    package: package_info,
    ready_to_pickup: true,
  });
}

export async function updateDeliveryJob(jobID, updates) {
  const docRef = doc(db, delivery_jobs, jobID);
  updates[timestamp] = getCurrentTimestamp();
  await updateDoc(docRef, updates);
}
