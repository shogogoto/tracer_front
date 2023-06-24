import type { MockResolver } from "./types"
import type { CreatedConcept } from "../../types"


export const put: MockResolver = async (req, res, ctx) => {
  const { name } = await req.json<CreatedConcept>()
  if (name === "fail") {
    return await res(ctx.status(500))
  }

  return await res(ctx.status(204))
}
