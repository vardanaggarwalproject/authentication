"use client"
import { useAuth } from '@/src/context/AuthContext';
import { authClient } from '@/src/lib/auth-client';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const SignUp = () => {
  // const {user,setUser} = useAuth();
  const {refershUser} = useAuth();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleFormSubmit = async(e:any) => {
    e.preventDefault();
    const { data, error } = await authClient.signUp.email({
    name: name, 
    email: email, 
    password: password, 
    // callbackURL: "/dashboard",
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
            console.log(ctx);
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
            console.log(ctx.error.message);
            // setUser(null);
        },
  }
);
    console.log(data);
    // setUser(data);
  } 
  const handleGoogleSignUp = async(e:any) => {
    e.preventDefault();
    const data = await authClient.signIn.social({
    provider: "google",
  });
  // setUser(data);
  console.log(data);
  }

  return (
   <div className='flex items-center justify-center h-screen'>
    <form action="" onSubmit={handleFormSubmit} className='flex flex-col gap-4 p-4 mx-auto'>
      <input type="text" value={name} placeholder="enter name" onChange={(e) => {
        setName(e.target.value);
      }} className="border border-gray-600 p-2"/>
      <input type="text" value={email} placeholder="Your email" onChange={(e) => {
        setEmail(e.target.value);
      }} className="border border-gray-600 p-2"/>
      <input type="password" value={password} placeholder="Enter password" onChange={(e) => {
        setPassword(e.target.value);
      }} className="border border-gray-600 p-2"/>
      
      <button type="submit">SignUp</button>
      <h1>OR</h1>
      <button onClick={handleGoogleSignUp}>SignUp with Google</button>
    </form>
   </div>
  )
} 

export default SignUp;
