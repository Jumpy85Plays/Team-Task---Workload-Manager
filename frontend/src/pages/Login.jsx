// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper,
  useMediaQuery
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import api from "../api";

// Image placed in: src/assets/login-image.png
import loginImage from "../assets/login-image.png";

export default function LoginMUI({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");

  const isMobile = useMediaQuery("(max-width:900px)");

  const handleLogin = async () => {
    try {
      setError("");

      const response = await api.post("/login", { email, password });

      const userData = response.data; // must include id, email, role

      onLogin(userData);

      if (userData.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: darkMode ? "#121212" : "#f5f5f5"
      }}
    >
      {/* LEFT SIDE: LOGIN FORM */}
      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            position: "relative",
            bgcolor: darkMode ? "#1e1e1e" : "#ffffff"
          }}
        >
          {/* Dark / Light Mode Toggle */}
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <Typography variant="h4" sx={{ mb: 3 }}>
            Login
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </Box>

      {/* RIGHT SIDE: IMAGE (HIDDEN ON MOBILE) */}
      {!isMobile && (
        <Box
          sx={{
            width: "50%",
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      )}
    </Box>
  );
}
