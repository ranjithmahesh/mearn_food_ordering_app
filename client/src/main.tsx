import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import "./global.css";
import AppRouters from "./AppRouters";
import Auth0PrividerWithNavigate from "./auth/Auth0PrividerWithNavigate";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0PrividerWithNavigate>
          <AppRouters />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0PrividerWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
