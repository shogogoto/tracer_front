import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import type { ReactNode, ReactElement } from "react"



type Props = {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // turns retries off
    },
  },
})

export const wrapper = (props: Props): ReactElement => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
)
