import { rest } from "msw"

import { delete_ } from "./delete"
import { get } from "./get"
import { post } from "./post"
import { put } from "./put"


const baseUrl = import.meta.env.VITE_BACKEND_URI as string

const handlers = [
  rest.get(`${baseUrl}/concepts`, get),
  rest.post(`${baseUrl}/concepts`, post),
  rest.put(`${baseUrl}/concepts`, put),
  rest.delete(`${baseUrl}/concepts`, delete_),
]

export default handlers
