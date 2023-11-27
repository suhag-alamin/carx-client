import { baseAPI } from "@/config/baseApi";
import initializeAuthentication from "@/config/firebase.init";
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import {
  removeUser,
  setAdmin,
  setUser,
  toggleLoading,
} from "@/redux/features/auth/authSlice";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

initializeAuthentication();

const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  // auth and provider
  const auth = useMemo(() => {
    return getAuth();
  }, []);
  const googleProvider = new GoogleAuthProvider();

  // google sign in
  const signInWithGoogle = (location, navigate) => {
    setIsLoading(true);

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // save user to database
        saveUser(result?.user?.email, result?.user?.displayName);

        toast.success("Logged In Successfully");
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //   register new user
  const handleEmailRegister = (name, email, password, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // save user to database
        saveUser(email, name);

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            toast.success("Registered Successfully");
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // email login
  const handleEmailLogin = (email, password, location, navigate) => {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Logged In Successfully");
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      .then(() => {})
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(toggleLoading(true));

        try {
          const result = await axiosInstance({
            url: `${baseAPI}/users/${user.email}`,
            method: "get",
          });
          if (result?.data) {
            dispatch(setUser(result?.data?.data));
            if (result?.data?.data?.role === "admin") {
              dispatch(setAdmin(true));
            } else {
              dispatch(setAdmin(false));
            }
          }
        } catch (error) {
          toast.error(error?.message);
        }

        // id token
        getIdToken(user).then((idToken) => {
          localStorage.setItem("idToken", idToken);
        });
      } else {
        dispatch(removeUser());
      }
      dispatch(toggleLoading(false));
    });

    return () => unsubscribe();
  }, [auth]);

  // save user to database
  const saveUser = (email, displayName) => {
    const user = { email, displayName };
    axiosInstance.post(`${baseAPI}/users`, user).then(() => {});
  };

  return {
    handleEmailRegister,
    handleEmailLogin,
    isLoading,
    handlePasswordReset,
    signInWithGoogle,
    logOut,
  };
};

export default useFirebase;
