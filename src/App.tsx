import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Main } from "./pages/Main";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Main />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
