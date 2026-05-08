import axios from 'axios'

<<<<<<< HEAD
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/`,
  withCredentials: true,
})

export default api
=======
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // ❗ НЕ 127.0.0.1
  withCredentials: true,
})

export default api
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
