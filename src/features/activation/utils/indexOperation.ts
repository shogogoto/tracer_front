import type { Index, IndexOperation } from "../types"

export type Rotator = {
  min: Index
  max: Index
  increment: IndexOperation
  decrement: IndexOperation
}

function checkInteger(i: Index, msg: string): void {
  if (!Number.isInteger(i)) {
    throw new RangeError(`${msg} must be integer`)
  }
}

export function checkInRange(i: Index, min: number, max: number): void {
  if (i !== null && (i < min || max < i)) {
    throw new RangeError(`${i} is out of [${min}, ${max}]`)
  }
}

class NullIndexRotator implements Rotator {
  min = null
  max = null
  increment: IndexOperation = (i) => null
  decrement: IndexOperation = (i) => null
}

const LARGE_ENOUGH = 10000
export class IndexRotator implements Rotator {
  static create(min: number, max: number): Rotator {
    return min > max ? new NullIndexRotator() : new IndexRotator(min, max)
  }

  private readonly count: number
  public constructor(public readonly min: number, public readonly max: number) {
    if (min > max) {
      throw new RangeError("max must be min or more")
    }
    checkInteger(min, "min")
    checkInteger(max, "max")
    this.count = max + 1
  }

  increment: IndexOperation = (i) => {
    this.checkArg(i)
    if (i === null) {
      return this.min
    } else if (i === this.max) {
      return this.min
    } else {
      return (i + 1 + this.count * LARGE_ENOUGH) % this.count
    }
  }

  decrement: IndexOperation = (i) => {
    this.checkArg(i)
    if (i === null) {
      return this.max
    } else if (i === this.min) {
      return this.max
    } else {
      return (i - 1 + this.count * LARGE_ENOUGH) % this.count
    }
  }

  checkArg(i: Index): void {
    if (i === null) return
    checkInteger(i, "arg")
  }
}

class ModulusGroup {
  constructor(
    private readonly arr: number[],
    private readonly modValue: number
  ) {
    if (modValue === 0) {
      throw new RangeError()
    }
  }

  group(rest: number): number[] {
    checkInRange(rest, 0, this.modValue)
    return this.arr.filter((v) => v % this.modValue === rest)
  }

  index(value: number): number {
    const rest = value % this.modValue
    return this.group(rest).findIndex((v) => v === value)
  }

  indexRotator(value: number): [Index, Rotator] {
    const rest = value % this.modValue
    const group = this.group(rest)
    return [this.index(value), IndexRotator.create(0, group.length - 1)]
  }
}

export class IndexFolder {
  private readonly wholeRot: Rotator
  private readonly max: number
  private readonly modG: ModulusGroup
  constructor(
    private readonly count: number,
    private readonly foldSize: number
  ) {
    this.max = count - 1
    this.wholeRot = IndexRotator.create(0, this.max)
    if (foldSize < 1 || !Number.isInteger(foldSize)) {
      throw new RangeError("foldSize must be Positive Integer")
    }

    const arr = [...Array(count)].map((_, i) => i)
    this.modG = new ModulusGroup(arr, foldSize)
  }

  incrementHorizontal: IndexOperation = (i) => {
    if (i === null) {
      return this.wholeRot.increment(i)
    }
    return this.foldedRotator(i).increment(i)
  }

  decrementHorizontal: IndexOperation = (i) => {
    if (i === null) {
      return this.wholeRot.decrement(i)
    }
    return this.foldedRotator(i).decrement(i)
  }

  incrementVertical: IndexOperation = (i) => {
    if (i === null) {
      return this.wholeRot.increment(i)
    }
    const [gIdx, rot] = this.modG.indexRotator(i)
    const g = this.modG.group(i % this.foldSize)
    const inc = rot.increment(gIdx)
    return inc === null ? null : g[inc]
  }

  decrementVertical: IndexOperation = (i) => {
    if (i === null) {
      return this.wholeRot.decrement(i)
    }
    const [gIdx, rot] = this.modG.indexRotator(i)
    const g = this.modG.group(i % this.foldSize)
    const dec = rot.decrement(gIdx)
    return dec === null ? null : g[dec]
  }

  firstHorizontal: IndexOperation = (i) => {
    if (i === null) {
      return this.wholeRot.increment(i)
    }
    return this.foldedRotator(i).min
  }

  lastHorizontal: IndexOperation = (i) => {
    if (i === null) {
      return this.wholeRot.increment(i)
    }
    return this.foldedRotator(i).max
  }

  firstVertical: IndexOperation = (i) => {
    if (i === null) {
      return this.wholeRot.increment(i)
    }
    return this.modG.group(i % this.foldSize)[0]
  }

  lastVertical: IndexOperation = (i) => {
    if (i === null) {
      return this.wholeRot.increment(i)
    }
    return this.modG.group(i % this.foldSize).slice(-1)[0]
  }

  private foldedRotator(n: number): Rotator {
    const c = Math.floor(n / this.foldSize)
    const s = this.foldSize
    const min = s * c
    const max = s * (c + 1) - 1
    return IndexRotator.create(min, Math.min(max, this.max))
  }
}
