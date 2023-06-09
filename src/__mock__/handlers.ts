import { rest } from "msw"

import { getByName } from "./mock"

const baseUrl = import.meta.env.VITE_BACKEND_URI as string

const handlers = [rest.get(`${baseUrl}/concepts`, getByName)]

export default handlers
