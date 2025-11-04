"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/src/lib/auth-client";
import { useAuth } from "@/src/context/AuthContext";

const Navbar = () => {
//   const [user, setUser] = useState<any>(null);
  const {user,setUser} = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await authClient.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        setUser(null);
        return;
      }
      setUser(data?.user || null);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setUser(null);
    window.location.href = "/auth/signin";
  };

  return (
    <nav className="flex justify-between p-4 shadow gap-4">
      <Link href="/">Home</Link>
      <div className="flex gap-4">
        {!user ? (
          <>
            <Link href="/auth/signin">Sign In</Link>
            <Link href="/auth/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
