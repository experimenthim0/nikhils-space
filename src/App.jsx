import { useState,useEffect, use } from "react";
import {BrowserRouter,Route , Routes,Router} from "react-router-dom"
import "./App.css";
import "./index.css";
import React from "react";


import Home from "./pages/Home.jsx";
import Supportme from "./pages/Supportme.jsx";





function App() {

  


  return (
    <>

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/supportme" element={<Supportme/>} />

</Routes>


    </>
  );
}

export default App;
