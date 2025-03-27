import React, { useState } from "react";
import * as css from "./header.css";
import { useSetRecoilState } from "recoil";
import { atentionCard } from "../../atoms";

export function AtentionCard(dataComp) {
  const setAtentionCard = useSetRecoilState(atentionCard);
  return dataComp.data ? (
    <div id="atentionCard" className={css.atentionCard}>
      <div className={css.atentionCardCont}>
        <p className={css.atentionCardText}>
          Necesitas iniciar sesión y/o dar tu ubicación actual para realizar
          esta acción
        </p>
        <button
          className={css.atentionCardButton}
          onClick={() => {
            setAtentionCard(false);
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
}
