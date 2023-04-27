import useConceptListByName from "./useConceptListByName"
import { renderHook } from "@testing-library/react"
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
    const { result } = renderHook(
      async () => await useConceptListByName("test")
    )
    const waited = await result.current
    expect(waited.data.length).toBe(2)
  })
})
