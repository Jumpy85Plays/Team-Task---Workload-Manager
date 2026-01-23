// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={handleLogin} />}
        />

        <Route
          path="/employee-dashboard"
          element={
            user?.role === "employee"
              ? <EmployeeDashboard user={user} onLogout={handleLogout} />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            user?.role === "admin"
              ? <AdminDashboard user={user} onLogout={handleLogout} />
              : <Navigate to="/" />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
