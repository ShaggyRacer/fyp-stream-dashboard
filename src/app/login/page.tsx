"use client";

import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { supabase } from "../../lib/supabaseClient"; // ✅ import supabase
import { useRouter } from "next/navigation"; // ✅ App Router navigation

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

const redirectUser = async (uid: string, email: string, displayName: string | null) => {
  // Try to fetch user
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("uid", uid)
    .single();

  if (error && error.code === "PGRST116") {
    // No record found → insert new user
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          uid,
          email,
          display_name: displayName || "",
          role: "broadcaster",            // default role
          subscription_status: "inactive" // default subscription state
        },
      ])
      .select("role")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError.message);
      setError("Failed to create new user");
      return;
    }

    // Redirect new user
    router.push("/dashboard");
    return;
  }

  if (error) {
    console.error("Supabase fetch error:", error.message);
    setError("Failed to fetch user role");
    return;
  }

  // Existing user → redirect based on role
  if (data?.role === "admin") {
    router.push("/admin");
  } else {
    router.push("/dashboard");
  }
};


// Google Login
const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await redirectUser(result.user.uid, result.user.email!, result.user.displayName);
  } catch (err: any) {
    setError(err.message);
  }
};

// Email/Password Login
const handleEmailLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await redirectUser(result.user.uid, result.user.email!, result.user.displayName);
  } catch (err: any) {
    setError(err.message);
  }
};

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleEmailLogin} className="flex flex-col gap-2 w-64">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login with Email
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="bg-red-500 text-white p-2 rounded mt-4"
      >
        Login with Google
      </button>
    </main>
  );
}
