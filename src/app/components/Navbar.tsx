"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig"

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const links = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <nav className="w-full bg-gray-900 text-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">🎥 StreamApp</h1>
        <ul className="flex gap-6 items-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${
                  pathname === link.href ? "text-yellow-400 font-semibold" : "hover:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  )
}
