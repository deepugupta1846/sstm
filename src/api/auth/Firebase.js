import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

let firebaseConfig = {
  apiKey: "AIzaSyDGl_MDpgK3dfJd28Xz4uRg5676haxTUto",
  authDomain: "sstm-9d0d8.firebaseapp.com",
  projectId: "sstm-9d0d8",
  storageBucket: "sstm-9d0d8.appspot.com",
  messagingSenderId: "739960587190",
  appId: "1:739960587190:web:cdfbe0dca19da36a56f717",
  measurementId: "G-07VEB14MW0",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireStore = getFirestore(app); //firebaseApp.firestore();
const messagingConfig = ""; //getMessaging(app);//firebaseApp.messaging();

export { fireStore, messagingConfig, analytics };
