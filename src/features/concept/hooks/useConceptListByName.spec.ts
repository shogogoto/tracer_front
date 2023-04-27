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
    const { result } = renderHook(
      async () => await useConceptListByName("test")
    )
    // console.log(data)

    // console.log(result.current)
    // console.log((await result.current).length)
    // expect(1).toBe(1)
    // await waitFor(())
    await waitFor(() => result.current.length === 2)
  })
})
