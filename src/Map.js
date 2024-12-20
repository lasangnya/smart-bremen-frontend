import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-boundary-canvas";
import "leaflet.snogylop";
import "leaflet-vector-tile-layer";
import "leaflet.vectorgrid";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const MaskLayer = ({ geojsonUrl }) => {
  const map = useMap();
  // var map = L.map('map').setView([55.7, 38], 7),
  //   osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  //   osmAttribution = 'Map data &copy; 2012 OpenStreetMap contributors';

  map.options.maxBoundsViscosity = 1.0;
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    // Fetch GeoJSON data
    fetch(geojsonUrl)
      .then((response) => response.json())
      .then((data) => setGeojsonData(data));
  }, [geojsonUrl]);

  useEffect(() => {
    if (!geojsonData) return;

    // const osm = L.TileLayer.boundaryCanvas(
    //   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //   {
    //     boundary: geojsonData,
    //     attribution:
    //       '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>',
    //   }
    // );

    // const geoJsonLayer = new L.GeoJSON(geojsonData, {
    //   invert: true,
    //   style: {
    //     // fillColor: 'transparent',
    //     color: "white",
    //     weight: 2,
    //     fillOpacity: 1,
    //   },
    // });
    // const tl = new L.TileLayer(
    //   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    // );
    // var osm = L.TileLayer.BoundaryCanvas.createFromLayer(geoJsonLayer, {
    //   boundary: geojsonData,
    //   attribution:
    //     '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>',
    // });
    // map.addLayer(osm);

    // L.marker([53.2529,8.4320]).addTo(map)
    // L.marker([52.9776, 9.0541]).addTo(map)

    map.setMaxBounds(
      L.latLngBounds(L.latLng(53.2529, 8.432), L.latLng(52.9776, 9.0541))
    );
    map.setMinZoom(11);

    // geoJsonLayer.bringToFront();
  }, [map, geojsonData]);

  return null;
};

export const SmartBremenMap = () => {
  return (
    <MapContainer
      center={[53.0765, 8.80681]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      {/* <TileLayer url="http://localhost:8080/styles/OSM OpenMapTiles/512/{z}/{x}/{y}.png" /> */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* http://localhost:8080/styles/512/Smartcity.json */}
      {/* <TileLayer url="http://localhost:8080/styles/smartcity/512/{z}/{x}/{y}.png" /> */}
      {/* <VectorTileLayer /> */}

      <MaskLayer geojsonUrl="/data/bremen.geojson" />
    </MapContainer>
  );
};

// function VectorTileLayer() {
//   const map = useMap();

//   useEffect(() => {
//     const vectorTileLayer = L.vectorGrid.protobuf(
//       "http://localhost:8090/tiles/{z}/{x}/{y}.pbf",
//       {
//         // vectorTileLayerStyles: {
//         //   landuse: { fill: true, weight: 1, color: "#00ff00" }, // Adjust styling per layer
//         // },
//       }
//     );
//     map.addLayer(vectorTileLayer);
//   }, [map]);

//   return null;
// }
