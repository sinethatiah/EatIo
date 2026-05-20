import { auth } from "../../firebase"
import { signOut } from 'firebase/auth'
import {  NavLink,Link, Outlet, useNavigate, useLocation } from 'react-router-dom'

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
      <div className="flex flex-col justify-between w-48 h-full border-r border-gray-100 px-6 py-8 shrink-0">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold mb-8">eat.io</h1>
         <NavLink
  to="home"
  className={({ isActive }) => `text-base py-1 ${isActive ? "text-black font-medium" : "text-gray-400 hover:text-black"}`}
>
  Home
</NavLink>
<NavLink
  to="nutritionGuide"
  className={({ isActive }) => `text-base py-1 ${isActive ? "text-black font-medium" : "text-gray-400 hover:text-black"}`}
>
  Guide
</NavLink>
<NavLink
  to="profile"
  className={({ isActive }) => `text-base py-1 ${isActive ? "text-black font-medium" : "text-gray-400 hover:text-black"}`}
>
  Profile
</NavLink>
<NavLink
  to="saved"
  className={({ isActive }) => `text-base py-1 ${isActive ? "text-black font-medium" : "text-gray-400 hover:text-black"}`}
>
  Saved
</NavLink>
        </div>

        <button
          onClick={handleLogout}
          className="text-base text-gray-400 hover:text-black text-left"
        >
          Log out
        </button>
      </div>

      
      <div className="flex-1 px-8 py-8 overflow-y-auto">
       {isRoot ? (
  <div className="max-w-sm mt-12">
    <h2 className="text-2xl font-semibold mb-1">Welcome to eat.io.</h2>
    <p className="text-base text-gray-400 mb-10">
      Start exploring recipes tailored for you.
    </p>
    <button
      onClick={() => navigate("/dashboard/home")}
      className="bg-black text-white px-6 py-2 rounded-lg text-base"
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