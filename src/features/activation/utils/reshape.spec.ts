import { reshapeJagged2D } from "./reshape"

const arr = [...Array(30)].map((_, i) => i)

describe.each<[number, number, number, string]>([
  [30, 1, 0, "same length"],
  [5, 6, 0, "no surplus"],
  [7, 4, 2, "exist surplus"],
])("reshapeJagged2D", (size, quotient, surplus, caseName) => {
  test(caseName, () => {
    const res = reshapeJagged2D<number>(arr, size)
    expect(res.quotient).toBe(quotient)
    expect(res.surplus).toBe(surplus)
  })
})

describe("reshape", () => {
  test("zero size", () => {
    expect(() => reshapeJagged2D<number>(arr, -1)).toThrow()
  })

  test("zero size", () => {
    expect(() => reshapeJagged2D<number>(arr, 0)).toThrow()
  })

  test("exceed lenth", () => {
    expect(() => reshapeJagged2D<number>(arr, 31)).toThrow()
  })

  test("empty array", () => {
    const empty = new Array<number>(0)
    ;[1, 2, 3].map((i) => {
      const res = reshapeJagged2D<number>(empty, i)
      expect(res.value).toEqual([])
      expect(res.quotient).toEqual(0)
      expect(res.surplus).toEqual(0)
    })
  })
})
