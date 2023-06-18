import "@testing-library/jest-dom"
// ↓ expectのtoBeInTheDocumentの型推論を有効にする
import "@testing-library/jest-dom/extend-expect"
import matchers from "@testing-library/jest-dom/matchers"
import { expect } from "vitest"

expect.extend(matchers)

// jsdomでは以下のメソッドが実装されていないらしいのでmock
window.HTMLElement.prototype.scrollIntoView = function () {}

import { server } from "./.storybook/server"
import { setLogger } from "react-query"

beforeAll(() => {
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
  })
  server.listen({ onUnhandledRequest: "error" })
})
afterEach(() => {
  server.resetHandlers()
  setLogger(console)
})
afterAll(() => server.close())
