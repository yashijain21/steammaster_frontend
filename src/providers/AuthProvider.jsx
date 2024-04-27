import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    GoogleAuthProvider,
    TwitterAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firebaseError, setFirebaseError] = useState("");

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const twitterLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, twitterProvider);
    };

    const facebookLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateInfo = (user, profile) => {
        setLoading(true);
        return updateProfile(user, profile);
    };

    const passwordReset = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("currentUser ", currentUser);
            setFirebaseError("");
            if (currentUser) {
                if (!currentUser.emailVerified) {
                    sendEmailVerification(currentUser)
                        .then(() => {
                            Swal.fire({
                                title: "Please verify Your Email",
                                text: `Check your ${currentUser.email} for a link to verify your email address.`,
                                imageUrl: "/images/email/mail.png",
                                imageWidth: 128,
                                imageHeight: 128,
                                imageAlt: "Email",
                            });
                            signOut(auth)
                                .then(() => {
                                    console.log("user not verified");
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                    setFirebaseError(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err.message);
                            setFirebaseError(err);
                        });
                } else {
                    setUser(currentUser);
                    setLoading(false);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return () => {
            unSubscribe();
        };
    }, [user]);

    const authInfo = {
        user,
        firebaseError,
        loading,
        googleLogin,
        twitterLogin,
        facebookLogin,
        createUser,
        signInWithPassword,
        updateInfo,
        logOut,
        passwordReset,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
