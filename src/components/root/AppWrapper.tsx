"use client";


import { Sidebar } from "./navigation/Sidebar";
import { Toolbar } from "./navigation/Toolbar";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Theme } from "./types";

import { MutationCache, QueryClient } from "@tanstack/react-query";

export const appQueryClient: QueryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (data, variable, context, mutation) => {
      if (Array.isArray(mutation.meta?.invalidates)) {
        return appQueryClient.invalidateQueries({
          queryKey: mutation.meta?.invalidates,
        });
      }
    },
  }),

  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});



interface AppWrapperProps {
  children: React.ReactNode;

  theme?:Theme;
}

export function AppWrapper({ children, theme }: AppWrapperProps) {


  // console.log("document.cookie  ==== ",document.cookie)
  return (

    <QueryClientProvider client={appQueryClient}>
        <div className="w-full h-screen flex flex-col md:flex-row  items-center justify-center">

          <div className="w-full md:hidden h-14 flex items-center justify-start bg-secondary">
            <Toolbar />
          </div>
          <div className="md:w-[250px] hidden h-full md:flex flex-col items-center justify-center bg-secondary">
            <Sidebar theme={theme}/>
          </div>
          <div className="w-full h-screen overflow-y-scroll scroll-bar">{children}</div>
          <div className="w-full fixed bottom-3 flex items-center justify-center">
           
          </div>
        </div>
    </QueryClientProvider>

   
  );
}
