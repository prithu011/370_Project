import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext(null)

// Define admin emails
const ADMIN_EMAILS = [
  'tanjum.ibnul.mahmud@g.bracu.ac.bd',
  'tohanahin121@gmail.com',
]

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const isAdmin = ADMIN_EMAILS.includes(user.email.toLowerCase())
          setCurrentUser({
            email: user.email,
            name: user.displayName || user.email,
            isAdmin: isAdmin,
            role: isAdmin ? 'admin' : 'user',
          })
          // Store in localStorage for persistence
          localStorage.setItem(
            'user',
            JSON.stringify({
              email: user.email,
              name: user.displayName || user.email,
              isAdmin: isAdmin,
              role: isAdmin ? 'admin' : 'user',
            })
          )
        } else {
          setCurrentUser(null)
          localStorage.removeItem('user')
        }
        setLoading(false)
      },
      (error) => {
        console.error('Auth state change error:', error)
        setError(error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])
  const updateCurrentUser = useCallback((userData) => {
    setCurrentUser(userData)
  }, [])

  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [currentUser])

  // Memoize the context value to prevent unnecessary rerenders
  const contextValue = useMemo(
    () => ({
      currentUser,
      loading,
      updateCurrentUser,
      error,
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.isAdmin ?? false,
    }),
    [currentUser, loading, error]
  )

  if (loading) {
    return <div>Loading authentication...</div>
  }

  if (error) {
    return <div>Authentication Error: {error}</div>
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

// Custom hooks with error handling
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Specialized hooks for specific auth states
export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

export const useIsAdmin = () => {
  const { isAdmin } = useAuth()
  return isAdmin
}

export const useCurrentUser = () => {
  const { currentUser } = useAuth()
  return currentUser
}
