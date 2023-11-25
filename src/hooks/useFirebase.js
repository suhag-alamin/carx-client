import initializeAuthentication from "@/config/firebase.init";
import {
  removeUser,
  setAdmin,
  setUser,
  toggleLoading,
} from "@/redux/features/auth/authSlice";
import axios from "axios";
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
  // const [initialUser, setInitialUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [admin, setAdmin] = useState(false);

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
        // setInitialUser(result.user);

        // save user to database
        upsertUser(result?.user?.email, result?.user?.displayName);

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
        // setInitialUser(result.user);
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
        // setInitialUser(result.user);
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
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // observe user
  // useEffect(() => {
  //   dispatch(toggleLoading(true));
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setInitialUser(user);
  //       dispatch(
  //         setUser({
  //           email: user.email,
  //           displayName: user.displayName,
  //           photoURL: user.photoURL,
  //           uid: user.uid,
  //         })
  //       );

  //       // id token
  //       getIdToken(user).then((idToken) => {
  //         localStorage.setItem("idToken", idToken);
  //       });

  //       dispatch(toggleLoading(false));
  //     } else {
  //       dispatch(removeUser());
  //       dispatch(toggleLoading(false));
  //       setInitialUser({});
  //     }
  //   });
  // }, [auth]);
  // observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(toggleLoading(true)); // Start loading
        // setInitialUser(user);
        dispatch(
          setUser({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          })
        );

        // id token
        getIdToken(user).then((idToken) => {
          localStorage.setItem("idToken", idToken);
        });

        // admin check
        try {
          const result = await axios({
            method: "get",
            url: `https://carx-suhag.onrender.com/users/${user.email}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          });
          // setAdmin(result.data?.admin);
          dispatch(setAdmin(result.data?.admin));
        } catch (error) {
          toast.error(error?.message || "Something went wrong");
        }
      } else {
        dispatch(removeUser());
        // setInitialUser({});
      }
      dispatch(toggleLoading(false)); // End loading
    });

    return () => unsubscribe();
  }, [auth]);

  // save user to database
  const saveUser = (email, displayName) => {
    const user = { email, displayName };
    axios.post("https://carx-suhag.onrender.com/users", user).then(() => {});
  };

  const upsertUser = (email, displayName) => {
    const user = { email, displayName };
    axios.put("https://carx-suhag.onrender.com/users", user).then(() => {});
  };

  // admin check
  // useEffect(() => {
  //   // setIsLoading(true);
  //   axios({
  //     method: "get",
  //     url: `https://carx-suhag.onrender.com/users/${initialUser?.email}`,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("idToken")}`,
  //     },
  //   }).then((result) => {
  //     setAdmin(result.data?.admin);
  //     // dispatch(setAdmin(result.data?.admin));
  //     // setIsLoading(false);
  //   });
  //   // const checkAdmin = async () => {

  //   //   const res = await fetch(
  //   //     `https://carx-suhag.onrender.com/users/${user?.email}`,
  //   //     {
  //   //       headers: {
  //   //         authorization: `Bearer ${localStorage.getItem("idToken")}`,
  //   //       },
  //   //     }
  //   //   );
  //   //   const data = await res.json();
  //   //   setAdmin(data.admin);
  //   //   setIsLoading(false);
  //   // };
  //   // checkAdmin();
  // }, [initialUser?.email]);

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
