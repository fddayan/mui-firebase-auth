import React from 'react';
import { mount } from 'enzyme';
import {render, fireEvent, waitFor, screen, act} from '@testing-library/react'

import MuiFirebaseAuth from './components/MuiFirebaseAuth'
import SignUp from './components/MuiFirebaseAuth/SignUp'
import ForgotPassword  from './components/MuiFirebaseAuth/ForgotPassword'
import SignIn from './components/MuiFirebaseAuth/SignIn'

const API_KEY = "xxxx"


const setTextField = (name, value) => {
  fireEvent.change(screen.getByTestId(name),  {
    target: { value: value }
  })
}

describe('<MuiFirebaseAuth />', () => {
  it('should change to SignUp view', () => {
    const wrapper = mount(<MuiFirebaseAuth apiKey={API_KEY} />)

    wrapper.find('a#muifirebaseauth-sign-up-link').simulate('click');

    expect(wrapper.find(SignUp)).toHaveLength(1);
  })

  it('should change to ForgotPassword view', () => {
    const wrapper = mount(<MuiFirebaseAuth apiKey={API_KEY} />)

    wrapper.find('a#muifirebaseauth-forgot-password-link').simulate('click');

    expect(wrapper.find(ForgotPassword)).toHaveLength(1);
  })

  it('should change back to Sign In view from ForgotPassword', () => {
    const wrapper = mount(<MuiFirebaseAuth apiKey={API_KEY} defaultView='forgotPassword' />)

    wrapper.find('a#muifirebaseauth-forgot-password-sign-in-link').simulate('click');    
    expect(wrapper.find(SignIn)).toHaveLength(1);
  })

  it('should change back to Sign In view from SignUp', () => {
    const wrapper = mount(<MuiFirebaseAuth apiKey={API_KEY} defaultView='signUp' />)
    
    wrapper.find('a#muifirebaseauth-sign-up-sign-in-link').simulate('click');
    expect(wrapper.find(SignIn)).toHaveLength(1);
  })

  it('should Sign in', (done) => {
    const signInHandler = () =>  done()

    const wrapper = render(<MuiFirebaseAuth apiKey={API_KEY} onSignIn={signInHandler}/>)

    setTextField('email', 'some@email.com')
    setTextField('password', 'pass1234')

    fireEvent.click(wrapper.getByTestId('sign-in-submit'))
  })


  it('should Sign Up', (done) => {
    const signUpHandler = () =>  done()

    const wrapper = render(<MuiFirebaseAuth apiKey={API_KEY} defaultView='signUp' onSignUp={signUpHandler}/>)

    setTextField('email', 'some@email.com')
    setTextField('password', 'pass1234')

    fireEvent.click(wrapper.getByTestId('sign-up-submit'))
  })

  it('should send forgot password email', async () => {
    const onForgotPasswordSendHandler = jest.fn()
    
    act(() => {      
      render(<MuiFirebaseAuth apiKey={API_KEY} defaultView='forgotPassword' onForgotPasswordSend={onForgotPasswordSendHandler}/>)
    })
    
    setTextField('email', 'some@email.com')

    act(() => {      
      fireEvent.click(screen.getByTestId('forgot-password-send'))
    })

    await waitFor(() => screen.findByRole('alert'))
    expect(onForgotPasswordSendHandler).toHaveBeenCalled()
  })
  
})