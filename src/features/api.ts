import axios from "axios"
import { type AxiosInstance } from "axios"

export const createApiClient = (subUrl: string): AxiosInstance => {
  const backUrl = import.meta.env.VITE_BACKEND_URI as string
  const baseUrl = `${backUrl}/${subUrl}`
  return axios.create({
    baseURL: baseUrl,
  })
}

export const BACKEND = createApiClient("")
export default BACKEND
