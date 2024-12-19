import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./configurations/theme";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./appRoutes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./configurations/queryClient";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
