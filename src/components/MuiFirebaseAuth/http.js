import axios from 'axios'

const BASE_URL = "https://identitytoolkit.googleapis.com/v1"

const post = (path, attributes) => {  
  const url = `${BASE_URL}${path}`
  return axios.post(url, {
    ...attributes
  })

}

const http = {
  post
}

export default http