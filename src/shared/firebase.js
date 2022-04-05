import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9Ei9uHx5_G0drxOewU8bHhvv1b81FFJc",
  authDomain: "image-community-b11cb.firebaseapp.com",
  projectId: "image-community-b11cb",
  storageBucket: "image-community-b11cb.appspot.com",
  messagingSenderId: "760542161324",
  appId: "1:760542161324:web:ea0d93b8db532fd7b5b209",
  measurementId: "G-TJGC41D4WD"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export{auth, apiKey, firestore, storage};