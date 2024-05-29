import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL:
    "https://carrot-market-76774-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "gs://carrot-market-76774.appspot.com",
  apiKey: "AIzaSyAlLNlvEKXEdveugn-B8Snn72dinPMzBFE",
  authDomain: "carrot-market-76774.firebaseapp.com",
  projectId: "carrot-market-76774",
  messagingSenderId: "635040660058",
  appId: "1:635040660058:web:40fb193546e139a9ddf663",
  measurementId: "G-WFM8RN1RRG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
