import firebase from 'firebase';
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6tCDHZGO7UrXFwvvGtKMamHr8qqUc-s8",
    authDomain: "studious-karma-236611.firebaseapp.com",
    databaseURL: "https://studious-karma-236611.firebaseio.com",
    projectId: "studious-karma-236611",
    storageBucket: "studious-karma-236611.appspot.com",
    messagingSenderId: "931520479732"
  };
  firebase.initializeApp(config);

const db = firebase.firestore()
export default db;