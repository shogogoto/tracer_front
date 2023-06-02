import type { Index } from "../types"

type Rotator = {
  increment: (i: Index) => Index
  decrement: (i: Index) => Index
}

export class NullIndexRotator implements Rotator {
  increment = (i: Index): Index => null
  decrement = (i: Index): Index => null
}

function checkInteger(i: Index, msg: string): void {
  if (!Number.isInteger(i)) {
    throw new RangeError(`${msg} must be integer`)
  }
}

const LARGE_ENOUGH = 10000
export class IndexRotator implements Rotator {
  static create(min: number, max: number): Rotator {
    return min > max ? new NullIndexRotator() : new IndexRotator(min, max)
  }

  private readonly count: number
  private constructor(
    private readonly min: number,
    private readonly max: number
  ) {
    if (min > max) {
      throw new RangeError("max must be min or more")
    }
    checkInteger(min, "min")
    checkInteger(max, "max")
    this.count = max + 1
  }

  increment(i: Index): Index {
    this.checkArg(i)
    if (i === null) {
      return this.min
    } else if (i === this.max) {
      return this.min
    } else {
      return (i + 1 + this.count * LARGE_ENOUGH) % this.count
    }
  }

  decrement(i: Index): Index {
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

  incrementHorizontal(i: Index): Index {
    if (i === null) {
      return this.wholeRot.increment(i)
    }
    return this.foldedRotator(i).increment(i)
  }

  decrementHorizontal(i: Index): Index {
    if (i === null) {
      return this.wholeRot.decrement(i)
    }
    return this.foldedRotator(i).decrement(i)
  }

  incrementVertical(i: Index): Index {
    if (i === null) {
      return this.wholeRot.increment(i)
    }
    const [gIdx, rot] = this.modG.indexRotator(i)
    const g = this.modG.group(i % this.foldSize)
    const inc = rot.increment(gIdx)
    return inc === null ? null : g[inc]
  }

  decrementVertical(i: Index): Index {
    if (i === null) {
      return this.wholeRot.decrement(i)
    }
    const [gIdx, rot] = this.modG.indexRotator(i)
    const g = this.modG.group(i % this.foldSize)
    const dec = rot.decrement(gIdx)
    return dec === null ? null : g[dec]
  }

  private foldedRotator(n: number): Rotator {
    const c = Math.floor(n / this.foldSize)
    const s = this.foldSize
    const min = s * c
    const max = s * (c + 1) - 1
    return IndexRotator.create(min, Math.min(max, this.max))
  }
}
