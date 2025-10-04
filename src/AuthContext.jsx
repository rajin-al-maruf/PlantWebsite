//Using this logic from AI for now.

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs once when app loads
  useEffect(() => {
    // 1. Get current session
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Get session error:", error);
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // 2. Listen for login/logout events
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // cleanup
    return () => subscription?.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
