"use client";
import { authClient } from "@/src/lib/auth-client";
import { redirect } from "next/navigation";

import React from "react";

const Logout = () => {
  const handleLogout = async(e: any) => {
    // console.log("something happening");
    // e.preventDefault();

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect('/auth/signin');
        },
      },
    });
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
