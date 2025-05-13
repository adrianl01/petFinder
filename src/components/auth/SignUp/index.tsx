import React, { useEffect } from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
import { createUser, getToken } from "../../../atoms";
import { useForm } from "react-hook-form";

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = async (data) => {
    localStorage.setItem("email", data.email);
    await createUser(data);
    await getToken(data);
    navigate("/", { replace: true });
  };
  return (
    <div className={css.mainContainer}>
      <div className={css.main}>
        <h2 className={css.title}>Sign Up</h2>
        <h4 className={css.title2}>
          Fill in the next data to create an account
        </h4>
        <form className={css.form} onSubmit={handleSubmit(handlerSubmit)}>
          <fieldset className={css.textfield}>
            <label className={css.formEmailLabel}>
              NAME
              <input
                type="text"
                className={css.email}
                {...register("fullName", { required: true })}
                id="fullName"
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </label>
            <label className={css.formEmailLabel}>
              PLACE
              <input
                type="text"
                className={css.email}
                {...register("location", { required: true })}
                id="location"
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </label>
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
            Create account{" "}
          </button>
        </form>
        <div className={css.forgotContainer}>
          {/* <button
            className={css.forgotContainerButton}
            onClick={() => {
              navigate("/my-data/modify-password", { replace: true });
            }}
          >
            Forgot my password
          </button> */}
        </div>
      </div>
    </div>
  );
}
