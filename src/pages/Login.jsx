import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiService from '../services/apiService'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';

const theme = createTheme();

export default function Login() {
  const [usernameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [invalidError, setInvalidError] = useState('');

  const navigate = useNavigate()

  // Redirect if someone is already logged in
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      return navigate('/dashboard')
    }
  }, [])

  const validation = (userData) => {
    let isValid = true;

    if (userData.username.trim() === '') {
      setNameError('Name is required')
      isValid = false;
    } else {
      setNameError('')
    }

    if (userData.password.trim() === '') {
      setPasswordError('Password is required')
      isValid = false;
    } else {
      setPasswordError('')
    }

    return isValid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userObj = {
      username: data.get('username'),
      password: data.get('password'),
    }

    if (validation(userObj)) {
      const result = await apiService.login(userObj)

      if (result.error) {
        // TODO: Add snackbar for printing the error
        setInvalidError(result.error)
        return
      }

      localStorage.setItem('token', result.token)
      localStorage.setItem('name', result.name)
      localStorage.setItem('username', result.username)

      navigate('/dashboard')
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  error={!!usernameError}
                  autoComplete="given-name"
                />
                {usernameError && <Typography variant="caption" color="error">{usernameError}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!passwordError}
                />
                {passwordError && <Typography variant="caption" color="error">{passwordError}</Typography>}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {invalidError && <Typography variant="caption" color="error">{invalidError}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Grid>
          </Box>
          <Link to="/signup">Don't have an account? Click here to sign up</Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}