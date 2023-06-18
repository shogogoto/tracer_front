// onSubmitでeslintのno-misused-promise errorをでなくする
export function wrapAsync<ARGS extends unknown[]>(
  fn: (...args: ARGS) => Promise<unknown>
): (...args: ARGS) => void {
  return (...args) => {
    void fn(...args)
  }
}
