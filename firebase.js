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

/**
 * Returns the current timestamp
 * @returns the current timestamp
 */
export function getCurrentTimestamp() {
  return serverTimestamp();
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

/**
 * Returns a JSON object of all jobs matching the status
 *
 * @param {Number} status 0: initialized, 1: accepted and ready to pick-up, 2: deliverer booked, 4: picked-up, 5: delivered
 * @returns all delivery jobs with that status in an array of job objects
 */
export async function getJobs(status) {
  const q = query(collection(db, delivery_jobs), where("status", "==", status));

  const querySnapshot = await getDocs(q);
  const need_to_pick_up = [];
  querySnapshot.forEach((doc) => {
    need_to_pick_up.push({ id: doc.id, data: doc.data() });
  });
  need_to_pick_up.sort((a, b) => a.data.createdAt - b.data.createdAt);
  return need_to_pick_up;
}

/**
 * Updates the delivery status.
 *
 * @param {string} jobID
 * @param {Number} status
 * @param {Object} new_package New package that will be replacing the old package, in case of any changes. If none is defined, no changes to the old package will be made.
 */
export async function updateDeliveryStatus(jobID, status, new_package) {
  const package_data = new_package
    ? new_package
    : (await getJob(jobID)).data.package;

  await updateDeliveryJob(jobID, {
    package: package_data,
    status: status,
  });
}

/**
 * Adds a tip amount to the package
 * @param {string} jobID
 * @param {string | Number} tip
 * @returns a copy of the package with the set tip amount
 */
export async function addTip(jobID, tip) {
  const new_package = (await getJob(jobID)).data.package;
  new_package.tip = Number(tip);
  return new_package;
}

export async function updateDeliveryJob(jobID, updates) {
  const docRef = doc(db, delivery_jobs, jobID);
  updates[timestamp] = getCurrentTimestamp();
  await updateDoc(docRef, updates);
}
