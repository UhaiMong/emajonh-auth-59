import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const UserContext = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        loading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const singUpWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    useEffect(() => {
        const unsubScribe =  onAuthStateChanged(auth, currentUser => {
            console.log("currentUser stat", currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return ()=> unsubScribe();
    },[])

    const authInfo = {user,createUser,signIn,logOut,loading,singUpWithGoogle};
    return (
        <AuthContext.Provider value={authInfo}>
            {children};
        </AuthContext.Provider>
    );
};

export default UserContext;