import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as css from "./App.css";
import { useSetRecoilState } from "recoil";
import { longLatReport } from "../../atoms";
import { getUserLocLS } from "../../hooks";

const INITIAL_CENTER = [-74.0242, 40.6941];
const INITIAL_ZOOM = 10.12;

export default function NewMapApp(prop) {
  const setLoc = useSetRecoilState(longLatReport);
  const mapContainerRef = useRef();
  const mapRef = useRef() as any;

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const locCoords = getUserLocLS();
  var allMarkers = [] as any;
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWRyaWFubGVpdmExIiwiYSI6ImNsdW5qOTBmYzFubmMydm8xNzd1aGM0MzUifQ.XKlAT89VnNSAFVho6Ztetw";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: locCoords || (center as any),
      zoom: zoom,
    });
    mapRef.current.on("move", () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });
    if (prop.coords) {
      const coord = [prop.coords.lng, prop.coords.lat];
      setCenter(coord);
      const newMarker = new mapboxgl.Marker()
        .setLngLat(coord as any)
        .addTo(mapRef.current);
      allMarkers.push(newMarker);
    }
    mapRef.current.on("click", (e) => {
      console.log(e.lngLat);
      const loc = { long: e.lngLat.lng, lat: e.lngLat.lat };
      setLoc(loc);
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
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div>
      <div
        className={css.mapContainer}
        id="map-container"
        ref={mapContainerRef}
      />
    </div>
  );
}
