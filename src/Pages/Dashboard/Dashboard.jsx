import { auth } from "../../firebase"
import { signOut } from 'firebase/auth'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import useTheme from "../../Hooks/UseTheme"

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { dark, toggle } = useTheme()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const isRoot = location.pathname === "/dashboard"

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">

      {/* Sidebar */}
      <div className="flex flex-col justify-between w-48 h-full border-r border-border px-6 py-8 shrink-0 bg-secondary">
        <div className="flex flex-col gap-1">

          <div className="mb-8 flex items-center gap-2">
           <img
      src="/public/myLogo.png"
      alt="eat.io"
      className="w-12 h-12 rounded-xl"
      style={{ backgroundColor: "#5c3318" }}
    />
            <span className="text-xl font-semibold text-brown">eat.io</span>
          </div>

          <NavLink
            to="home"
            className={({ isActive }) => `text-base py-1 transition-colors ${isActive ? "text-green font-medium" : "text-muted-foreground hover:text-brown"}`}
          >
            Home
          </NavLink>
          <NavLink
            to="nutritionGuide"
            className={({ isActive }) => `text-base py-1 transition-colors ${isActive ? "text-green font-medium" : "text-muted-foreground hover:text-brown"}`}
          >
            Guide
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) => `text-base py-1 transition-colors ${isActive ? "text-green font-medium" : "text-muted-foreground hover:text-brown"}`}
          >
            Profile
          </NavLink>
          <NavLink
            to="saved"
            className={({ isActive }) => `text-base py-1 transition-colors ${isActive ? "text-green font-medium" : "text-muted-foreground hover:text-brown"}`}
          >
            Saved
          </NavLink>
        </div>

        <div className="flex flex-col gap-3">
         <button
  onClick={toggle}
  className="text-base text-muted-foreground hover:text-brown text-left transition-colors flex items-center gap-2"
>
  <span className="material-symbols-outlined text-base">
    {dark ? "light_mode" : "dark_mode"}
  </span>
  {dark ? "Light mode" : "Dark mode"}
</button>

          <button
            onClick={handleLogout}
            className="text-base text-muted-foreground hover:text-brown text-left transition-colors"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-8 py-8 overflow-y-auto bg-background">
        {isRoot ? (
          <div className="max-w-sm mt-12">
            <h2 className="text-2xl font-semibold mb-1 text-foreground">Welcome to eat.io.</h2>
            <p className="text-base text-muted-foreground mb-10">
              Start exploring recipes tailored for you.
            </p>
            <button
              onClick={() => navigate("/dashboard/home")}
              className="px-6 py-2 rounded-lg text-base text-primary-foreground bg-brown hover:opacity-90 transition-opacity"
            >
              Get started →
            </button>
          </div>
        ) : (
          <Outlet />
        )}
      </div>

    </div>
  )
}

export default Dashboard