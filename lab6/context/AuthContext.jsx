import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth, db} from '@/config/firebase'; // Обов'язково імпортуємо db
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut
} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore'; // Імпорти для Firestore

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthenticated(!!currentUser);
            setIsLoading(false);
        });
    }, []);

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const register = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, 'users', uid), {
            email: email,
            name: '',
            age: '',
            city: ''
        });
    };

    const logout = async () => {
        await firebaseSignOut(auth);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, isLoading, login, register, logout}}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);