import userEvent from "@testing-library/user-event"
import React from "react"
import { render } from "@testing-library/react"
import SearchBar from "./SearchBar"
import { placeHolder } from "./SearchNameInput"
import { wrapper } from "@/features/test"

describe("SearchBar", () => {
  test("validation", async () => {
    const user = userEvent.setup()
    const x = render(<SearchBar />, { wrapper })
    const s = x.getByPlaceholderText(placeHolder)

    const errorMsg = "String must contain at least 1 character(s)"
    expect(x.queryByText(errorMsg)).not.toBeInTheDocument()

    // 文字入力なしでinvalid
    await user.click(s)
    await user.keyboard("{Enter}")
    expect(x.queryByText(errorMsg)).toBeInTheDocument()

    // 文字入力したらvalid
    await user.keyboard("any")
    expect(x.queryByText(errorMsg)).not.toBeInTheDocument()
    await user.keyboard("{Enter}")

    // 検索文字列をクリアしたら再びinvalid
    await user.keyboard("{BackSpace>3}")
    expect(x.queryByText(errorMsg)).toBeInTheDocument()

    await user.keyboard("{BackSpace>5}")
    await user.keyboard("fail")
    await user.keyboard("{Enter}")
  })
})
