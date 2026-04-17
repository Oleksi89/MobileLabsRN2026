import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth, db} from '@/config/firebase';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser
} from 'firebase/auth';
import {doc, setDoc, deleteDoc} from 'firebase/firestore';

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

    // Client-side access validation
    const validateAccess = (targetUid) => {
        if (!user || user.uid !== targetUid) {
            throw new Error("Відмовлено в доступі. Ви маєте право працювати лише з власним документом.");
        }
    };

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

    const resetPassword = async (email) => {
        if (!user) throw new Error("Користувач не авторизований");

        validateAccess(user.uid);

        await sendPasswordResetEmail(auth, email);
    };

    const updateUserProfile = async (uid, data) => {
        validateAccess(uid);
        const docRef = doc(db, 'users', uid);
        await setDoc(docRef, data, {merge: true});
    };

    const deleteAccount = async (password) => {
        if (!user) throw new Error("Користувач не авторизований");

        validateAccess(user.uid);

        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

        await deleteDoc(doc(db, 'users', user.uid));
        await deleteUser(user);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated, user, isLoading,
            login, register, logout, resetPassword,
            deleteAccount, validateAccess,
            updateUserProfile
        }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);