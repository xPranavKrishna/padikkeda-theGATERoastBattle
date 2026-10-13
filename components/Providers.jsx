"use client";
import { AuthProvider } from "@/context/AuthContext";
import Shell from "./Shell";
export default function Providers({ children }) { return <AuthProvider><Shell>{children}</Shell></AuthProvider>; }
