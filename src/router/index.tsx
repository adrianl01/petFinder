import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { HomePage } from "../pages/home";
import { SignIn } from "../components/auth/SignIn";
import { SignUp } from "../components/auth/SignUp";
import { CardsPage } from "../pages/cards";
import { LogInPage } from "../pages/login";
import { MyDataPage } from "../pages/my-data/modify-data";
import { MenuPage } from "../pages/my-data/menu";
import { EditRepsPage } from "../pages/edit-report";
import { CreateRepsPage } from "../pages/create-report";
import { PasswordPage } from "../pages/my-data/modify-password";
import { MyRepsPage } from "../pages/my-reports";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cards" element={<CardsPage />} />
        <Route path="log-in" element={<LogInPage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="create-report" element={<CreateRepsPage />} />
        <Route path="edit-report/:repId" element={<EditRepsPage />} />
        <Route path="my-reports" element={<MyRepsPage />} />
        <Route path="my-data/menu" element={<MenuPage />} />
        <Route path="my-data/modify-data" element={<MyDataPage />} />
        <Route path="my-data/modify-password" element={<PasswordPage />} />
      </Route>
    </Routes>
  );
}
