import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import { auth, googleProvider, facebookProvider, signInWithPopup } from "../../firebaseConfig";

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
  const [role, setRole] = useState("user"); // NEW: role state
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    const userData = { email, role };
    onLogin(userData);
    window.open('/dashboard', '_self');
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      const userData = {
        email: googleUser.email,
        name: googleUser.displayName,
        role: role, // Use selected role
      };
      setUser(googleUser);
      onLogin(userData);
      window.open('/dashboard', '_self');
    } catch (error) {
      console.error("Google login error:", error.message);
      window.open('/', '_self');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const fbUser = result.user;
      const userData = {
        email: fbUser.email,
        name: fbUser.displayName,
        role: role, // Use selected role
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

        {/* New Role Selector */}
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
