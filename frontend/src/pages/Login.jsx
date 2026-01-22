import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../api";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await api.post("/login", { email, password });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5">Login</Typography>

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
    </Box>
  );
}
