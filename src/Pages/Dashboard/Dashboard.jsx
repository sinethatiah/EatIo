import { auth } from "../../firebase"
import { signOut } from 'firebase/auth'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="flex flex-col justify-between w-48 border-r border-gray-100 px-6 py-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold mb-8">eat.io</h1>
          <Link to="home" className="text-base text-gray-400 hover:text-black py-1">Home</Link>
          <Link to="nutritionGuide" className="text-base text-gray-400 hover:text-black py-1">Guide</Link>
          <Link to="profile" className="text-base text-gray-400 hover:text-black py-1">Profile</Link>
          <Link to="saved" className="text-base text-gray-400 hover:text-black py-1">Saved</Link>
        </div>

        <button
          onClick={handleLogout}
          className="text-base text-gray-400 hover:text-black text-left"
        >
          Log out
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 px-8 py-8">
        <Outlet />
      </div>

    </div>
  )
}

export default Dashboard