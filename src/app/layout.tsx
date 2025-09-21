import "./globals.css"
import Navbar from "@/app/components/Navbar"
import { AuthProvider } from "@/context/AuthContext"

export const metadata = {
  title: "Streaming Dashboard",
  description: "Live Streaming Platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <Navbar />
          <main className="p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
