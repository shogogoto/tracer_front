import { rest } from "msw"

import { getSuccess } from "./get"

const baseUrl = import.meta.env.VITE_BACKEND_URI as string

const handlers = [rest.get(`${baseUrl}/concepts`, getSuccess)]

export default handlers
