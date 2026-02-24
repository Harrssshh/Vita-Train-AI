import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fitnessProfile, setFitnessProfileState] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "muscle gain",
  });

  // ✅ Firebase Auth Listener (MOST IMPORTANT)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const idToken = await currentUser.getIdToken(true);
        setToken(idToken);
      } else {
        setUser(null);
        setToken(null);
      }

      const savedProfile = localStorage.getItem("vita_fitness_profile");
      if (savedProfile) {
        setFitnessProfileState(JSON.parse(savedProfile));
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fitness Profile Save
  const updateFitnessProfile = (profile) => {
    setFitnessProfileState(profile);
    localStorage.setItem("vita_fitness_profile", JSON.stringify(profile));
  };

  // ✅ Signup
  const signup = async (email, password, name) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCred.user, {
      displayName: name,
    });

    const idToken = await userCred.user.getIdToken(true);

    setUser(userCred.user);
    setToken(idToken);

    return userCred.user;
  };

  // ✅ Login
  const login = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    const idToken = await userCred.user.getIdToken(true);

    setUser(userCred.user);
    setToken(idToken);

    return userCred.user;
  };

  // ✅ Google Login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const idToken = await result.user.getIdToken(true);

    setUser(result.user);
    setToken(idToken);

    return result.user;
  };

  // ✅ Logout
  const logout = async () => {
    await signOut(auth);

    setUser(null);
    setToken(null);

    setFitnessProfileState({
      age: "",
      weight: "",
      height: "",
      goal: "muscle gain",
    });

    localStorage.removeItem("vita_fitness_profile");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        googleLogin,
        logout,
        fitnessProfile,
        updateFitnessProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};