import React from "react";
import Header from "../../header/header";
import { Outlet } from "react-router-dom";
import Footer from "../../footer/footer";

const LayoutClient = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow z-0">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LayoutClient;
