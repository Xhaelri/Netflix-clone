import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyABFz2hijLJKuprDlUzO7IwEqn5Dl8mRvY",
  authDomain: "netflix-clone-fe27d.firebaseapp.com",
  projectId: "netflix-clone-fe27d",
  storageBucket: "netflix-clone-fe27d.firebasestorage.app",
  messagingSenderId: "248993235940",
  appId: "1:248993235940:web:2f3cca6db5af481a013df1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logOut = () => {
  signOut(auth);
};

export { auth, db, login, signup, logOut };
