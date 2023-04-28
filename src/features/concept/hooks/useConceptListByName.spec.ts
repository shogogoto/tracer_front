import useConceptListByName from "./useConceptListByName"
import { renderHook, waitFor } from "@testing-library/react"
import { server } from "./server"

describe("hook: 名前でConceptを取得", () => {
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  test("fetch", async () => {
    const { result } = renderHook(async () => useConceptListByName("test"))
    await waitFor(async () => {
      const waited = await result.current
      return waited.length === 2
    })
  })
})
