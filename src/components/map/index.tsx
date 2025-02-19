import { PositionOptions } from "mapbox-gl";
import * as React from "react";
import Map, { Marker } from "react-map-gl";
import { useSetRecoilState } from "recoil";
import { langLatReport } from "../../atoms";
export function MapApp(prop) {
  const res = prop.coords();
  const data = prop.newLoc;
  var loc = res;
  if (data) {
    loc = data;
  }
  const handler = (e) => {
    console.log(e.lngLat);
    const setLangLat = useSetRecoilState(langLatReport);
    setLangLat(e.lngLat);
  };
  return (
    <div className={prop.class}>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYWRyaWFubGVpdmExIiwiYSI6ImNsdW5qOTBmYzFubmMydm8xNzd1aGM0MzUifQ.XKlAT89VnNSAFVho6Ztetw"
        initialViewState={{
          longitude: loc.longitude,
          latitude: loc.latitude,
          zoom: 12,
        }}
        onClick={handler}
        touchZoomRotate={true}
        longitude={loc.longitude}
        latitude={loc.latitude}
        style={{ width: 340.3, height: 205 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={loc.longitude}
          latitude={loc.latitude}
          anchor="bottom"
        >
          <img src="../../../imgs/pin.webp" />
        </Marker>
      </Map>
    </div>
  );
}
