import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { DashboardPage } from "./pages/Dashboard";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>}/>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>}/>
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}
