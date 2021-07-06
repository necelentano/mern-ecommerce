import firebase from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBBkqKxvdXoJswWBLd6LG6qxuTBzTDwIZ4',
  authDomain: 'mern-ecommerce-e4a93.firebaseapp.com',
  projectId: 'mern-ecommerce-e4a93',
  storageBucket: 'mern-ecommerce-e4a93.appspot.com',
  messagingSenderId: '273072875762',
  appId: '1:273072875762:web:b93966e5217a0d9e2f486b',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
