import React from "react";
import { getEmailLS } from "../../hooks";
import { useNavigate } from "react-router-dom";

export function EmailButton(props) {
  const emailHook = getEmailLS();
  const navigate = useNavigate();

  const handleClickLogIn = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    headerMenu.style.display = "none";
    navigate("/sign-in", { replace: true });
    console.log("signIn");
  };
  const handleClickSignUp = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    headerMenu.style.display = "none";
    navigate("/sign-up", { replace: true });
    console.log("signUp");
  };
  const handleClickLogOut = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    headerMenu.style.display = "none";
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  if (emailHook == null) {
    return (
      <div className={props.headerMenuBottom}>
        <div className={props.headerMenuEmail}></div>
        <button
          type="button"
          className={props.headerMenuCancelButton}
          onClick={handleClickLogIn}
        >
          LOG IN
        </button>
        <button
          type="button"
          className={props.headerMenuCancelButton}
          onClick={handleClickSignUp}
        >
          REGISTER
        </button>
      </div>
    );
  } else if (emailHook !== null) {
    const userEmail = emailHook;
    return (
      <div className={props.headerMenuBottom}>
        <div className={props.headerMenuEmail}>{userEmail}</div>
        <button
          type="button"
          className={props.headerMenuCancelButton}
          onClick={handleClickLogOut}
        >
          CERRAR SESIÓN
        </button>
      </div>
    );
  }
}
