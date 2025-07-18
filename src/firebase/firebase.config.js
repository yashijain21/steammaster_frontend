import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBM4wcip2AJTrGH5Qz5jJsOnE5_d7h4vBc",
  authDomain: "steammaster-9124c.firebaseapp.com",
  projectId: "steammaster-9124c",
  storageBucket: "steammaster-9124c.firebasestorage.app",
  messagingSenderId: "781344696710",
  appId: "1:781344696710:web:fb30b3db1d797689816407",
  measurementId: "G-5PZ8127MVF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;