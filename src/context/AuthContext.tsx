"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { supabase } from "@/lib/supabaseClient";
import { onAuthStateChanged } from "firebase/auth";

type AppUser = {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "broadcaster";
};

const AuthContext = createContext<{
  user: AppUser | null;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch role from Supabase
        const { data } = await supabase
          .from("users")
          .select("role, display_name")
          .eq("uid", firebaseUser.uid)
          .single();

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: data?.display_name || firebaseUser.displayName || "",
          role: data?.role || "broadcaster",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
