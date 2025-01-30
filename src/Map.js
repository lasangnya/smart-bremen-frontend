// import React, { useState, useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-boundary-canvas";
// import "leaflet.snogylop";
// import "leaflet-vector-tile-layer";
// import "leaflet.vectorgrid";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";

// const MaskLayer = ({ geojsonUrl }) => {
//   const map = useMap();
//   // var map = L.map('map').setView([55.7, 38], 7),
//   //   osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
//   //   osmAttribution = 'Map data &copy; 2012 OpenStreetMap contributors';

//   map.options.maxBoundsViscosity = 1.0;
//   const [geojsonData, setGeojsonData] = useState(null);

//   useEffect(() => {
//     // Fetch GeoJSON data
//     fetch(geojsonUrl)
//       .then((response) => response.json())
//       .then((data) => setGeojsonData(data));
//   }, [geojsonUrl]);

//   useEffect(() => {
//     if (!geojsonData) return;

//     // const osm = L.TileLayer.boundaryCanvas(
//     //   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//     //   {
//     //     boundary: geojsonData,
//     //     attribution:
//     //       '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>',
//     //   }
//     // );

//     // const geoJsonLayer = new L.GeoJSON(geojsonData, {
//     //   invert: true,
//     //   style: {
//     //     // fillColor: 'transparent',
//     //     color: "white",
//     //     weight: 2,
//     //     fillOpacity: 1,
//     //   },
//     // });
//     // const tl = new L.TileLayer(
//     //   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     // );
//     // var osm = L.TileLayer.BoundaryCanvas.createFromLayer(geoJsonLayer, {
//     //   boundary: geojsonData,
//     //   attribution:
//     //     '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>',
//     // });
//     // map.addLayer(osm);

//     // L.marker([53.2529,8.4320]).addTo(map)
//     // L.marker([52.9776, 9.0541]).addTo(map)

//     map.setMaxBounds(
//       L.latLngBounds(L.latLng(53.2529, 8.432), L.latLng(52.9776, 9.0541))
//     );
//     map.setMinZoom(11);

//     const LeafIcon = L.Icon.extend({
//       options: {
//         shadowUrl: "https://docs.maptiler.com/leaflet/assets/leaf_shadow.png",
//         iconSize: [38, 95],
//         shadowSize: [50, 64],
//         iconAnchor: [22, 94],
//         shadowAnchor: [4, 62],
//         popupAnchor: [-3, -76],
//       },
//     });

//     const leafIcon = new LeafIcon({
//       iconUrl: "https://docs.maptiler.com/leaflet/assets/leaf_marker.png",
//     });

//     // var helloPopup = L.popup().setContent("<b>Sample Text</b>");

//     L.marker([53.0765, 8.80681], { icon: leafIcon })
//       .addTo(map)
//       .on("click", function (e) {
//         // helloPopup.setLatLng(map.getCenter()).openOn(map);
//         console.log(e.latLng);
//       });

//     const icon = L.divIcon({
//       className: "custom-div-icon",
//       html: "<div style='background-color:#4838cc;' class='marker-pin'></div><img src = 'favicon.ico' alt='My Happy SVG'/>",
//       iconSize: [30, 42],
//       iconAnchor: [15, 42],
//     });
//     const newMarker = L.marker([53.0865, 8.80681], { icon: icon });

//     const popupContent = "Popup Content";
//     newMarker.bindPopup(popupContent).openPopup();
//     newMarker.addTo(map);

//     // geoJsonLayer.bringToFront();
//   }, [map, geojsonData]);

//   return null;
// };

// export const SmartBremenMap = () => {
//   return (
//     <MapContainer
//       center={[53.0765, 8.80681]}
//       zoom={14}
//       style={{ height: "100%", width: "100%" }}
//     >
//       {/* <TileLayer url="http://localhost:8080/styles/OSM OpenMapTiles/512/{z}/{x}/{y}.png" /> */}
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {/* http://localhost:8080/styles/512/Smartcity.json */}
//       {/* <TileLayer url="http://localhost:8080/styles/smartcity/512/{z}/{x}/{y}.png" /> */}
//       {/* <VectorTileLayer /> */}

//       <MaskLayer geojsonUrl="/data/bremen.geojson" />
//     </MapContainer>
//   );
// };

// // function VectorTileLayer() {
// //   const map = useMap();

