import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../auth/firebase.config";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const userData = useAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //   const user = currentUser?.email || user?.email;
      //   const loggedUser = { email: user };
      setUser(currentUser);
      if (currentUser) {
        useAxiosBaseUrl
          .post("/authentication", { email: user?.email })
          .then((data) => {
            if (data.data) {
              localStorage.setItem("access-token", data?.data.token);
              //setloading (false)
            }
          });
      } else {
        localStorage.removeItem("acccess-token");
        //setloading (false)
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [user]);

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
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  const authInfo = {
    newUser,
    loading,
    user,
    signIn,
    logout,
    googleSingIn,
    userData,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
