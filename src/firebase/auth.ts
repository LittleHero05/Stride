import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export const observeUserAuth = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};