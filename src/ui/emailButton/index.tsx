import React from "react";
import { logInCheck } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userEmail } from "../../atoms";

export function EmailButton(props) {
  const emailHooks = logInCheck();
  const setEmailState = useSetRecoilState(userEmail);
  console.log("compEmailHook:", emailHooks);
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
    setEmailState(null);
  };
  if (emailHooks == null) {
    return (
      <div className={props.headerMenuBottom}>
        <div className={props.headerMenuEmail}></div>
        <button
          type="button"
          className={props.headerMenuCancelButton}
          onClick={handleClickLogIn}
        >
          INICIAR SESIÓN
        </button>
        <button
          type="button"
          className={props.headerMenuCancelButton}
          onClick={handleClickSignUp}
        >
          REGISTRARSE
        </button>
      </div>
    );
  } else if (emailHooks !== null) {
    const userEmail = emailHooks[1].email;
    console.log(userEmail);
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
