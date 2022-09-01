import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import initializeAuthentication from "../Pages/Login/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  // auth and provider
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // google sign in
  const signInWithGoogle = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        // save user to database
        upsertUser(result?.user?.email, result?.user?.displayName);

        toast.success("Logged In Successfully");
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  //   register new user
  const handleEmailRegister = (name, email, password, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
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
      .finally(() => setIsLoading(false));
  };
  // email login
  const handleEmailLogin = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Logged In Successfully");
        const destination = location?.state?.from || "/";
        navigate(destination);
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        // id token
        getIdToken(user).then((idToken) => {
          localStorage.setItem("idToken", idToken);
        });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  // save user to database
  const saveUser = (email, displayName) => {
    const user = { email, displayName };
    axios
      .post("https://carx-suhag.onrender.com/users", user)
      .then((result) => {});
  };

  const upsertUser = (email, displayName) => {
    const user = { email, displayName };
    axios
      .put("https://carx-suhag.onrender.com/users", user)
      .then((result) => {});
  };

  // admin check
  useEffect(() => {
    // setIsLoading(true);
    axios({
      method: "get",
      url: `https://carx-suhag.onrender.com/users/${user?.email}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    }).then((result) => {
      setAdmin(result.data?.admin);
      // setIsLoading(false);
    });
    // const checkAdmin = async () => {

    //   const res = await fetch(
    //     `https://carx-suhag.onrender.com/users/${user?.email}`,
    //     {
    //       headers: {
    //         authorization: `Bearer ${localStorage.getItem("idToken")}`,
    //       },
    //     }
    //   );
    //   const data = await res.json();
    //   setAdmin(data.admin);
    //   setIsLoading(false);
    // };
    // checkAdmin();
  }, [user?.email]);
  return {
    handleEmailRegister,
    handleEmailLogin,
    user,
    isLoading,
    handlePasswordReset,
    signInWithGoogle,
    logOut,
    admin,
  };
};

export default useFirebase;
