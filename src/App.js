import React, { useState, useEffect } from "react";
import { Link, Routes, Route, BrowserRouter } from "react-router";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-boundary-canvas";
import "leaflet.snogylop";
import "leaflet-vector-tile-layer";
import "leaflet.vectorgrid";
// // import Form from "./Form";

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

    const osm = L.TileLayer.boundaryCanvas(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        boundary: geojsonData,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>',
      }
    );

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
    map.setMinZoom(10);

    // geoJsonLayer.bringToFront();
  }, [map, geojsonData]);

  return null;
};

const Landing = () => {
  return (
    <div className="App">
      <div className="flex flex-col min-h-screen bg-gray-140">
        <header className="text-center py-6 text-black">
          <h1 className="text-3xl font-bold">Smart Bremen Frontend</h1>
        </header>

        <main className="flex-grow flex flex-col items-center py-8 ">
          <div className="w-full max-w h-[80vh]">
            <div className="w-full h-full rounded-md ">
              <MapContainer
                center={[53.0765, 8.80681]}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="http://localhost:8080/styles/OSM OpenMapTiles/512/{z}/{x}/{y}.png" />
                {/* http://localhost:8080/styles/512/Smartcity.json */}
                {/* <TileLayer url="http://localhost:8080/styles/smartcity/512/{z}/{x}/{y}.png" /> */}
                {/* <VectorTileLayer /> */}

                {/* <MaskLayer geojsonUrl="/data/bremen.geojson" /> */}
              </MapContainer>
            </div>
          </div>

          <section className="mt-8 px-4 max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">About This Map</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
              sapien eget felis fermentum aliquam. Integer consequat erat quis
              libero euismod, a tincidunt nisi consectetur.
            </p>
            <p className="text-gray-700 mt-4">
              Praesent consequat metus in velit tristique, quis malesuada felis
              tempor. Curabitur vitae leo nec mi vehicula dictum sit amet nec
              ligula.
            </p>
          </section>
        </main>

        <footer className="text-center p-60 bg-gray-800 text-gray-300"></footer>
      </div>
    </div>
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

function Home() {
  return <h1>Home Page</h1>;
}
function About() {
  return <h1>About Page</h1>;
}
function Contact() {
  return <h1>Contact Page</h1>;
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Landing</Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
