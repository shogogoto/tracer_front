type JaggedArray2D<T> = {
  value: T[][]
  quotient: number
  surplus: number
}

export const reshapeJagged2D = <T>(
  arr: T[],
  size: number
): JaggedArray2D<T> => {
  if (size <= 0) throw new RangeError("size must be natural number")
  const n = arr.length
  if (n === 0)
    return {
      value: [],
      quotient: 0,
      surplus: 0,
    }
  if (size > n) throw new RangeError("size must be less than array length")

  const q = Math.floor(n / size)
  const ret = [...Array(q)].map((_, i) => arr.slice(size * i, size * (i + 1)))

  // 残りを格納(jaggな部分)
  const surplus = n % size
  if (surplus !== 0) {
    const start = q * size
    ret.push(arr.slice(start, start + surplus))
  }
  return {
    value: ret,
    quotient: q,
    surplus,
  }
}
