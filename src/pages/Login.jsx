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
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const theme = createTheme();
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});
export default function Login() {
  const [invalidError, setInvalidError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await apiService.login(values);

      if (result.error) {
        setInvalidError(result.error);
        return;
      }

      localStorage.setItem('token', result.token);
      localStorage.setItem('name', result.name);
      localStorage.setItem('username', result.username);
      localStorage.setItem('role', result.role);

      navigate('/dashboard');
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              bgcolor: 'whitesmoke',
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Typography component="h3" variant="h5" sx={{pt:0,pb:3}}>
              Sign In
            </Typography>
            <form onSubmit={formik.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    autoComplete="given-name"
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    {...formik.getFieldProps('username')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    variant="outlined"
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    {...formik.getFieldProps('password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Typography variant="caption" color="error">
                {invalidError}
              </Typography>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
            </form>
            <Typography variant="text" color="initial">
              Don't have an account? <Link to="/signup" color="#3277D5">Sign Up</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
