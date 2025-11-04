import { auth } from "@/lib/auth"; // Better import path
import { toNextJsHandler } from "better-auth/next-js";
export const { POST, GET } = toNextJsHandler(auth); 

