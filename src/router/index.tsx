import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { HomePage } from "../app/home";
import { SignIn } from "../components/auth/SignIn";
import { SignUp } from "../components/auth/SignUp";
import { CardsPage } from "../app/cards";
import { MyDataPage } from "../app/my-data/modify-data";
import { MenuPage } from "../app/my-data/menu";
import { EditRepsPage } from "../app/edit-report";
import { CreateRepsPage } from "../app/create-report";
import { PasswordPage } from "../app/my-data/modify-password";
import { MyRepsPage } from "../app/my-reports";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cards" element={<CardsPage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="create-report" element={<CreateRepsPage />} />
        <Route path="edit-report/:repId" element={<EditRepsPage />} />
        <Route path="my-reports" element={<MyRepsPage />} />
        <Route path="my-data/">
          <Route path="menu" element={<MenuPage />} />
          <Route path="modify-data" element={<MyDataPage />} />
          <Route path="my-data/modify-password" element={<PasswordPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
