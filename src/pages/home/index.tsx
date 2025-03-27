import React from "react";
import { locationCoords } from "../../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as css from "./index.css";
import { ReportCard } from "../../components/reportCard";

export function HomePage() {
  const curretLocation = useRecoilValue(locationCoords);
  const setLocation = useSetRecoilState(locationCoords);
  const locationHandler = (e) => {
    e.preventDefault();
    const success = (position) => {
      const location = [position.coords.longitude, position.coords.latitude];
      setLocation(location);
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
            Encontrá y reportá mascotas perdidas cerca de tu ubicación
          </h4>
        </div>
        <div className={css.homeContainer}>
          <button onClick={locationHandler} className={css.locationButton}>
            Dar mi ubicación actual
          </button>

          {/* <button className={css.infoButton}>¿Cómo funciona Pet Finder?</button> */}
        </div>
      </div>
    );
  } else if (curretLocation) {
    return <ReportCard />;
  }
}
