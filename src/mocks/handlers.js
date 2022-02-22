import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('/accounts:signUp', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),
  // Handles a GET /user request
  rest.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword', (req, res, ctx) => {
     return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),
   // Handles a GET /user request
  rest.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode', (req, res, ctx) => {
     return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),
]