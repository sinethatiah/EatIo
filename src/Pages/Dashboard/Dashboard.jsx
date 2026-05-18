
import React from 'react'
import {  Link, Outlet, useNavigate } from 'react-router-dom'

const Dashboard =()=> {
    const navigate = useNavigate()
    
  return (
    <>
      <div >
<nav className="flex  flex-col gap-4 text-xl text-gray-400 ml-10">
<Link to="home">Home</Link>
<Link to="nutritionGuide">Guide</Link>
<Link to="profile">Profile</Link>
<Link to="saved">Saved</Link>
</nav>
<Outlet/>


      </div>
    </>
  )
}

export default Dashboard