import React from "react";
import * as css from "./header.css";
import { useSetRecoilState } from "recoil";
import { atentionCard } from "../../atoms";

export function AtentionCard(dataComp) {
  const setAtentionCard = useSetRecoilState(atentionCard);
  return dataComp.data ? (
    <div id="atentionCard" className={css.atentionCard}>
      <div className={css.atentionCardCont}>
        <p className={css.atentionCardText}>
          You need to log in and/or enable coords location
        </p>
        <button
          className={css.atentionCardButton}
          onClick={() => {
            setAtentionCard(false);
          }}
        >
          Accept
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
}
