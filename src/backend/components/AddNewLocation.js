import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import "./addnewlocation.css"; // Import the CSS file
import routes from "../../routes";

function AddNewLocation({ markerPosition }) {
  const [title, setTitle] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [content, setContent] = useState("");
  const [citations, setCitations] = useState("");
  const [pictureTakenDate, setPictureTakenDate] = useState("");
  const [informalityLayerId, setInformalityLayerId] = useState("");
  const [informalityLayers, setInformalityLayers] = useState([]);
  // const [category, setCategory] = useState("artist");
  const [longitude, setLongitude] = useState(
    markerPosition ? markerPosition[0] : ""
  );
  const [latitude, setLatitude] = useState(
    markerPosition ? markerPosition[1] : ""
  );
  const [description, setDescription] = useState("");
  const [displayPicture, setDisplayPicture] = useState(null);
  const [gallery, setGallery] = useState([]);

  const { token } = useAuth(); // Retrieve the token from the context
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8082/api/informality-layers")
      .then((res) => setInformalityLayers(res.data))
      .catch((err) => console.error("Error fetching informality layers:", err));
  }, []);

  const handleDisplayPictureChange = (e) => {
    setDisplayPicture(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    setGallery([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contact_information", contactInfo);
    formData.append("content", content);
    formData.append("citations", citations);
    formData.append("informality_layer_id", informalityLayerId);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("picture_taken_date", pictureTakenDate);
    if (displayPicture) formData.append("display_image", displayPicture);
    gallery.forEach((img, i) => formData.append("gallery_images[]", img));
    try {
      const res = await axios.post(
        "http://127.0.0.1:8082/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post created:", res.data);
      navigate(routes.home);
      // alert("Post created successfully!");
      // setTitle("");
      // setContactInfo("");
      // setContent("");
      // setCitations("");
      // setInformalityLayerId("");
      // //   setLatitude("");
      // //   setLongitude("");
      // setPictureTakenDate("");
      // setDisplayPicture(null);
      // // setDisplayPreview(null);
      // setGallery([]);
      // // setGalleryPreviews([]);
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      alert("Failed to create post. Check console for details.");
    }
  };

  const handleCancel = () => {
    // Handle cancel logic here
  };

  return (
    <div className="add-new-location">
      <form
        id="add-new-location-form"
        onSubmit={handleSubmit}
        className="add-new-location-form"
      >
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Description</label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Contact Information</label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Citations</label>
          <input
            type="text"
            id="citations"
            value={citations}
            onChange={(e) => setCitations(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="informalityLayerId">Informality Layer</label>
          <select
            id="informalityLayerId"
            value={informalityLayerId}
            onChange={(e) => setInformalityLayerId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            {informalityLayers.map((layer) => (
              <option key={layer.id} value={layer.id}>
                {layer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Location</label>
          <div className="location-inputs">
            <div className="input-container">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        {/* <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div> */}
        <div className="form-group display-picture">
          <label htmlFor="displayPicture">Display Picture</label>
          {displayPicture ? (
            <div className="preview-container">
              <img
                src={URL.createObjectURL(displayPicture)}
                alt="Preview"
                className="preview-image"
              />
              <div className="preview-actions">
                <button
                  type="button"
                  className="change-button"
                  onClick={() =>
                    document.getElementById("displayPicture").click()
                  }
                >
                  Change
                </button>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => setDisplayPicture(null)}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              className="upload-placeholder"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setDisplayPicture(e.dataTransfer.files[0]);
                }
              }}
            >
              <p>Drop your image here or</p>
              <button
                type="button"
                className="browse-button"
                onClick={() =>
                  document.getElementById("displayPicture").click()
                }
              >
                Browse
              </button>
            </div>
          )}
          <input
            type="file"
            id="displayPicture"
            accept="image/*"
            onChange={(e) => setDisplayPicture(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <div className="form-group gallery">
          <label>Gallery</label>
          <div
            className="gallery-container"
            onDragOver={(e) => e.preventDefault()} // Allow drop by preventing default behavior
            onDrop={(e) => {
              e.preventDefault(); // Prevent default behavior
              if (e.dataTransfer.files) {
                setGallery([...gallery, ...Array.from(e.dataTransfer.files)]); // Append dropped files
              }
            }}
          >
            {gallery.map((image, index) => (
              <div key={index} className="gallery-item">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Gallery Preview ${index}`}
                  className="gallery-image"
                />
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => {
                    setGallery(gallery.filter((_, i) => i !== index));
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <div
              className="gallery-upload-placeholder"
              onClick={() =>
                document
                  .getElementById(`gallery-upload-${gallery.length}`)
                  .click()
              }
            >
              <span className="plus-icon">+</span>
            </div>
            <input
              type="file"
              id={`gallery-upload-${gallery.length}`}
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files) {
                  setGallery([...gallery, ...Array.from(e.target.files)]);
                }
              }}
            />
          </div>
        </div>
      </form>
      <div className="form-header">
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className="submit-button"
          form="add-new-location-form"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddNewLocation;
