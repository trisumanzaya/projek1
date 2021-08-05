import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth'
import '@react-native-firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDB9YEIUhVO3SOWq1A4yo49KYFeBmU-oI4",
    authDomain: "weker-af007.firebaseapp.com",
    projectId: "weker-af007",
    storageBucket: "weker-af007.appspot.com",
    messagingSenderId: "956760212274",
    appId: "1:956760212274:web:1fd97721e8cff47ef60d2b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const database = firebase.database();

  export default firebase;