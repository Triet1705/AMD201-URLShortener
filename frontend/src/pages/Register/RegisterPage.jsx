import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Box from "../../components/Box/Box";
import InputForm from "../../components/InputForm/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../utils/api";
import { message } from "antd";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      await registerApi(username, password);
      message.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      message.error(err.message);
    }
  };
  return (
    <div className="container">
      <Box>
        <form onSubmit={handleRegister} className="form-container">
          <div className="group">
            <label className="text-title">Username</label>
            <InputForm
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="group">
            <label className="text-title">Password</label>
            <InputForm
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="group">
            <label className="text-title">Reenter Password</label>
            <InputForm
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="action-group">
            <Button>Register</Button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default RegisterPage;
