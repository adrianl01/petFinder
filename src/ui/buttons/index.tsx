import React from "react";
import * as css from "./index.css";
console.log("css:", css);

export function MainButton({ children }) {
  return (
    <button type="submit" className={css.root}>
      {children}
    </button>
  );
}
