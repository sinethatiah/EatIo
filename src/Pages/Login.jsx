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
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md border border-border rounded-xl p-8 shadow-sm bg-card">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-brown">eat.io</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back. Log in to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-border rounded-lg px-3 py-2 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-border rounded-lg px-3 py-2 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-sm font-medium text-primary-foreground bg-brown hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-border rounded-lg py-2 text-sm text-muted-foreground hover:border-brown hover:text-brown transition-colors flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
          Continue with Google
        </button>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="underline text-brown">Sign up</Link>
        </p>

      </div>
    </div>
  )
}

export default Login