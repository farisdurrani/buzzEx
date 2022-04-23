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
import * as Location from "expo-location";

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
const auth = getAuth(app);
const db = getFirestore(app);

const delivery_jobs = "delivery_jobs";
const users = "users";

// General
async function _getAllCollectionDocuments(collectionOfDocs) {
  const querySnapshot = await getDocs(collection(db, collectionOfDocs));
  const collectionArray = [];
  querySnapshot.forEach((doc) => {
    collectionArray.push({ id: doc.id, data: doc.data() });
  });
  return collectionArray;
}

async function _getCollectionDocument(collection, docID) {
  const docRef = doc(db, collection, docID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists) {
    return { id: docSnap.id, data: docSnap.data() };
  } else {
    console.log(`Collection ${collection} document ${jobID} does not exist`);
    return null;
  }
}

// Login and Registration

/**
 * Logs in a user.
 *
 * @param {string} email
 * @param {string} password
 */
export function login(email, password) {
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
        await _addUser(user_data);
      })();
      console.log(`Data for user ${userCredential.user.email} registered`);
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

export async function getAllUsers() {
  return await _getAllCollectionDocuments(users);
}

export function getCurrentUser() {
  return getAuth().currentUser;
}

async function _addUser(data) {
  await setDoc(doc(db, users, data.uid), data);
  return;
}

export async function removeUser(data) {
  await deleteDoc(doc(db, users, data.id));
  return;
}

export async function getUserDetails(uid) {
  return await _getCollectionDocument(users, uid);
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
  const time = serverTimestamp();
  return time;
}

export async function getJob(jobID) {
  return await _getCollectionDocument(delivery_jobs, jobID);
}

export async function addNewDeliveryJob(jobData) {
  const docSnap = await addDoc(collection(db, delivery_jobs), jobData);
  return docSnap.id;
}

/**
 * Returns an array of JSON objects of all jobs matching the status
 *
 * @param {Number}
 * status
 * 0: initialized,
 * 1: accepted and ready to pick-up,
 * 2: deliverer booked,
 * 3: picked-up,
 * 4: delivered
 * @param {Array} add_queries additional queries
 * @returns all delivery jobs with that status in an array of job objects
 */
export async function getJobs(status, add_queries = []) {
  let q = null;
  switch (add_queries.length) {
    case 1: {
      q = query(
        collection(db, delivery_jobs),
        where("status", "==", status),
        where(add_queries[0][0], add_queries[0][1], add_queries[0][2])
      );
      break;
    }
    case 2: {
      q = query(
        collection(db, delivery_jobs),
        where("status", "==", status),
        where(add_queries[0][0], add_queries[0][1], add_queries[0][2]),
        where(add_queries[1][0], add_queries[1][1], add_queries[1][2])
      );
      break;
    }
    case 3: {
      q = query(
        collection(db, delivery_jobs),
        where("status", "==", status),
        where(add_queries[0][0], add_queries[0][1], add_queries[0][2]),
        where(add_queries[1][0], add_queries[1][1], add_queries[1][2]),
        where(add_queries[2][0], add_queries[2][1], add_queries[2][2])
      );
      break;
    }
    default: {
      q = query(collection(db, delivery_jobs), where("status", "==", status));
      break;
    }
  }

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
 * @param {Object} other_changes A JS object containing all changes to the document fields, e.g., new deliverer_uid and source_destination, if any. If none is defined, no changes to the old package will be made.
 * @param {Object} new_geoLocation new location to be updated in deliverer_location
 */
export async function updateDeliveryStatus(
  jobID,
  status,
  other_changes = {},
  new_geoPoint = null
) {
  if (status >= 2 && !new_geoPoint) {
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (!foreground.granted) {
      alert("Permissions not given");
      return;
    }

    await getCurrentLocation().then(async (loc) => {
      await _updateDeliveryJob(jobID, {
        ...other_changes,
        status: status,
        deliverer_location: loc,
      });
    });
    return;
  }
  await _updateDeliveryJob(jobID, {
    ...other_changes,
    status: status,
    deliverer_location: new_geoPoint,
  });
}

/**
 * Updates the delivery job data document on Firestore
 *
 * @param {string} jobID ID of the Firestore document
 * @param {Object} updates an object containing all the intended modifications
 */
async function _updateDeliveryJob(jobID, updates) {
  const docRef = doc(db, delivery_jobs, jobID);
  updates.timestamp = getCurrentTimestamp();
  await updateDoc(docRef, updates);
}

/**
 *
 * @returns a random GeoPoint coordinate between [-90, -90] and [90, 90]
 */
export function getRandomCoord() {
  const min = -90,
    max = 90;
  const lat = Math.random() * (max - min) + min;
  const long = Math.random() * (max - min) + min;
  return generateGeolocation(lat, long);
}

/**
 * Full location Object {
  "coords": Object {
    "accuracy": 6.6973393244065,
    "altitude": 278.69948411826044,
    "altitudeAccuracy": 1.9028470109609013,
    "heading": -1,
    "latitude": 33.78632529004801,
    "longitude": -84.40599885580073,
    "speed": 0,
  },
  "timestamp": 1650731077001.6946,
}
 * @returns current location of user in a GeoPoint format
 */
export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access location was denied");
    return;
  }
  const location = await Location.getCurrentPositionAsync({}).then((e) => {
    return generateGeolocation(e.coords.latitude, e.coords.longitude);
  });
  return location;
};

/**
 * Creates a listener for real-time changes to the doc in the collection, updating the passed in react state in every change
 * @param {string} collec collection
 * @param {string} jobID ID of collection document
 * @param {function} setItemState setState for a react state
 * @returns an ubsubscribe function to call when wanting to detach the listener
 */
function _unsub(collec, jobID, setItemState) {
  return onSnapshot(doc(db, collec, jobID), (doc) => {
    setItemState({ id: doc.id, data: doc.data() });
  });
}

/**
 * Creates a listener for real-time changes to the packageItem, updating the passed in react state in every change
 * @param {string} jobID ID of the packageItem
 * @param {function} setPackageItemState react state to set the packageItem state
 * @returns an ubsubscribe function to call when wanting to detach the listener
 */
export function unsubscribeDeliveryJob(jobID, setPackageItemState) {
  return _unsub(delivery_jobs, jobID, setPackageItemState);
}
