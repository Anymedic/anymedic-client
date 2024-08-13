import React from 'react';
import {BrowserRouter} from "react-router-dom";
import RootRouter from "./RootRouter";
import {GlobalStyle} from "./styles/_reset";
import {Global} from "@emotion/react";

function App() {
  return (
    <BrowserRouter>
      <Global styles={GlobalStyle}/>
      <RootRouter/>
    </BrowserRouter>
  );
}

export default App;
