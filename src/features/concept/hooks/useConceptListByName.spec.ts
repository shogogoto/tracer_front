import useConceptListByName from "./useConceptListByName"
import useConceptNew from "./useConceptNew"
import { renderHook, waitFor } from "@testing-library/react"

describe("hook: 名前でConceptを取得", () => {
  test("fetch", async () => {
    const { result } = renderHook(
      async () => await useConceptListByName("test")
    )
    await waitFor(async () => {
      const waited = await result.current
      console.log(result.current)
      return waited.length === 2
    })
  })
})
