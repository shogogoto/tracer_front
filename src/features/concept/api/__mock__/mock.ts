import {
  type ResponseResolver,
  type MockedRequest,
  type restContext,
} from "msw"

type MockResolver = ResponseResolver<MockedRequest, typeof restContext>

export const get: MockResolver = async (req, res, ctx) => {
  return await res(
    ctx.status(200),
    ctx.json([
      {
        id: 1,
        name: "John",
      },
      {
        id: 2,
        name: "Alice",
      },
      {
        id: 3,
        name: "Bob",
      },
    ])
  )
}

// const stats = ()

export const getByName: MockResolver = async (req, res, ctx) => {
  const byName = req.url.searchParams.get("name")
  if (byName === "test") {
    return await res(
      ctx.status(200),
      ctx.json([
        {
          item: {
            name: "test1",
            description: "root",
            uid: "xxx",
          },
          statistics: {
            upper_neighber_count: 0,
            lower_neigber_count: 1,
            all_upper_count: 0,
            all_lower_count: 1,
            max_distance_from_roots: 0,
            max_distance_from_leaves: 1,
          },
        },
        {
          item: {
            name: "test2",
            description: "depends only root",
            uid: "xxx",
          },
          statistics: {
            upper_neighber_count: 1,
            lower_neigber_count: 0,
            all_upper_count: 1,
            all_lower_count: 0,
            max_distance_from_roots: 1,
            max_distance_from_leaves: 0,
          },
        },
      ])
    )
  } else {
    return await res(ctx.status(200), ctx.json([]))
  }
}

export default get
