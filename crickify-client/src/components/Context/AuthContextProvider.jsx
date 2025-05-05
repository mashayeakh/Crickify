import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../Firebase/Firebase.init';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)

    //!create your user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //! login with the created user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //! authentication state observer and get user data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser => {
            if (currUser) {
                setUser(currUser);
                console.log("Curr User is signed in=> ", currUser);
            } else {
                setUser(null);
                console.log("User is signed out");
            }
        }))
        return () => unsubscribe();
    }, [])

    // !signout the logged in user
    const signingOut = () => {
        return signOut(auth)
            .then((res) => {
                // Sign-out successful.
                console.log(res);
                console.log("Sign out");
            }).catch((error) => {
                // An error happened.
                console.log("Error while signing out", error.message);

            });
    }


    const userInfo = {
        createUser,
        loginUser,
        signingOut,
        user,
        loading,

    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider