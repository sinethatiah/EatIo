import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

const provider = new GoogleAuthProvider()

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirm) {
      return setError("Passwords do not match.")
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.")
    }

    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/onboarding")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
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
          <p className="text-muted-foreground text-sm mt-1">Create an account to get started.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

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

          <div className="flex flex-col gap-1">
            <label htmlFor="confirm" className="text-sm font-medium text-foreground">Confirm password</label>
            <input
              id="confirm"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            {loading ? "Creating account..." : "Sign up"}
          </button>

        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full border border-border rounded-lg py-2 text-sm text-muted-foreground hover:border-brown hover:text-brown transition-colors flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
          Continue with Google
        </button>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline text-brown">Log in</Link>
        </p>

      </div>
    </div>
  )
}

export default Signup