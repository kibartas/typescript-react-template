import React, { StrictMode } from "react";

import { Router } from "@reach/router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App: React.FC = () => (
  <StrictMode>
    <Router>
      <Home path="/" />
      <NotFound default />
    </Router>
  </StrictMode>
);

export default App;
