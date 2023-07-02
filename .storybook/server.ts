import { setupServer } from "msw/node"

import handlers from "../src/features/concept/api/__mock__"

const merged = [...handlers]

export const server = setupServer(...merged)
