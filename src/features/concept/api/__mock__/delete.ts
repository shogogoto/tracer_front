import type { MockResolver } from "./types"

// deleteという変数名が許容されず
export const delete_: MockResolver = async (req, res, ctx) => {
  const { uid } = req.params
  if (uid === "notFound") {
    return await res(ctx.status(404))
  }

  return await res(ctx.status(204))
}
