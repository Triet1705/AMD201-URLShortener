import React, { useState } from "react";
import Button from "../../components/Button/Button";
import InputForm from "../../components/InputForm/InputForm";
import Box from "../../components/Box/Box";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../utils/api";
import { message } from "antd";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await loginApi(username, password);
      localStorage.setItem("jwt_token", data.token);
      message.success("Login successful!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      message.error("Login failed: " + error.message);
    }
    console.log("Logging in with:", { username, password });
  };
  return (
    <div className="container">
      <Box>
        <form onSubmit={handleLogin} className="form-container">
          <div className="group">
            <label htmlFor="username" className="text-title">
              Username
            </label>
            <InputForm
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="password" className="text-title">
              Password
            </label>
            <InputForm
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="action-group">
            <Button>Login</Button>
            <p>
              Don't have an account yet? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default LoginPage;
