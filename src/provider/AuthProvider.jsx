import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../auth/firebase.config";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  // const userData = useAuth();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axios
          .post("http://localhost:5000/authentication", { email: user?.email })
          .then((data) => {
            if (data.data) {
              localStorage.setItem("access-token", data?.data.token);
              setLoading(false);
            }
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await useAxiosBaseUrl.get(`/user`, {
        params: { email: user?.email },
      });
      setUserDetails(res.data);
      setLoading(false);
    };

    if (user?.email) {
      fetchData();
      setLoading(false);
    }
  }, [user, loading]);

  // create user
  const newUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign-in
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //sign-out
  const logout = () => {
    return signOut(auth);
  };

  // google sign in
  const googleSingIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //google sign-in 2

  // const handleGoogleSignIn = () => {
  //   setLoading(true);
  //   const provider = new GoogleAuthProvider();
  //   signInWithRedirect(auth, provider);
  // };
  const authInfo = {
    newUser,
    loading,
    user,
    signIn,
    logout,
    googleSingIn,

    setLoading,
    userDetails,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
