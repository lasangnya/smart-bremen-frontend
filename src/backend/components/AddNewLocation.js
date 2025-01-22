import React, { useState } from "react";
import './addnewlocation.css'; // Import the CSS file

function AddNewLocation() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("artist");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [description, setDescription] = useState("");
  const [displayPicture, setDisplayPicture] = useState(null);
  const [gallery, setGallery] = useState([]);

  const handleDisplayPictureChange = (e) => {
    setDisplayPicture(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    setGallery([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleCancel = () => {
    // Handle cancel logic here
  };

  return (
    <div className="add-new-location">
      <div className="form-header">
        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="submit-button" form="add-new-location-form">Submit</button>
      </div>
      <form id="add-new-location-form" onSubmit={handleSubmit} className="add-new-location-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="artist">Artist</option>
            <option value="business">Business</option>
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
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
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
                  onClick={() => document.getElementById("displayPicture").click()}
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
                onClick={() => document.getElementById("displayPicture").click()}
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
              onClick={() => document.getElementById(`gallery-upload-${gallery.length}`).click()}
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
    </div>
  );
}

export default AddNewLocation;