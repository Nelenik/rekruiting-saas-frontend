'use client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  // Instead do this, which ensures each request has its own cache:
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>

      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider;