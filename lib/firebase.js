import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCqaRl8nsYn8BdKwBjZenuS5ExlIxjzL5U',
  authDomain: 'netwerker-3d622.firebaseapp.com',
  databaseURL: 'https://netwerker-3d622.firebaseio.com',
  storageBucket: 'netwerker-3d622.appspot.com',
  messagingSenderId: '928047933429',
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
