import { setupServer } from "msw/node"

import handlers from "@/features/concept/api/__mock__"

const merged = [...handlers]

// export const worker = setupWorker(...merged)
export const server = setupServer(...merged)
