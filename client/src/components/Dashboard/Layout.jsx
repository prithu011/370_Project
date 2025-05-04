import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Page content below the navbar */}
      <main className=" px-2">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
