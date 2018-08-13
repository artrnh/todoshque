import * as firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDYANxnbXx0oFERTasO_FXmOKmL7cBB8TM',
  authDomain: 'todoshque.firebaseapp.com',
  databaseURL: 'https://todoshque.firebaseio.com',
  projectId: 'todoshque',
  storageBucket: 'todoshque.appspot.com',
  messagingSenderId: '875963200457',
};

export default firebase.initializeApp(config);
