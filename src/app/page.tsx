export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">🎥 Streaming Dashboard</h1>
      <p className="mt-2">Welcome to your live streaming platform!</p>
      <div className="mt-4 flex gap-4">
        <a href="/login" className="text-blue-600 underline">
          Go to Login
        </a>
        <a href="/dashboard" className="text-green-600 underline">
          Go to Dashboard
        </a>
      </div>
    </main>
  )
}
