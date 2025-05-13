import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../Firebase/Firebase.init';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

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
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currUser => {
    //         if (currUser) {
    //             setUser(currUser);
    //             console.log("Curr User is signed in=> ", currUser);
    //         } else {
    //             setUser(null);
    //             console.log("User is signed out");
    //         }
    //     }))
    //     return () => unsubscribe();
    // }, [])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            setUser(currUser || null);
            setLoading(false); // ✅ set to false after Firebase response
            console.log("Current User:", currUser);
        });

        return () => unsubscribe();
    }, []);

    const signingOut = () => {
        return signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("User signed out successfully.");
                return true;  // Return true when sign out is successful
            })
            .catch((error) => {
                // An error occurred
                console.log("Error while signing out", error.message);
                return false;  // Return false if an error occurs
            });
    }

    const userInfo = {
        createUser,
        loginUser,
        signingOut,
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider