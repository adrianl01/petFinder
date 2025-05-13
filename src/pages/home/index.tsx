import React from "react";
import * as css from "./index.css";
import { ReportCard } from "../../components/reportCard";
import { getUserLocLS } from "../../hooks";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const nav = useNavigate();
  const curretLocation = getUserLocLS();
  const locationHandler = (e) => {
    e.preventDefault();
    const success = (position) => {
      const location = [position.coords.longitude, position.coords.latitude];
      const strngLoc = JSON.stringify(location);
      localStorage.setItem("userLocation", strngLoc);
      window.location.assign("/");
    };
    navigator.geolocation.getCurrentPosition(success);
  };
  if (curretLocation == null) {
    return (
      <div className={css.main}>
        <img src="/imgs/home.png" className={css.homeImg} />
        <div>
          <h2 className={css.homeTitle}>Pet Finder App</h2>
          <h4 className={css.homeTitle2}>
            Find and report lost pets in your area
          </h4>
        </div>
        <div className={css.homeContainer}>
          <button onClick={locationHandler} className={css.locationButton}>
            Enable current location
          </button>

          {/* <button className={css.infoButton}>¿Cómo funciona Pet Finder?</button> */}
        </div>
      </div>
    );
  } else if (curretLocation) {
    return <ReportCard />;
  }
}
