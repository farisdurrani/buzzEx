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
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

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

// General

// Login and Registration

/**
 * Logs in a user.
 *
 * @param {string} email
 * @param {string} password
 */
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Logged in with: ", user.email);
      return user;
    })
    .catch((error) => {
      alert(error.message);
    });
}

/**
 * Logs out the current user.
 */
export function logout_current_user() {
  const currentUser = getCurrentUser();
  signOut(auth)
    .then(() => {
      console.log(`Signed out of ${currentUser.email}`);
      return currentUser;
    })
    .catch((error) => {
      alert(error.message);
    });
}

export function register_new_user(email, password, user_data) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(`User ${userCredential.user.email} registered`);
      user_data.uid = userCredential.user.uid;
      (async () => {
        await addUser(user_data);
      })();
      console.log(`Data for user ${userCredential.user.email} registered`);
      return userCredential.user;
    })
    .catch((error) => {
      if (error.code == "auth/weak-password") {
        alert("The password is too weak.");
      } else if (error.code == "auth/email-already-in-use") {
        alert("The email is already in use.");
      } else {
        alert(error.message);
      }
    });
}

export async function getUser() {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

export function getCurrentUser() {
  const u = getAuth().currentUser;
  return u;
}

export async function addUser(data) {
  await setDoc(doc(db, "users", data.uid), data);
  return;
}

export async function removeUser(data) {
  await deleteDoc(doc(db, "users", data.id));
  return;
}

// Deliveries

export function generateGeolocation(lat, long) {
  return new GeoPoint(lat, long);
}

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
 * Adds a tip amount to the package and sets it to be ready to be picked up
 * @param {string} jobID
 * @param {string | Number} tip tip to add to the delivery job
 */
export async function setToReadyToPickup(jobID, tip) {
  const new_package = (await getJob(jobID)).data.package;
  new_package.tip = Number(tip);
  updateDeliveryStatus(jobID, 1, new_package);
}

/**
 * Updates the delivery job data document on Firestore
 *
 * @param {string} jobID ID of the Firestore document
 * @param {Object} updates an object containing all the intended modifications
 */
async function updateDeliveryJob(jobID, updates) {
  const docRef = doc(db, delivery_jobs, jobID);
  updates.timestamp = getCurrentTimestamp();
  await updateDoc(docRef, updates);
}
