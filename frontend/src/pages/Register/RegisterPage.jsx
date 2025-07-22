import React from "react";
import Button from "../../components/Button/Button";
import Box from "../../components/Box/Box";
import InputForm from "../../components/InputForm/InputForm";

function RegisterPage() {
  return (
    <div className="container">
      <Box>
        <div className="form-container">
          <div className="group">
            <label className="text-title">Username</label>
            <InputForm />
          </div>
          <div className="group">
            <label className="text-title">Password</label>
            <InputForm />
          </div>
          <div className="group">
            <label className="text-title">Reenter Password</label>
            <InputForm />
          </div>
          <div className="action-group">
            <Button>Register</Button>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default RegisterPage;
