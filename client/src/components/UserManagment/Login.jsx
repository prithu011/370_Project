import React, { useState, useCallback } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { auth, provider, signInWithPopup } from '../../firebaseConfig'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '../../config'
import { useAuth } from '../AuthContext'

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { currentUser, updateCurrentUser } = useAuth()
  const navigate = useNavigate()
  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const details = {
        email,
        password,
        role,
        name: email,
      }

      const response = await axios.post(`${API_BASE_URL}/api/login`, details)
      console.log(response.data)

      const userData = response.data.user
      console.log(userData)

      // Let AuthContext handle the user state
      auth.currentUser = {
        displayName: userData.name || userData.email || 'User',
        email: userData.email,
      }
      updateCurrentUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      setError(
        error.response?.data?.message || 'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }, [email, password, role, updateCurrentUser])

  const handleGoogleLogin = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await signInWithPopup(auth, provider)
      const googleUser = result.user

      const res = await axios.post(`${API_BASE_URL}/api/google-login`, {
        email: googleUser.email,
        name: googleUser.displayName,
        role,
      })
      console.log('google', res.data)

      updateCurrentUser(res.data.user)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (error) {
      console.error('Google login error:', error)
      setError('Google login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [role, updateCurrentUser])

  // Redirect if already logged in
  if (currentUser) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="login-card flex flex-col justify-center align-middle gap-4">
        <h2>LOGIN</h2>
        {error && (
          <div className="error-message text-red-500 text-sm">{error}</div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <div className="password-wrapper">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <span
            className="eye-icon"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div>
          <label className="text-sm">Select Role:</label>
          <select
            className="ml-2 border p-1 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          className={`btn login-btn ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button
          className={`btn google flex flex-row gap-12 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FaGoogle className="mt-1" />
          {loading ? 'Connecting...' : 'Login with Google'}
        </button>

        <div className="footer-links">
          <p onClick={onSwitch}>Create account</p>
          <p className="forgot">Forgot password?</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Login)
