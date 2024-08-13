import React from 'react';
import {Outlet} from "react-router-dom";
import './Layout.scss';
import Header from "./Header";

const Layout = () => {
  return (
    <div className={'layout'}>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
