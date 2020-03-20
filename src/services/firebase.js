// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore"); 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCm4Yc5O8Y10qB9bOvNe5zm9D5ZMxxXto",
    authDomain: "teacherlistproject.firebaseapp.com",
    databaseURL: "https://teacherlistproject.firebaseio.com",
    projectId: "teacherlistproject",
    storageBucket: "teacherlistproject.appspot.com",
    messagingSenderId: "220911448699",
    appId: "1:220911448699:web:baeba5ad8d92e8c92de8de",
    measurementId: "G-MXKH1H9VSC"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  
// Get a reference to the database service
const db = firebase.firestore();

export {
    db
}
