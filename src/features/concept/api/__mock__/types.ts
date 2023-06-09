import type { ResponseResolver, MockedRequest, restContext } from "msw"

export type MockResolver = ResponseResolver<MockedRequest, typeof restContext>
