import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-boundary-canvas";
import "leaflet.snogylop";
// import Form from "./Form";
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
    //       '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>'
    //   }
    // );

    const geoJsonLayer = new L.GeoJSON(geojsonData, {
      invert: true,
      style: {
        // fillColor: 'transparent',
        color: "white",
        weight: 2,
        fillOpacity: 1,
      },
    });
    // const tl = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    var osm = L.TileLayer.BoundaryCanvas.createFromLayer(geoJsonLayer, {
      boundary: geojsonData,
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>',
    });
    map.addLayer(osm);

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

const App = () => {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter> */}

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

                <MaskLayer geojsonUrl="/data/bremen.geojson" />
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

export default App;

const Form = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-140">
      <header className="text-center py-6 text-black">
        <h1 className="text-3xl font-bold">Smart Bremen Frontend</h1>
      </header>

      <main className="flex-grow flex flex-col items-center py-8">
        <div className="w-full max-w h-[80vh]">
          <div className="w-full h-full rounded-md ">
            <MapContainer
              center={[53.0765, 8.80681]}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="http://localhost:8080/styles/OSM OpenMapTiles/512/{z}/{x}/{y}.png" />
              s
              <MaskLayer geojsonUrl="/data/bremen.geojson" />
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

      <footer className="text-center p-60 bg-gray-800 text-gray-300">
        <p>hi</p>
      </footer>
    </div>
  );
};

// import React from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// const Home = () => (
//   <div>
//     <h1>Home Page</h1>
//     <Link to="/form">Go to Form</Link>
//   </div>
// );

// const Form = () => (
//   <div>
//     <h1>Form Page</h1>
//     <Link to="/">Go to Home</Link>
//   </div>
// );

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/form" element={<Form />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
