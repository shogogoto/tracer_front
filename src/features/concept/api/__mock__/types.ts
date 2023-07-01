import type { ResponseResolver, RestRequest, restContext } from "msw"


export type MockResolver = ResponseResolver<RestRequest, typeof restContext>
