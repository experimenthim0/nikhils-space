import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./index.css";

import Home from "./pages/Home.jsx";
import AutographLoader from "./components/AutographLoader.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <AutographLoader onComplete={() => setIsLoading(false)} />
      )}
      <Routes>
        <Route path="/" element={<Home onReplayIntro={() => setIsLoading(true)} />} />
      </Routes>
    </>
  );
}

export default App;

