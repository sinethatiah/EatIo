import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./Components/Layout/ProtectedRoute";
import Onboarding from "./Pages/Onboarding";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Dashboard/Home";
import NutritionGuide from "./Pages/Dashboard/NutritionGuide";
import Profile from "./Pages/Dashboard/Profile";
import Saved from "./Pages/Dashboard/Saved";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="home" element={<Home />} />
              <Route path="nutritionGuide" element={<NutritionGuide />} />
              <Route path="profile" element={<Profile />} />
              <Route path="saved" element={<Saved />} />
            </Route>
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
