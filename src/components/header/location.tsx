import React from "react";
import * as css from "./header.css";
import { getUserLocLS } from "../../hooks";

export default function Location() {
  const coords = getUserLocLS();
  return coords ? (
    <div className={css.loc}>Coordenadas Activadas😉📌✔</div>
  ) : (
    <div className={css.loc}>Coordenadas Desactivadas😨📌❌</div>
  );
}
