import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
