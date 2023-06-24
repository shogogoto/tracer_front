import type { MockResolver } from "./types"
import type { ConceptFormType } from "../../hooks/useCreateForm"


export const post: MockResolver = async (req, res, ctx) => {
  const { name } = await req.json<ConceptFormType>()
  if (name === "fail") {
    return await res(ctx.status(500))
  }

  return await res(
    ctx.status(201),
    ctx.json({
      id: 1,
      name: "John",
    })
  )
}
