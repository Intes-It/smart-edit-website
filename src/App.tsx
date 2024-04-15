import { MantineProvider } from "@mantine/core";
import Router from "./Router";
import { ContextProvider } from "./contexts/contextProvider";
function App() {
  return (
    <MantineProvider>
      <ContextProvider>
        <Router />
      </ContextProvider>
    </MantineProvider>
  );
}

export default App;
