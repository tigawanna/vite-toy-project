
import "./App.css";
import { AppWrapper } from "./components/root/AppWrapper";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


function App() {

  
  const appQueryClient: QueryClient = new QueryClient({
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


  return (
    <div className="bg-primary min-h-screen">
      <QueryClientProvider client={appQueryClient}>
  <AppWrapper>
  <div className="h-screen overflow-y-scroll  w-full flex items-center justify-center bg-red-900 text-9xl font-bold ">
  Main content
  </div>
    </AppWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>


  );
}

export default App;
