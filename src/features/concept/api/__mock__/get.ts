import { type ConceptWithStatistics } from "../../types"
import { one, stats } from "../../utils"

import type { MockResolver } from "./types"

export const mockedConceptsList = (n: number): ConceptWithStatistics[] => {
  return [...Array(n)].map((_, i) => {
    return {
      item: one(`name${i}`, `description${i}`),
      statistics: stats(),
    }
  })
}
export const getSuccess: MockResolver = async (req, res, ctx) => {
  const name = req.url.searchParams.get("name")

  if (name === "empty" || name === "") {
    return await res(ctx.status(200), ctx.json([]))
  }

  if (name === "fail") {
    return await res(ctx.status(500))
  }

  const num = Number(name)
  if (!Number.isNaN(num)) {
    return await res(ctx.status(200), ctx.json(mockedConceptsList(num)))
  }

  return await res(ctx.status(200), ctx.json(mockedConceptsList(50)))
}
