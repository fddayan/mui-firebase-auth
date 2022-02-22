import http from "./http"

const withKey = (path, key) => `${path}?key=${key}`

const needApiKey = (apiKey) => {
  if (!apiKey) {
    throw new Error("API KEY is required")
  }
}

const signUp = (apiKey, attributes) => {
  needApiKey(apiKey)
  return http.post(withKey("/accounts:signUp", apiKey), {
    ...attributes,
    returnSecureToken: true
  })
}

const signIn = (apiKey, attributes) => {
  needApiKey(apiKey)
   return http.post(withKey("/accounts:signInWithPassword", apiKey), {
    ...attributes,
    returnSecureToken: true
  })
}

const sendPasswordResetEmail = (apiKey, attributes) => {
  needApiKey(apiKey)
  return http.post(withKey('/accounts:sendOobCode', apiKey), {
    requestType: 'PASSWORD_RESET',
    ...attributes
  })
}

const service = {
  signUp,
  signIn,
  sendPasswordResetEmail
}

export default service