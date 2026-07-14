import { BrowserRouter, Routes, Route } from "react-router-dom";
import HrDashboard from "./pages/HrDashboard";
import LeavePage from "./pages/LeavePage";
import LeaveForm from "./components/LeaveForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Authentication from "./pages/Authentication";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeLeave from "./components/EmployeeLeave";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
const [themeColor, setThemeColor] = useState(() => {

 const savedColor = localStorage.getItem("themeColor");

 return /^#[0-9A-Fa-f]{6}$/.test(savedColor)
   ? savedColor
   : "#7DB9B6";

});

  return (
    <>
      
        <Routes>
          

          <Route
            path="/hr"
            element={
              // <ProtectedRoute roleAllowed={["hr"]}>
                <HrDashboard
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  themeColor={themeColor}
                  setThemeColor={setThemeColor}
                />
              // </ProtectedRoute>
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
            path="/leave/form"
            element={
              <ProtectedRoute roleAllowed={["employee"]}>
                <LeaveForm
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
            path="/"
            element={
              <Authentication
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
              />
            }
          />
        </Routes>
    

      <ToastContainer />
    </>
  );
}

export default App;