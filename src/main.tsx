import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Header from "./components/Header";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import Application from "./components/Application";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.render(
  <StrictMode>
    <ConvexProvider client={convex}>
        <Router>
          <Header/>

          <Routes>
            <Route path="/" element={<Index />}/>
            <Route path="/app" element={<Application />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </Router>
    </ConvexProvider>
  </StrictMode>,
  document.getElementById("root")
);
