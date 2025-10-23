// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, decodeJwt } from "../auth/AuthContext";

export default function PrivateRoute({ children, requiredRoles = [] }) {
  const { accessToken } = useAuth();
  if (!accessToken) return <Navigate to="/login" replace />;

  if (requiredRoles.length) {
    const payload = decodeJwt(accessToken) || {};
    const roles = payload.roles || [];
    const allowed = requiredRoles.some(r => roles.includes(r));
    if (!allowed) return <Navigate to="/forbidden" replace />;
  }

  return children;
}