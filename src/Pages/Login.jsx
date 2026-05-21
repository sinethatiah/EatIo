import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"


const provider = new GoogleAuthProvider()

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const ref = doc(db, "users", user.uid)
    const snap = await getDoc(ref)

    if (snap.exists()) {
      navigate("/dashboard")
    } else {
      navigate("/onboarding")
    }
  } catch (err) {
    setError("Something went wrong. Please try again.")
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#fdfaf6" }}>
      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm" style={{ backgroundColor: "#fdfaf6" }}>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold" style={{ color: "#9e6b47" }}>eat.io</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back. Log in to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50"
            style={{ backgroundColor: "#9e6b47" }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:border-gray-400 flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="underline" style={{ color: "#9e6b47" }}>Sign up</Link>
        </p>

      </div>
    </div>
  )
}

export default Login