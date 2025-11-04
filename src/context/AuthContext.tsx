"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { authClient } from "@/src/lib/auth-client";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const loadUser = async () => {
    const { data, error } = await authClient.getSession();
    setUser(data?.user || null);
  };

  useEffect(() => {
    loadUser();
  },[]);

  return (      
    <AuthContext.Provider value={{ user, setUser,refershUser: loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
