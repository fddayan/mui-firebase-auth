import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Alert from './Alert';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import DefaultService from './service';

const setUserInStorage = (attributes) => {
  localStorage.setItem('user', JSON.stringify(attributes))
}

const getUserFromStorage = () => {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user)
  } else {
    return null
  }
}

export const signOut = () => {
  localStorage.setItem('user', null)
}

const MuiFirebaseAuth = ({
  signInProps,
  signUpProps,
  forgotPasswordProps,
  apiKey,
  onSignUp,
  onSignIn,
  onLoadCachedUser,
  onForgotPasswordSend,
  defaultView = "signIn",
  service = DefaultService
}) => {
  const [view, setView ] = useState(defaultView)
  const [ alert, setAlert ] = useState({})

  useEffect(() => {
    const user = getUserFromStorage()
    if (user) {
      onLoadCachedUser && onLoadCachedUser(user)
    }
  }, [onLoadCachedUser])

  const onSignUpHandler = (attributes) => {   
    service.signUp(apiKey, attributes)
    .then(response => {
      onSignUp && onSignUp(response.data)
      setUserInStorage(response.data)
    })
    .catch(err => {     
      const { error: { message } } = err.response.data
      const newAlert = {}

      newAlert['global'] = { severity:'error', message: 'Cannot sign up. There are errors' }
      if (message === 'EMAIL_EXISTS') {
        newAlert['signUp'] = { severity:'error', message: 'Email already exists.' }
      }
      
      setAlert(newAlert)
    })
  }

  const onSignInHandler = (attributes) => {
    service.signIn(apiKey, attributes)
    .then(response => {
      onSignIn && onSignIn(response.data)
      setUserInStorage(response.data)
    })
    .catch(err => {
      const { error: { message } } = err.response.data
      const newAlert = {}

      newAlert['global'] = { severity:'error', message: 'Cannot sign in. There are errors' }

      if (message === 'EMAIL_NOT_FOUND') {
        newAlert['signIn'] = { severity:'error', message: 'Invalid email or password' }
      }

      setAlert(newAlert)
    })
  }

  const onForgotPasswordSendHandler = (attributes) => {
    service.sendPasswordResetEmail(apiKey, attributes)
    .then(response => {
      setView('signIn')
      setAlert({ global: { severity:'info', message:"Email with password reset instructions sent." }})
      onForgotPasswordSend && onForgotPasswordSend()
    })
    .catch(err => {
      const { error: { message } } = err.response.data
      const newAlert = {}

      newAlert['global'] = { severity:'error', message: 'Cannot send recover password email. There are errors' }

      if (message === 'EMAIL_NOT_FOUND') {
        newAlert['forgotPassword'] = { severity:'error', message: 'Email does not exists.' }
      }

      setAlert(newAlert)
    })
  }

  const changeView = view => () => setView(view)

  return (
    <Box>
      <Alert alert={alert['global']} />
      {view === 'signIn' &&
        (<SignIn 
          {...signInProps} 
          onSignUpClick={changeView('signUp')}
          onForgotPasswordClick={changeView('forgotPassword')}
          onSignIn={onSignInHandler}
          alert={alert['signIn']}
        />)
      }
      {view === 'signUp' &&
        (<SignUp 
          {...signUpProps} 
          onSignInClick={changeView('signIn')}
          onSignUp={onSignUpHandler}
          alert={alert['signUp']}
        />)
      }
      {view === 'forgotPassword' &&
        (<ForgotPassword 
          {...forgotPasswordProps} 
          onSignInClick={changeView('signIn')}
          onSend={onForgotPasswordSendHandler}
          alert={alert['forgotPassword']}
        />)
      }
    </Box>
  );
};

export default MuiFirebaseAuth;