import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from './Alert';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isEmpty } from 'lodash';
import { addErrorIfEmpty, cssClassName } from './utils';

const DefaultAvatar = (
  <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
    <LockOutlinedIcon />
  </Avatar>
)

const theme = createTheme();

export default function SignIn({
  title = "Sign in",
  icon = DefaultAvatar,
  signUpLabel = "Don't have an account? Sign Up",
  forgotPasswordLabel = "Forgot password?",
  buttonLabel = "Sign in",
  rememberMe = true,
  forgotPassword = true,
  onSignUpClick,
  onForgotPasswordClick,
  onSignIn,
  alert
}) {
  const [errors, setErrors] = useState({})

  const handleSubmit = (event) => {
    const newErrors = {}
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const attributes = {
      email: data.get('email'),
      password: data.get('password'),
    }

    addErrorIfEmpty(newErrors, attributes, "email", "Email cannot be blank.")
    addErrorIfEmpty(newErrors, attributes, "password", "Password cannot be blank.")

    setErrors(newErrors)
    if (isEmpty(newErrors)) {
      onSignIn && onSignIn(attributes)
    }    
  };

  const hasAlert = !isEmpty(alert)

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
          {icon}
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Alert alert={alert} type='plain' />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={errors['email'] || hasAlert}
              helperText={errors['email']}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{ "data-testid": "email" }}
            />
            <TextField
              error={errors['password'] || hasAlert}
              helperText={errors['password']}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{ "data-testid": "password" }}
            />
            {rememberMe &&
              (<FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />)
              }
            <Button
              data-testid='sign-in-submit'
              id={cssClassName('sign-in-submit')}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {buttonLabel}
            </Button>
            <Grid container>
              <Grid item xs>
                {forgotPassword &&
                  (<Link id={cssClassName('forgot-password-link')} style={{cursor:'pointer'}}  variant="body2" onClick={onForgotPasswordClick}>
                    {forgotPasswordLabel}
                  </Link>)
                }
              </Grid>
              <Grid item>
                <Link id={cssClassName('sign-up-link')} style={{cursor:'pointer'}} variant="body2" onClick={onSignUpClick}>
                  {signUpLabel}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}