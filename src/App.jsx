import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./Context/AuthContext"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import ProtectedRoute from "./Components/Layout/ProtectedRoute"
import Onboarding from "./Pages/Onboarding"
import Dashboard from "./Pages/Dashboard/Dashboard"


function App() {
  

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
           <Route path="/onboarding" element={
            <ProtectedRoute>
              <Onboarding/>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
