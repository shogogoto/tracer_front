import { IndexRotator, IndexFolder } from "./indexOperation"
import type { Index } from "../types"

describe("IndexRotator", () => {
  test("IndexRotator arg error", () => {
    const rot = new IndexRotator(0, 2)
    expect(() => rot.checkArg(1.5)).toThrow()
    expect(() => rot.checkArg(1)).not.toThrow()
  })

  const sut = new IndexRotator(0, 2)
  test.each([
    [null, 0],
    [-3, 1],
    [-2, 2],
    [-1, 0],
    [0, 1],
    [1, 2],
    [2, 0],
    [3, 1],
  ])("increment %i then %i", (index: Index, expected: number) => {
    expect(sut.increment(index)).toBe(expected)
  })

  test.each([
    [null, 2],
    [-3, 2],
    [-2, 0],
    [-1, 1],
    [0, 2],
    [1, 0],
    [2, 1],
    [3, 2],
  ])("decrement %i then %i", (index: Index, expected: number) => {
    expect(sut.decrement(index)).toBe(expected)
  })

  test("operation", () => {
    const rot = new IndexRotator(0, 2)
    expect(rot.increment(null)).toBe(0)
    expect(rot.increment(0)).toBe(1)
    expect(rot.increment(1)).toBe(2)
    expect(rot.increment(2)).toBe(0)
    expect(rot.increment(3)).toBe(1)
    expect(rot.increment(4)).toBe(2)
    expect(rot.increment(5)).toBe(0)
    expect(rot.increment(6)).toBe(1)
    expect(rot.increment(7)).toBe(2)
    expect(rot.increment(8)).toBe(0)

    expect(rot.decrement(null)).toBe(2)
    expect(rot.decrement(5)).toBe(1)
    expect(rot.decrement(4)).toBe(0)
    expect(rot.decrement(3)).toBe(2)
    expect(rot.decrement(2)).toBe(1)
    expect(rot.decrement(1)).toBe(0)
    expect(rot.decrement(0)).toBe(2)

    expect(() => new IndexRotator(0, 0.1)).toThrow()
    expect(() => new IndexRotator(0.1, 2)).toThrow()
    expect(() => new IndexRotator(2, 1)).toThrow()
  })
})

