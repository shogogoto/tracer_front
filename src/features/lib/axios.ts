import axios from "axios"



axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI

export { axios }
