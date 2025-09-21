"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";  // ✅ App Router hook
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      router.push("/dashboard"); // redirect broadcasters
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must log in.</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.displayName} 🎉</p>
    </div>
  );
}
