import { useState,useEffect, use } from "react";
import {Route , Routes,Router} from "react-router-dom"
import "./App.css";
import "./index.css";
import React from "react";

import Aniverse from "./pages/Aniverse.jsx";
import Home from "./pages/Home.jsx";



function App() {

  


  return (
    <>

    

<Routes>
       <Route path="/" element={<Home />}></Route>
         <Route path="/aniverse" element={<Aniverse />}/>

      </Routes>
    </>
  );
}

export default App;
