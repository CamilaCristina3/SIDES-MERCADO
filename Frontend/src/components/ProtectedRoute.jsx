import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken, hasRole } from '../utils/auth'

export default function ProtectedRoute({ role, children }) {
  const token = getToken()
  if (!token) {
    const to = role === 'A' ? '/admin/login' : '/login'
    return <Navigate to={to} replace />
  }
  if (role && !hasRole(role)) {
    // usuário autenticado mas sem papel exigido
    return <Navigate to="/" replace />
  }
  return children
}

