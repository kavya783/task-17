import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";

import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";


const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);
const Authentication = lazy(() =>
  import("./pages/Authentication")
);

const CompanyDashboard = lazy(() =>
  import("./pages/CompanyDashboard")
);

const HrDashboard = lazy(() =>
  import("./pages/HrDashboard")
);

const HrLeave = lazy(() =>
  import("./components/HrLeave")
);

const LeavePage = lazy(() =>
  import("./pages/LeavePage")
);

const EmployeeDashboard = lazy(() =>
  import("./pages/EmployeeDashboard")
);

const LeaveForm = lazy(() =>
  import("./components/LeaveForm")
);

const EmployeeLeave = lazy(() =>
  import("./components/EmployeeLeave")
);

function App() {

 useEffect(() => {
  let unsubscribe;

  const initNotifications = async () => {
    try {
      const { listenForMessages } = await import("./notification");

      unsubscribe = listenForMessages();
    } catch (error) {
      console.error("Notification initialization failed:", error);
    }
  };

  initNotifications();

  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
}, []);

  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <ErrorBoundary>
      <BrowserRouter>

        <Suspense fallback={<Loader />}>

          <Routes>

            <Route
              path="/"
              element={<Authentication />}
            />

            <Route
              path="/company-dashboard"
              element={
                <CompanyDashboard
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              }
            />

            <Route
              path="/hr/dashboard"
              element={
                <ProtectedRoute roleAllowed={["hr"]}>
                  <HrDashboard
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    pageType="dashboard"
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/hr/leave-status"
              element={
                <ProtectedRoute roleAllowed={["hr"]}>
                  <HrLeave
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/hr"
              element={
                <ProtectedRoute roleAllowed={["hr"]}>
                  <HrDashboard
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    pageType="employees"
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/leave"
              element={
                <ProtectedRoute roleAllowed={["hr", "company"]}>
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
                <ProtectedRoute roleAllowed={["employee", "hr"]}>
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

        </Suspense>

      </BrowserRouter>
      </ErrorBoundary>

      <ToastContainer />
    </>
  );
}

export default App;