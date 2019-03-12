import firebase from 'firebase';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBS5AmKll7cffnbPOI_d9nI2QvSpZ9GfYA",
    authDomain: "traveler-ebb5d.firebaseapp.com",
    databaseURL: "https://traveler-ebb5d.firebaseio.com",
    projectId: "traveler-ebb5d",
    storageBucket: "traveler-ebb5d.appspot.com",
    messagingSenderId: "961424118976"
  };
  
  const firebaseApp = firebase.initializeApp(config);

  export default firebaseApp.firestore()