import axios from 'axios'

const api = axios.create({
  baseURL: 'https://hero-backend.herokuapp.com/'
})

export default api