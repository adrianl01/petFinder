import React, { useEffect } from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getToken, userEmail, userPassword } from "../../../atoms";
import { useForm } from "react-hook-form";

export function SignIn() {
  const navigate = useNavigate();
  const setEmailState = useSetRecoilState(userEmail);
  const setPasswordState = useSetRecoilState(userPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = async (data) => {
    console.log(data);
    setEmailState({ email: data.email });
    setPasswordState({ password: data.password });
    await getToken(data);
    localStorage.setItem("email", data.email);
    navigate("/", { replace: true });
  };
  return (
    <div className={css.mainContainer}>
      <div className={css.main}>
        <h2 className={css.title}>Log In</h2>
        <h4 className={css.title2}>Fill in the next data to log in</h4>
        <form className={css.form} onSubmit={handleSubmit(handlerSubmit)}>
          <fieldset className={css.textfield}>
            <label className={css.formEmailLabel}>
              EMAIL
              <input
                type="email"
                className={css.email}
                {...register("email", { required: true })}
                id="email"
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </label>
            <label className={css.formEmailLabel}>
              PASSWORD
              <input
                type="password"
                className={css.password}
                {...register("password", { required: true })}
                id="password"
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </label>
          </fieldset>
          <button type="submit" className={css.formButton}>
            Log In
          </button>
        </form>
        <div className={css.forgotContainer}>
          <button
            className={css.forgotContainerButton}
            onClick={() => {
              navigate("/my-data/modify-password", { replace: true });
            }}
          >
            I forgot my password
          </button>
        </div>
      </div>
    </div>
  );
}
