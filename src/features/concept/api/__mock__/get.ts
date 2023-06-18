import { one, stats } from "../../utils"

import type { MockResolver } from "./types"

export const mockedConceptsList = [...Array(10)].map((_, i) => {
  return {
    item: one(`name${i}`, `description${i}`),
    statistics: stats(),
  }
})

export const getSuccess: MockResolver = async (req, res, ctx) => {
  const name = req.url.searchParams.get("name")

  if (name === "empty" || name === "") {
    return await res(ctx.status(200), ctx.json([]))
  }

  if (name === "fail") {
    return await res(ctx.status(500))
  }

  return await res(ctx.status(200), ctx.json(mockedConceptsList))
}
