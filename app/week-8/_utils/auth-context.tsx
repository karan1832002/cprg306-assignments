"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  gitHubSignIn: () => Promise<unknown>;
  firebaseSignOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseSignOut = async () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, gitHubSignIn, firebaseSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUserAuth must be used within AuthContextProvider");
  }

  return context;
}