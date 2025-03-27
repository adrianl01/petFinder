import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
}
