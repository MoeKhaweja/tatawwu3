import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios"; // Import Axios

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false); // State variable for loading

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }

    if (email !== "" && password !== "") {
      setLoading(true); // Set loading to true when the API request starts

      try {
        // Make the API request using Axios
        const response = await axios.post("http://127.0.0.1:8000/auth/login", {
          email,
          password,
        });

        // Handle the API response here, e.g., store user data in state or localStorage

        console.log("API Response:", response.data);
      } catch (error) {
        // Handle errors from the API request
        console.error("API Error:", error.response.data);
      } finally {
        setLoading(false); // Set loading to false when the API request is completed
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            style={{ backgroundColor: "white" }}
            variant='filled'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Email is required" : ""}
          />
          <TextField
            style={{ backgroundColor: "white" }}
            variant='filled'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? "Password is required" : ""}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {loading && <CircularProgress sx={{ mt: 2 }} />}{" "}
          {/* Show loading component conditionally */}
        </Box>
      </Box>
    </Container>
  );
}
