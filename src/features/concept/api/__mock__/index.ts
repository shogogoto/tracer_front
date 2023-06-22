import { rest } from "msw"

import { getSuccess } from "./get"
import { postSuccess } from "./post"



const baseUrl = import.meta.env.VITE_BACKEND_URI as string

const handlers = [
  rest.get(`${baseUrl}/concepts`, getSuccess),
  rest.post(`${baseUrl}/concepts`, postSuccess),
]

export default handlers
