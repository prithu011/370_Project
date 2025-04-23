import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import { auth, googleProvider, facebookProvider, signInWithPopup } from "../firebaseConfig";

const Login = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Simulate email/password login (Firebase EmailAuth can be added here if needed)
    onLogin({ email });
    window.open('/dashboard')
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin(result.user);
      window.open('/dashboard')
    } catch (error) {
      console.error("Google login error:", error.message);
      window.open('/')
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      onLogin(result.user);
      window.open('/dashboard')
    } catch (error) {
      console.error("Facebook login error:", error.message);
      window.open('/')
    }
  };

  return (
    <div  className="min-h-screen flex items-center justify-center">
    <div className="login-card  flex flex-row justify-center align-middle">
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

      <button className="btn login-btn " onClick={handleLogin}>Login</button>
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
