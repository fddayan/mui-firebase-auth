import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from './Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isEmpty } from 'lodash';
import { addErrorIfEmpty } from './utils';

const DefaultAvatar = (
  <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
    <LockOutlinedIcon />
  </Avatar>
)

const theme = createTheme();

export default function SignUp({
  title = "Sign up",
  buttonLabel = "Sign up",
  signInLabel = "Already have an account? Sign in",
  icon = DefaultAvatar,
  onSignInClick,
  onSignUp,
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
      onSignUp && onSignUp(attributes)
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors['email'] || hasAlert}
                  helperText={errors['email']}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputProps={{ "data-testid": "email" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors['password'] || hasAlert}
                  helperText={errors['password']}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputProps={{ "data-testid": "password" }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              data-testid='sign-up-submit'
            >
              {buttonLabel}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link id="muifirebaseauth-sign-up-sign-in-link" style={{cursor:'pointer'}} variant="body2" onClick={onSignInClick}>
                  {signInLabel}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}