describe("IndexFolder", () => {
  test("instantiation error", () => {
    expect(() => new IndexFolder(3, 0)).toThrow()
    expect(() => new IndexFolder(3, 1.1)).toThrow()
    expect(() => new IndexFolder(-1, 2)).toThrow()
    // expect(() => new IndexFolder(0, 2)).toThrow()
    expect(() => new IndexFolder(1, 2)).not.toThrow()
  })

  test("increment horizontal", () => {
    const divided = new IndexFolder(3, 3)
    expect(divided.incrementHorizontal(null)).toBe(0)
    expect(divided.incrementHorizontal(0)).toBe(1)
    expect(divided.incrementHorizontal(1)).toBe(2)
    expect(divided.incrementHorizontal(2)).toBe(0)

    const f = new IndexFolder(8, 3)
    expect(f.incrementHorizontal(null)).toBe(0)
    expect(f.incrementHorizontal(0)).toBe(1)
    expect(f.incrementHorizontal(1)).toBe(2)
    expect(f.incrementHorizontal(2)).toBe(0)
    expect(f.incrementHorizontal(3)).toBe(4)
    expect(f.incrementHorizontal(4)).toBe(5)
    expect(f.incrementHorizontal(5)).toBe(3)
    expect(f.incrementHorizontal(6)).toBe(7)
    expect(f.incrementHorizontal(7)).toBe(6)

    const f2 = new IndexFolder(4, 3)
    expect(f2.incrementHorizontal(null)).toBe(0)
    expect(f2.incrementHorizontal(0)).toBe(1)
    expect(f2.incrementHorizontal(1)).toBe(2)
    expect(f2.incrementHorizontal(2)).toBe(0)
    expect(f2.incrementHorizontal(3)).toBe(3)

    const f3 = new IndexFolder(4, 99)
    expect(f3.incrementHorizontal(null)).toBe(0)
    expect(f3.incrementHorizontal(0)).toBe(1)
    expect(f3.incrementHorizontal(1)).toBe(2)
    expect(f3.incrementHorizontal(2)).toBe(3)
    expect(f3.incrementHorizontal(3)).toBe(0)
  })

  test("decrement horizontal", () => {
    const divided = new IndexFolder(3, 3)
    expect(divided.decrementHorizontal(null)).toBe(2)
    expect(divided.decrementHorizontal(2)).toBe(1)
    expect(divided.decrementHorizontal(1)).toBe(0)
    expect(divided.decrementHorizontal(0)).toBe(2)

    const f = new IndexFolder(8, 3)
    expect(f.decrementHorizontal(null)).toBe(7)
    expect(f.decrementHorizontal(7)).toBe(6)
    expect(f.decrementHorizontal(6)).toBe(7)
    expect(f.decrementHorizontal(5)).toBe(4)
    expect(f.decrementHorizontal(4)).toBe(3)
    expect(f.decrementHorizontal(3)).toBe(5)
    expect(f.decrementHorizontal(2)).toBe(1)
    expect(f.decrementHorizontal(1)).toBe(0)
    expect(f.decrementHorizontal(0)).toBe(2)

    const f2 = new IndexFolder(4, 3)
    expect(f2.decrementHorizontal(null)).toBe(3)
    expect(f2.decrementHorizontal(3)).toBe(3)
    expect(f2.decrementHorizontal(2)).toBe(1)
    expect(f2.decrementHorizontal(1)).toBe(0)
    expect(f2.decrementHorizontal(0)).toBe(2)

    const f3 = new IndexFolder(4, 99)
    expect(f3.decrementHorizontal(null)).toBe(3)
    expect(f3.decrementHorizontal(3)).toBe(2)
    expect(f3.decrementHorizontal(2)).toBe(1)
    expect(f3.decrementHorizontal(1)).toBe(0)
    expect(f3.decrementHorizontal(0)).toBe(3)
  })

  test("increment vertical", () => {
    const divided = new IndexFolder(3, 3)
    expect(divided.incrementVertical(null)).toBe(0)
    expect(divided.incrementVertical(0)).toBe(0)
    expect(divided.incrementVertical(1)).toBe(1)
    expect(divided.incrementVertical(2)).toBe(2)

    const f = new IndexFolder(8, 3)
    expect(f.incrementVertical(null)).toBe(0)
    expect(f.incrementVertical(0)).toBe(3)
    expect(f.incrementVertical(1)).toBe(4)
    expect(f.incrementVertical(2)).toBe(5)
    expect(f.incrementVertical(3)).toBe(6)
    expect(f.incrementVertical(4)).toBe(7)
    expect(f.incrementVertical(5)).toBe(2)
    expect(f.incrementVertical(6)).toBe(0)
    expect(f.incrementVertical(7)).toBe(1)

    const f2 = new IndexFolder(4, 3)
    expect(f2.incrementVertical(null)).toBe(0)
    expect(f2.incrementVertical(0)).toBe(3)
    expect(f2.incrementVertical(1)).toBe(1)
    expect(f2.incrementVertical(2)).toBe(2)
    expect(f2.incrementVertical(3)).toBe(0)
  })

  test("decrement vertical", () => {
    const divided = new IndexFolder(3, 3)
    expect(divided.decrementVertical(null)).toBe(2)
    expect(divided.decrementVertical(0)).toBe(0)
    expect(divided.decrementVertical(1)).toBe(1)
    expect(divided.decrementVertical(2)).toBe(2)

    const f = new IndexFolder(8, 3)
    expect(f.decrementVertical(null)).toBe(7)
    expect(f.decrementVertical(0)).toBe(6)
    expect(f.decrementVertical(1)).toBe(7)
    expect(f.decrementVertical(2)).toBe(5)
    expect(f.decrementVertical(3)).toBe(0)
    expect(f.decrementVertical(4)).toBe(1)
    expect(f.decrementVertical(5)).toBe(2)
    expect(f.decrementVertical(6)).toBe(3)
    expect(f.decrementVertical(7)).toBe(4)

    const f2 = new IndexFolder(4, 3)
    expect(f2.decrementVertical(null)).toBe(3)
    expect(f2.decrementVertical(0)).toBe(3)
    expect(f2.decrementVertical(1)).toBe(1)
    expect(f2.decrementVertical(2)).toBe(2)
    expect(f2.decrementVertical(3)).toBe(0)
  })

  test("to edge", () => {
    const f = new IndexFolder(9, 3)
    const center = 4
    expect(f.firstHorizontal(center)).toBe(3)
    expect(f.lastHorizontal(center)).toBe(5)
    expect(f.firstVertical(center)).toBe(1)
    expect(f.lastVertical(center)).toBe(7)
  })
})
