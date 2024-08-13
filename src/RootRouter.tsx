import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Talk from "./pages/Talk";
import Medicine from "./pages/Medicine";
import ManageDetail from "./pages/ManageDetail";
import My from "./pages/My";

const RootRouter = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index path={"/"} element={<Home/>}/>
        <Route index path={"/manage/:id"} element={<ManageDetail/>}/>
        <Route index path={"/talk"} element={<Talk/>}/>
        <Route index path={"/medicine"} element={<Medicine/>}/>
        <Route index path={"/my"} element={<My/>}/>
      </Route>
    </Routes>
  );
};

export default RootRouter;
