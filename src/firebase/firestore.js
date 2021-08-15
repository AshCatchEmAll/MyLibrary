import firebase from 'firebase'
import {config} from "../firebase/config"
const firebaseApp=firebase.initializeApp(config);

const db=firebase.firestore();


export default db;