"use client";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
// import { useAuth } from "@/src/context/AuthContext";
// import { authClient } from "@/src/lib/auth-client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingInPage = () => {

  const {refershUser} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { 
  //       data: session, 
  //       isPending, //loading state
  //       error, //error object
  //       refetch //refetch the session
  //   } = authClient.useSession() 

  //   useEffect(() => {
  //     if(session)
  //         redirect("/dashboard");
  //   },[session])

    

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email(
      {
        email: email,
        password: password,

        // callbackURL: "/dashboard",

        // rememberMe: true,
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("inside loading stage");
        },
        onSuccess: async(ctx) => {
          //redirect to the dashboard or sign in page
          await refershUser();
          redirect("/dashboard");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
          console.log(ctx.error.message);
        },
      }
    );
    console.log("data",data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        action=""
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 p-4 mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="enter email"
          className="border border-gray-600 p-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="enter password"
          className="border border-gray-600 p-2"
        />

        <button type="submit">SignIn</button>
      </form>
    </div>
  );
};

export default SingInPage;