// //   useEffect(() => {
// //     const vectorTileLayer = L.vectorGrid.protobuf(
// //       "http://localhost:8090/tiles/{z}/{x}/{y}.pbf",
// //       {
// //         // vectorTileLayerStyles: {
// //         //   landuse: { fill: true, weight: 1, color: "#00ff00" }, // Adjust styling per layer
// //         // },
// //       }
// //     );
// //     map.addLayer(vectorTileLayer);
// //   }, [map]);

// //   return null;
// // }

// import React, { useState, useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-boundary-canvas";
// import "leaflet.snogylop";
// import "leaflet-vector-tile-layer";
// import "leaflet.vectorgrid";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";

// const MaskLayer = ({ geojsonUrl, onMarkerClick }) => {
//   const map = useMap();
//   map.options.maxBoundsViscosity = 1.0;
//   const [geojsonData, setGeojsonData] = useState(null);

//   useEffect(() => {
//     fetch(geojsonUrl)
//       .then((response) => response.json())
//       .then((data) => setGeojsonData(data));
//   }, [geojsonUrl]);

//   useEffect(() => {
//     if (!geojsonData) return;

//     map.setMaxBounds(
//       L.latLngBounds(L.latLng(53.2529, 8.432), L.latLng(52.9776, 9.0541))
//     );
//     map.setMinZoom(11);

//     const LeafIcon = L.Icon.extend({
//       options: {
//         shadowUrl: "https://docs.maptiler.com/leaflet/assets/leaf_shadow.png",
//         iconSize: [38, 95],
//         shadowSize: [50, 64],
//         iconAnchor: [22, 94],
//         shadowAnchor: [4, 62],
//         popupAnchor: [-3, -76],
//       },
//     });

//     const leafIcon = new LeafIcon({
//       iconUrl: "https://docs.maptiler.com/leaflet/assets/leaf_marker.png",
//     });

//     const marker = L.marker([53.0765, 8.80681], { icon: leafIcon }).addTo(map);
//     marker.on("click", (e) => onMarkerClick(e, marker));

//     const icon = L.divIcon({
//       className: "custom-div-icon",
//       html: "<div style='background-color:#4838cc;' class='marker-pin'></div><img src = 'favicon.ico' alt='My Happy SVG'/>",
//       iconSize: [30, 42],
//       iconAnchor: [15, 42],
//     });

//     const newMarker = L.marker([53.0865, 8.80681], { icon: icon }).addTo(map);
//     newMarker.on("click", (e) => onMarkerClick(e, newMarker));
//   }, [map, geojsonData, onMarkerClick]);

//   return null;
// };

// export const SmartBremenMap = () => {
//   const popupRef = useRef(null);
//   const [popupData, setPopupData] = useState({
//     visible: false,
//     content: "",
//     position: { x: 0, y: 0 },
//   });

//   const handleMarkerClick = (e, marker) => {
//     const map = marker._map;
//     const point = map.latLngToContainerPoint(e.latlng);
//     const { lat, lng } = e.latlng;

//     setPopupData({
//       visible: true,
//       content: `Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`,
//       position: { x: point.x, y: point.y },
//     });
//   };

//   return (
//     <div style={{ position: "relative", width: "100%", height: "80vh" }}>
//       {/* Custom Popup */}
//       {popupData.visible && (
//         <div
//           ref={popupRef}
//           style={{
//             position: "absolute",
//             bottom: "10px", // Fixed distance from the bottom
//             right: "10px", // Fixed distance from the right
//             background: "white",
//             padding: "15px",
//             borderRadius: "10px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
//             zIndex: 1000,
//             width: "250px",
//             border: "2px solid #4838cc",
//           }}
//         >
//           <div style={{ textAlign: "center" }}>
//             <h3 style={{ fontSize: "16px", margin: "5px 0" }}>
//               Marker Location
//             </h3>
//             <p style={{ fontSize: "14px", color: "#333" }}>
//               {popupData.content}
//             </p>
//             <button
//               onClick={() => setPopupData({ ...popupData, visible: false })}
//               style={{
//                 background: "#4838cc",
//                 color: "white",
//                 border: "none",
//                 padding: "5px 10px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Leaflet Map */}
//       <MapContainer
//         center={[53.0765, 8.80681]}
//         zoom={14}
//         style={{ height: "100%", width: "100%" }}
//       >
//         {/* <TileLayer url="http://localhost:8080/styles/openmaptiles/{z}/{x}/{y}.png" /> */}
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         //{" "}
//         {/* <TileLayer url="http://localhost:8080/styles/OSM OpenMapTiles/512/{z}/{x}/{y}.png" /> */}
//         // {/* http://localhost:8080/styles/512/Smartcity.json */}
//         //{" "}
//         {/* <TileLayer url="http://localhost:8080/styles/smartcity/512/{z}/{x}/{y}.png" /> */}
//         <MaskLayer
//           geojsonUrl="/data/bremen.geojson"
//           onMarkerClick={handleMarkerClick}
//         />
//       </MapContainer>
//     </div>
//   );
// };
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import CreatePost from "./CreatePost";
import { useAuth } from "./backend/components/AuthContext";
import "./map.css";
import iconSVG from "./assets/icons/marker.svg";
import { useNavigate } from "react-router";
import routes from "./routes";

