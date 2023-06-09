import { one, stats } from "../../utils"

import type { MockResolver } from "./types"

export const getSuccess: MockResolver = async (req, res, ctx) => {
  const name = req.url.searchParams.get("name")

  if (name === "empty") {
    return await res(ctx.status(200), ctx.json([]))
  }

  return await res(
    ctx.status(200),
    ctx.json(
      [...Array(10)].map((_, i) => {
        return {
          item: one(`name${i}`, `description${i}`),
          statistics: stats(),
        }
      })
    )
  )
}

export const getFail: MockResolver = async (req, res, ctx) => {
  return await res(ctx.status(500))
}
