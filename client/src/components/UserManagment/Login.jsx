import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import { auth, googleProvider, facebookProvider, signInWithPopup } from "../../firebaseConfig";
import axios from "axios";
import API_BASE_URL from "../../config";

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Login = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState("user");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const details = {
        email,
        password,
        role,
        name: email, 
      };

      const response = await axios.post(`${API_BASE_URL}/api/login`, details);
      const userData = response.data.user;

      auth.currentUser = {
        displayName: userData.name || userData.email || "User",
        email: userData.email,
      };

      onLogin(userData);
      setUser(auth.currentUser);
      console.log("Login successful:", userData);
      window.open("/dashboard", "_self");
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert("Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      const userData = {
        email: googleUser.email,
        name: googleUser.email, 
        role,
      };
      await axios.post(`${API_BASE_URL}/api/google-login`, userData);
      setUser(googleUser);
      onLogin(userData);
      console.log("Google login successful:", userData);
      window.open('/dashboard', '_self');
    } catch (error) {
      console.error("Google login error:", error.response?.data?.message || error.message);
      alert("Google login failed. Please try again.");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const fbUser = result.user;
      const userData = {
        email: fbUser.email,
        name: fbUser.email, 
        role,
      };
      setUser(fbUser);
      onLogin(userData);
      window.open('/dashboard', '_self');
    } catch (error) {
      console.error("Facebook login error:", error.message);
      window.open('/', '_self');
    }
  };

  useInterval(() => {
    if (user) {
      console.log(`Checking session for ${user.displayName}`);
    }
  }, user ? 10000 : null);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="login-card flex flex-col justify-center align-middle gap-4">
        <h2>LOGIN</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-wrapper">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div>
          <label className="text-sm">Select Role:</label>
          <select
            className="ml-2 border p-1 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="btn login-btn" onClick={handleLogin}>Login</button>
        <button className="btn google flex flex-row gap-12" onClick={handleGoogleLogin}>
          <FaGoogle className="mt-1" />
          Login with Google
        </button>
        <button className="btn facebook flex flex-row gap-12" onClick={handleFacebookLogin}>
          <FaFacebook className="mt-1"/>
          Login with Facebook
        </button>

        <div className="footer-links">
          <p onClick={onSwitch}>Create account</p>
          <p className="forgot">Forgot password?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
