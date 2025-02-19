import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { SearchForm } from "./SearchForm";
import { Header } from "./header/Header";
import { ReportCard } from "./reportCard";
import { SignUp } from "./auth/SignUp";
import { Menu } from "./profile/Menu";
import { MyData } from "./profile/MyData";
import { Password } from "./profile/Password";
import { EditReport } from "./reports/edit";
import { MyReps } from "./reports/myReps";
import { NoReps } from "./reports/NoReps";

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
}
