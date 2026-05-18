import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./Context/AuthContext"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"



function App() {
  

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
           <Route path="/onboarding" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
