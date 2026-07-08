import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleAllowed }) {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/" />;

  if (roleAllowed && !roleAllowed.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}