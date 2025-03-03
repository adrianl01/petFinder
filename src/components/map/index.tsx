import * as React from "react";
import Map, { Marker } from "react-map-gl";
import { useSetRecoilState } from "recoil";
import { longLatReport } from "../../atoms";

export function MapApp(prop) {
  const setLongLat = useSetRecoilState(longLatReport);
  const res = prop.coords();
  const data = prop.newLoc;
  var loc = res;
  if (data) {
    loc = data;
  }
  const handler = (e) => {
    console.log(e.lngLat);
    setLongLat(e.lngLat);
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
        scrollZoom={true}
        interactive={true}
        longitude={loc.longitude}
        latitude={loc.latitude}
        style={{ width: 340.3, height: 205 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={loc.longitude}
          latitude={loc.latitude}
          anchor="center"
          scale={1}
        >
          <img src="../../../imgs/pin.webp" />
        </Marker>
      </Map>
    </div>
  );
}
