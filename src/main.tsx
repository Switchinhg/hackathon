import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.render(
  <StrictMode>
    <ConvexProvider client={convex}>
        <Router>
          <Header/>

          <Routes>
            <Route path="/app" element={<App />}/>
          </Routes>
        </Router>
    </ConvexProvider>
  </StrictMode>,
  document.getElementById("root")
);
