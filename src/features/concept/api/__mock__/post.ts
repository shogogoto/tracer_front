import type { MockResolver } from "./types"


export const postSuccess: MockResolver = async (req, res, ctx) => {
  return await res(
    ctx.status(201),
    ctx.json({
      id: 1,
      name: "John",
    })
  )
}
