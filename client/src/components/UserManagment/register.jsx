import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";

const Register = ({ onRegister, onSwitch }) => {
  const [formData, setFormData] = useState({ first: "", last: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/register`, formData);
      onRegister({ email: formData.email });
      alert("Account created successfully!");
    } catch (error) {
      console.error("Register error:", error.message);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="register-card">
      <h2>Create Account</h2>
      <input type="text" name="first" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="last" placeholder="Last Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button className="btn register-btn" onClick={handleRegister}>Create Account</button>
      <button className="btn back-btn" onClick={onSwitch}>Back to Login</button>
    </div>
  );
};

export default Register;
