import * as React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./Components/App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <CssBaseline />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
