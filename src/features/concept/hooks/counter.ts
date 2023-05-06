import { useState, useCallback } from "react"

type UseCounterReturnType = {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounter = (): UseCounterReturnType => {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    setCount((prev) => prev + 1)
  }, [])
  const decrement = useCallback(() => {
    setCount((prev) => prev - 1)
  }, [])

  return {
    count,
    increment,
    decrement,
  }
}