const SmartBremenMap = () => {
  const [posts, setPosts] = useState("");
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8082/api/dashboard/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  const handleMarkerClick = (post) => {
    console.log(post.published);
    console.log("Marker clicked:", post.title); // Debug: Log the clicked marker's data
    setPostPopup(post);
    setPopupData({
      visible: false,
    });
    setMarkerPosition(null);
  };

  const publish = (post) => {
    axios
      .post(
        `http://127.0.0.1:8082/api/admin/posts/${post.id}/toggle-publish`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // setPosts(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  };
  const icon = L.icon({
    iconUrl: iconSVG,
    iconSize: [38, 95],
    iconAnchor: [19, 78],
    // popupAnchor: [-3, -76],
    // shadowUrl: "shadow.png",
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94],
  });

  const [markerPosition, setMarkerPosition] = useState(null);

  const [popupData, setPopupData] = useState({
    visible: false,
    position: { lat: null, lng: null },
  });

  const [postPopup, setPostPopup] = useState({
    visible: false,
  });

  const handleMapClick = (e) => {
    if (token) {
      const { lat, lng } = e.latlng;

      setMarkerPosition([lat, lng]);

      setPopupData({
        visible: true,
        position: { lat, lng },
      });

      setPostPopup(null);
    }
  };

  const CustomPopup = ({ post, closePopup }) => (
    <div className="post-container">
      <div className="popup-header">
        <h3 style={{ fontSize: "16px", margin: "5px 0" }}>{post.title}</h3>
      </div>

      {/* img needs to be full size in width. all images are square, maybe that helps */}
      <img
        src={
          post.images?.find((image) => image.image_status === "display")
            ?.full_url
        }
      ></img>
      <div
        style={{
          height: "30%", //?? needs to be dynamic i guess
          "overflow-y": " auto",
          padding: "10px",
          "font-size": "16px",
          "line-height": "1.5",
          " white-space": "pre-wrap" /* Keeps text formatting */,
        }}
      >
        {post.content}
      </div>

      <button
        onClick={closePopup}
        style={{
          background: "#4838cc",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
      <button
        onClick={() =>
          navigate(routes.editLocation, {
            state: {
              post: post,
            },
          })
        }
        style={{
          background: "#4838cc",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Edit
      </button>
      <button
        onClick={() => publish(post)}
        style={{
          background: "#4838cc",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {post.published === 1 ? "Unpublish" : "Publish"}
      </button>
    </div>
    // </div>
  );

  const AddNewLocationPopup = () =>
    popupData.visible && (
      <div className="popup-container">
        <div className="popup-header">
          <h3>Create a new post at this location</h3>
        </div>
        <div className="popup-button-container">
          <button
            className="submit-button"
            onClick={() =>
              navigate(routes.dashboard, {
                state: {
                  markerPosition: markerPosition,
                },
              })
            }
          >
            Create
          </button>
          <button
            className="cancel-button"
            onClick={() => setPopupData({ visible: false, position: {} })}
          >
            Close
          </button>
        </div>
      </div>
    );

  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      map.on("click", handleMapClick);

      return () => map.off("click", handleMapClick);
    }, [map]);
    return null;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <AddNewLocationPopup />
      {postPopup && (
        <CustomPopup post={postPopup} closePopup={() => setPostPopup(null)} />
      )}
      <MapContainer
        center={[53.0765, 8.80681]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        onMarkerClick
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markerPosition && (
          <Marker position={markerPosition} icon={icon}></Marker>
        )}

        {posts?.data?.map((post) => {
          const latitude = post?.images?.[0]?.metadata?.latitude;
          const longitude = post?.images?.[0]?.metadata?.longitude;

          if (latitude && longitude) {
            return (
              <Marker
                icon={icon}
                key={post.id}
                position={[latitude, longitude]}
                eventHandlers={{
                  click: () => handleMarkerClick(post),
                }}
              ></Marker>
            );
          }

          return null; // Skip entries with invalid lat/lng
        })}

        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default SmartBremenMap;
