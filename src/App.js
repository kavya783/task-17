import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

// Lazy-loaded pages/components
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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let unsubscribe;

    const setupNotifications = async () => {
      try {
        const { listenForMessages } = await import("./notification");

        unsubscribe = listenForMessages();
      } catch (error) {
        console.error("Failed to initialize notifications:", error);
      }
    };

    setupNotifications();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>

            {/* Authentication */}
            <Route
              path="/"
              element={<Authentication />}
            />

            {/* Company Dashboard */}
            <Route
              path="/company-dashboard"
              element={
                <CompanyDashboard
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              }
            />

            {/* HR Dashboard */}
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

            {/* HR Leave Status */}
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

            {/* HR Employees */}
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

            {/* Leave Page */}
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

            {/* Employee Dashboard */}
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

            {/* Leave Form */}
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

            {/* Employee Leave Status */}
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

      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;