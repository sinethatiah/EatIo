import { auth } from "../../firebase"
import { signOut } from 'firebase/auth'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  const isRoot = location.pathname === "/dashboard"

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <div className="flex flex-col justify-between w-48 h-full border-r border-gray-100 px-6 py-8 shrink-0" style={{ backgroundColor: "#f2ebe0" }}>
        <div className="flex flex-col gap-1">
         <div className="mb-8 flex items-center gap-2">
  <div className="mb-8">
  <img 
  src="/src/assets/myLogo.png" 
  alt="eat.io" 
  className="w-16 h-16 rounded-xl mb-8"
  style={{ mixBlendMode: "multiply", backgroundColor: "#5c3318" }}
/>
</div>
  
</div>
          <NavLink
            to="home"
            className={({ isActive }) => `text-base py-1 ${isActive ? "font-medium" : "text-gray-400"}`}
            style={({ isActive }) => ({ color: isActive ? "#607a52" : "" })}
          >
            Home
          </NavLink>
          <NavLink
            to="nutritionGuide"
            className={({ isActive }) => `text-base py-1 ${isActive ? "font-medium" : "text-gray-400"}`}
            style={({ isActive }) => ({ color: isActive ? "#607a52" : "" })}
          >
            Guide
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) => `text-base py-1 ${isActive ? "font-medium" : "text-gray-400"}`}
            style={({ isActive }) => ({ color: isActive ? "#607a52" : "" })}
          >
            Profile
          </NavLink>
          <NavLink
            to="saved"
            className={({ isActive }) => `text-base py-1 ${isActive ? "font-medium" : "text-gray-400"}`}
            style={({ isActive }) => ({ color: isActive ? "#607a52" : "" })}
          >
            Saved
          </NavLink>
        </div>

        <button
          onClick={handleLogout}
          className="text-base text-gray-400 text-left"
          onMouseOver={e => e.target.style.color = "#9e6b47"}
          onMouseOut={e => e.target.style.color = ""}
        >
          Log out
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 px-8 py-8 overflow-y-auto">
        {isRoot ? (
          <div className="max-w-sm mt-12">
            <h2 className="text-2xl font-semibold mb-1">Welcome to eat.io.</h2>
            <p className="text-base text-gray-400 mb-10">
              Start exploring recipes tailored for you.
            </p>
            <button
              onClick={() => navigate("/dashboard/home")}
              className="px-6 py-2 rounded-lg text-base text-white"
              style={{ backgroundColor: "#9e6b47" }}
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