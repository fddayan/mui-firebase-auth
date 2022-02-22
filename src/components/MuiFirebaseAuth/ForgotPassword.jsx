import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { isEmpty } from 'lodash';
import { addErrorIfEmpty } from './utils';
import Alert from './Alert';

const theme = createTheme();

const ForgotPassword = ({
  title = "Forgot password",
  buttonLabel = "Send",
  signInLabel = "Sign in",
  onSignInClick,
  onSend,
  alert
}) => {
  const [errors, setErrors] = useState({})

  const handleSubmit = (event) => {
    const newErrors = {}
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const attributes = {
      email: data.get('email')
    }

    addErrorIfEmpty(newErrors, attributes, "email", "Email cannot be blank.")

    setErrors(newErrors)
    if (isEmpty(newErrors)) {    
      onSend && onSend(attributes)
    }
  }

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
           <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <QuestionMarkIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Alert alert={alert} type='plain' />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              data-testid="forgot-password-send"
            >
              {buttonLabel}
            </Button>

            <Link id="muifirebaseauth-forgot-password-sign-in-link" variant="body2" onClick={onSignInClick}>
              {signInLabel}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;