import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient("mongodb+srv://vardannetweb_db_user:P3iTiI15xWZdJCt7@cluster0.r0xou7g.mongodb.net/betterAuth");
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: { 
    enabled: true, 
    // autoSignIn: false
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});





