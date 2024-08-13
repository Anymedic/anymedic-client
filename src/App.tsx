import React from 'react';
import {BrowserRouter} from "react-router-dom";
import RootRouter from "./RootRouter";
import {GlobalStyle} from "./styles/_reset";
import {Global} from "@emotion/react";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Global styles={GlobalStyle}/>
      <RootRouter/>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
