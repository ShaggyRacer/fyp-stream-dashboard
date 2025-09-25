"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [displayName, setDisplayName] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("display_name")
          .eq("uid", user.uid)
          .single()

        if (data) {
          setDisplayName(data.display_name || user.email) // fallback to email
        }
      }
    }
    fetchProfile()
  }, [user])

  if (loading) return <p>Loading...</p>
  if (!user) {
    redirect("/login")
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">
        Welcome, {displayName || user?.email} 🎉
      </p>
    </main>
  )
}
