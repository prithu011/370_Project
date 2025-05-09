import React from 'react'
import { useAuth } from '../components/AuthContext'
import { Navigate } from 'react-router-dom'

const Admin = () => {
  const { currentUser, isAdmin } = useAuth()

  if (!currentUser || !isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      {/* ...existing admin content... */}
    </div>
  )
}

export default Admin
