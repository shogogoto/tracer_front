import "@testing-library/jest-dom"
// ↓ expectのtoBeInTheDocumentの型推論を有効にする
import "@testing-library/jest-dom/extend-expect"
import matchers from "@testing-library/jest-dom/matchers"
import { expect } from "vitest"

expect.extend(matchers)

// jsdomでは以下のメソッドが実装されていないらしいのでmock
window.HTMLElement.prototype.scrollIntoView = function () {}

import { server } from "./src/__mock__/"

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
