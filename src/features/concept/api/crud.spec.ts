import { useConceptsByName } from "./read"

import { wrapper } from "@/features/test"
import { renderHook, waitFor } from "@testing-library/react"
import { act } from "@testing-library/react"
import { useCreateConcept, create } from "./create"
import { ConceptProps } from "../types"
import { useUpdateConcept } from "./update"

describe("concept api", () => {
  test("read_success", async () => {
    const { result } = renderHook(() => useConceptsByName("3"), { wrapper })
    await waitFor(() => expect(result.current.isLoading).toBe(true))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current?.data?.length).toBe(3)
  })

  test("read_fail", async () => {
    const { result } = renderHook(() => useConceptsByName("fail"), { wrapper })
    await waitFor(() => expect(result.current.isLoading).toBe(true))
    await waitFor(() => expect(result.current.isSuccess).toBe(false))
  })

  test("create", async () => {
    const { result } = renderHook(() => useCreateConcept(), { wrapper })
    await waitFor(() =>
      result.current.mutate({
        name: "any",
        description: "",
      })
    )
    await waitFor(() => expect(result.current.isPending).toBe(false))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.data?.status).toBe(201))

    await waitFor(() =>
      result.current.mutate({
        name: "fail",
        description: "",
      })
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(false))
    await waitFor(() =>
      expect(result.current.error?.response?.status).toBe(500)
    )
  })

  test("update", async () => {
    const { result } = renderHook(() => useUpdateConcept(), { wrapper })

    await waitFor(() =>
      result.current.mutate({
        name: "any",
        description: "",
        uid: "9cdf8d73411747179d7e392995b473c1",
      })
    )
    await waitFor(() => expect(result.current.isPending).toBe(false))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.data?.status).toBe(204))

    await waitFor(() =>
      result.current.mutate({
        name: "fail",
        description: "",
        uid: "9cdf8d73411747179d7e392995b473c1",
      })
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(false))
    await waitFor(() =>
      expect(result.current.error?.response?.status).toBe(500)
    )
  })

  test("delete", async () => {
    const { result } = renderHook(() => useUpdateConcept(), { wrapper })

    await waitFor(() =>
      result.current.mutate({
        name: "any",
        description: "",
        uid: "9cdf8d73411747179d7e392995b473c1",
      })
    )
    await waitFor(() => expect(result.current.isPending).toBe(false))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.data?.status).toBe(204))

    await waitFor(() =>
      result.current.mutate({
        name: "fail",
        description: "",
        uid: "9cdf8d73411747179d7e392995b473c1",
      })
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(false))
    await waitFor(() =>
      expect(result.current.error?.response?.status).toBe(500)
    )
  })
})
