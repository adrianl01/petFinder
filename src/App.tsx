import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./router";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import * as css from "./style.css";

export const MyContext = React.createContext({ username: "" });
function App() {
  return (
    <RecoilRoot>
      <Suspense
        fallback={
          <div className={css.fallback}>
            <div className={css.fallbackCont}>Cargando...</div>
          </div>
        }
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
