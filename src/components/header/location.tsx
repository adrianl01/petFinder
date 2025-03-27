import React from "react";
import { useRecoilValue } from "recoil";
import { locationCoords } from "../../atoms";
import * as css from "./header.css";

export default function Location() {
  const coords = useRecoilValue(locationCoords);
  return coords ? (
    <div className={css.loc}>Coordenadas Activadas😉📌✔</div>
  ) : (
    <div className={css.loc}>Coordenadas Desactivadas😨📌❌</div>
  );
}
