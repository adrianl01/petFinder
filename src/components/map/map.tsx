import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as css from "./App.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { locationCoords, longLatReport } from "../../atoms";

const INITIAL_CENTER = [-74.0242, 40.6941];
const INITIAL_ZOOM = 10.12;

export default function NewMapApp(prop) {
  let markAdded = false;
  const mapContainerRef = useRef();
  const mapRef = useRef() as any;
  const setLongLat = useSetRecoilState(longLatReport);

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const coords = useRecoilValue(locationCoords);
  var allMarkers = [] as any;
  useEffect(() => {
    console.log("useEffect");
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWRyaWFubGVpdmExIiwiYSI6ImNsdW5qOTBmYzFubmMydm8xNzd1aGM0MzUifQ.XKlAT89VnNSAFVho6Ztetw";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: coords || (center as any),
      zoom: zoom,
    });
    mapRef.current.on("move", () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });
    mapRef.current.on("click", (e) => {
      if (allMarkers.length > 0) {
        for (let i = 0; i < allMarkers.length; i++) {
          allMarkers[i].remove();
        }
      }
      const coord = [e.lngLat.lng, e.lngLat.lat];
      const newMarker = new mapboxgl.Marker()
        .setLngLat(coord as any)
        .addTo(mapRef.current);
      allMarkers.push(newMarker);
      const strgCoord = JSON.stringify(coord);
      localStorage.setItem("coords", strgCoord);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);
  function DeleteMarkerButton() {
    return (
      <button
        onClick={() => {
          for (let i = 0; i < allMarkers.length; i++) {
            allMarkers[i].remove();
          }
        }}
      >
        Borrar Marcador
      </button>
    );
  }
  return (
    <div>
      <div
        className={css.mapContainer}
        id="map-container"
        ref={mapContainerRef}
      />
      {markAdded ? <DeleteMarkerButton /> : <></>}
    </div>
  );
}
