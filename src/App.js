import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthenticationForm from "./pages/Authentication";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import HrDashboard from "./pages/HrDashboard";
import LeavePage from "./pages/LeavePage";
import EmployeeLeave from "./components/EmployeeLeave";
import LeaveForm from "./components/LeaveForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? stored === "true" : false;
  });

  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("themeColor") || "#7DB9B6";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const role = localStorage.getItem("role")?.toLowerCase();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            role === "hr" ? (
              <Navigate to="/hr" replace />
            ) : role === "employee" ? (
              <Navigate to="/employee" replace />
            ) : (
              <AuthenticationForm
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
              />
            )
          }
        />

        <Route
          path="/hr"
          element={
            <ProtectedRoute roleAllowed={["hr"]}>
              <HrDashboard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute roleAllowed={["employee"]}>
              <EmployeeDashboard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave"
          element={
            <ProtectedRoute roleAllowed={["hr"]}>
              <LeavePage
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave/status"
          element={
            <ProtectedRoute roleAllowed={["employee"]}>
              <EmployeeLeave
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave/form"
          element={
            <ProtectedRoute roleAllowed={["employee"]}>
              <LeaveForm darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;