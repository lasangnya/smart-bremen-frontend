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
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
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
        <div className="form-group">
          <label htmlFor="displayPicture">Display Picture</label>
          <input
            type="file"
            id="displayPicture"
            accept="image/*"
            onChange={handleDisplayPictureChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gallery">Gallery</label>
          <input
            type="file"
            id="gallery"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
          />
        </div>
      </form>
    </div>
  );
}

export default AddNewLocation;