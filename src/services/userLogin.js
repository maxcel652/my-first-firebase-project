import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../lib/firebase"

let currentUser = null;
export const Login = async (email, password) =>{
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    currentUser = userCredential;
    console.log(currentUser)
    return  currentUser;
}


export const Logout = async () =>{
    await signOut(auth)
    currentUser = null;
}

export const isLogin = ()=>{
    return  currentUser != null;
}