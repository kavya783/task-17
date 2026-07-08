import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleAllowed }) {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  if (!email || !role) {
    return <Navigate to="/" replace />;
  }

  if (roleAllowed && !roleAllowed.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}