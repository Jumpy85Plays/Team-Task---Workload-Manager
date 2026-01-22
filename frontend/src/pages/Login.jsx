import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    await api.post("/login", { email, password });
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <div className="login-toggle">
        <Button
          className="toggle-btn"
          onClick={() => setIsAdmin((prev) => !prev)}
        >
          {isAdmin ? "Switch to Employee" : "Switch to Admin"}
        </Button>
      </div>
      {!loggedIn ? (
        <>
          <Typography variant="h5">{isAdmin ? "Admin Login" : "Employee Login"}</Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            onChange={e => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            onChange={e => setPassword(e.target.value)}
          />

          <Button fullWidth variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </>
      ) : (
        <div className="logout-container">
          <Typography variant="h5">Welcome, {email}!</Typography>
          <Typography>You are logged in as {isAdmin ? "Admin" : "Employee"}.</Typography>
          <Button className="logout-btn" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </Box>
  );
}
