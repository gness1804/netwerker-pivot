import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDGMS-cUaU-AnIOZpvC8THxGtqxUHzPh3s",
  authDomain: "netwerker-pivot.firebaseapp.com",
  databaseURL: "https://netwerker-pivot.firebaseio.com",
  storageBucket: "netwerker-pivot.appspot.com",
  messagingSenderId: "114872063042"
  };

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
