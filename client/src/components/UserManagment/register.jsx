import React, { useState } from "react";

const Register = ({ onRegister, onSwitch }) => {
  const [formData, setFormData] = useState({ first: "", last: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = () => {
    onRegister({ email: formData.email });
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
