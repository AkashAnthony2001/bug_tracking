import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiService from '../services/apiService'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme();
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().required('Role is required'),
});


export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      role: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await apiService.createUser(values);

      if (result.error) {
        // Handle error
        return;
      }

      navigate('/login');
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
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Box sx={{
              bgcolor: 'whitesmoke',
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 6,
              alignItems: 'center',
            }}>
            <Typography component="h1" variant="h5" sx={{pt:0,pb:3}}>
              Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    autoFocus
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <Typography variant="caption" color="error">
                      {formik.errors.name}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    autoComplete="username"
                    {...formik.getFieldProps('username')}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <Typography variant="caption" color="error">
                      {formik.errors.username}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    id="password"
                    autoComplete="new-password"
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
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="caption" color="error">
                      {formik.errors.password}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required id="role">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      label="Role"
                      id="role"
                      value={formik.values.role}
                      onChange={formik.handleChange('role')}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                    >
                      <MenuItem value="developer">Developer</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                    {formik.touched.role && formik.errors.role && (
                      <Typography variant="caption" color="error">
                        {formik.errors.role}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
            <Typography variant="text" color="initial">Already have an account? <Link to="/login">Sign In</Link></Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
