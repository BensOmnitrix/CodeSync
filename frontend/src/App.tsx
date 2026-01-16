import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";
import { Dashboard } from "./pages/Dashboard";
import PRList from "./pages/PRList";
import PRDetail from "./pages/PRDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>}/>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/pr" element={<ProtectedRoute><PRList /></ProtectedRoute>}/>
        <Route path="/pr/:id" element={<ProtectedRoute><PRDetail /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}
