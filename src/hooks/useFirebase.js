import initializeAuthentication from "../Pages/Login/Firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // auth and provider
  const auth = getAuth();

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
            history.replace("/");
          })
          .catch((error) => {});
      })
      .catch((error) => {
        const errorMessage = error.message;
      })
      .finally(() => setIsLoading(false));
  };

  return {
    handleEmailRegister,
  };
};

export default useFirebase;
