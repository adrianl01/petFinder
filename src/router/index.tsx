import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../pages/home";
import { LogIn } from "../components/auth/LogIn";
import { CreateReport } from "../components/reports/create";
import { EditReport } from "../components/reports/edit";
import { MyReps } from "../components/reports/myReps";
import { Menu } from "../components/profile/Menu";
import { MyData } from "../components/profile/MyData";
import { Password } from "../components/profile/Password";
import { SignIn } from "../components/auth/SignIn";
import { SignUp } from "../components/auth/SignUp";
import { Cards } from "../pages/cards";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cards" element={<Cards />} />
        <Route path="log-in" element={<LogIn />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="create-report" element={<CreateReport />} />
        <Route path="edit-report" element={<EditReport />} />
        <Route path="my-reports" element={<MyReps />} />
        <Route path="my-data/menu" element={<Menu />} />
        <Route path="my-data/modify-data" element={<MyData />} />
        <Route path="my-data/modify-password" element={<Password />} />
      </Route>
    </Routes>
  );
}
