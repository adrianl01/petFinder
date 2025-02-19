import React from "react";
import * as css from "./index.css";

export function SearchInput(props) {
  console.log("prop:", props);
  return <input name={props.name} className={css.root} />;
}
