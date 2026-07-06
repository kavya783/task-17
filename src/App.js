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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />

          <Route
            path="/hr"
            element={
              <ProtectedRoute roleAllowed={["hr"]}>
                <HrDashboard
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
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
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;