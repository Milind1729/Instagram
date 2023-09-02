import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config ={apiKey: "AIzaSyABjkKqi2xj4yiFFKLAX4OIPFqjfMQsyM8",
authDomain: "instagram-d1e43.firebaseapp.com",
projectId: "instagram-d1e43",
storageBucket: "instagram-d1e43.appspot.com",
messagingSenderId: "167663880555",
appId: "1:167663880555:web:ed57027e53e0c8acba642e"};

const firebase =Firebase.initializeApp(config);
const {FieldValue}=Firebase.firestore;



console.log ("firebase",firebase);
export {firebase,FieldValue}