import "@testing-library/jest-dom"
// ↓ expectのtoBeInTheDocumentの型エラーを出なくする
import "@testing-library/jest-dom/extend-expect"
import matchers from "@testing-library/jest-dom/matchers"
import { expect } from "vitest"

expect.extend(matchers)

// import { server } from "./server";

// beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
