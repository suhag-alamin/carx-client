import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import initializeAuthentication from "../Pages/Login/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // auth and provider
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // google sign in
  const signInWithGoogle = (location, history) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        toast.success("Logged In Successfully");
        const destination = location?.state?.from || "/";
        history.replace(destination);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  //   register new user
  const handleEmailRegister = (name, email, password, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            toast.success("Registered Successfully");
            history.replace("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  // email login
  const handleEmailLogin = (email, password, location, history) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Logged In Successfully");
        const destination = location?.state?.from || "/";
        history.replace(destination);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  // password reset
  const handlePasswordReset = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Password reset email sent");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  // log out
  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);

  return {
    handleEmailRegister,
    handleEmailLogin,
    user,
    isLoading,
    handlePasswordReset,
    signInWithGoogle,
    logOut,
  };
};

export default useFirebase;
