import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log('session',session);   

  if(!session)
  {
    redirect('/auth/signin');
  }
  return <div>Welcome, {session.user.name}</div>;
};

export default Dashboard;
