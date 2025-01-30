import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreatePost.css";
import { useAuth } from "./backend/components/AuthContext";

const CreatePost = ({ latitude, longitude }) => {
  const { token } = useAuth(); // Retrieve the token from the context
  const [title, setTitle] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [content, setContent] = useState("");
  const [citations, setCitations] = useState("");
  const [informalityLayerId, setInformalityLayerId] = useState("");
  //   const [latitude, setLatitude] = useState("");
  //   const [longitude, setLongitude] = useState("");
  const [pictureTakenDate, setPictureTakenDate] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [displayPreview, setDisplayPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [informalityLayers, setInformalityLayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://134.102.23.131:8082/api/informality-layers")
      .then((res) => setInformalityLayers(res.data))
      .catch((err) => console.error("Error fetching informality layers:", err));
  }, []);

  const handleDisplayImageChange = (e) => {
    const file = e.target.files[0];
    setDisplayImage(file);
    setDisplayPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages(files);
    setGalleryPreviews(files.map((file) => URL.createObjectURL(file)));
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
    if (displayImage) formData.append("display_image", displayImage);
    galleryImages.forEach((img, i) => formData.append("gallery_images[]", img));
    try {
      const res = await axios.post(
        "http://134.102.23.131:8082/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post created:", res.data);
      alert("Post created successfully!");
      setTitle("");
      setContactInfo("");
      setContent("");
      setCitations("");
      setInformalityLayerId("");
      //   setLatitude("");
      //   setLongitude("");
      setPictureTakenDate("");
      setDisplayImage(null);
      setDisplayPreview(null);
      setGalleryImages([]);
      setGalleryPreviews([]);
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      alert("Failed to create post. Check console for details.");
    }
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header">Post Main Info</div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactInfo">Contact Information</label>
                  <textarea
                    id="contactInfo"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="form-control"
                    rows="2"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-control"
                    rows="3"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="citations">Citations</label>
                  <textarea
                    id="citations"
                    value={citations}
                    onChange={(e) => setCitations(e.target.value)}
                    className="form-control"
                    rows="2"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="informalityLayerId">Informality Layer</label>
                  <select
                    id="informalityLayerId"
                    value={informalityLayerId}
                    onChange={(e) => setInformalityLayerId(e.target.value)}
                    className="form-select"
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
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header">Metadata Info</div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    type="text"
                    id="latitude"
                    value={latitude}
                    // onChange={(e) => setLatitude(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    type="text"
                    id="longitude"
                    value={longitude}
                    // onChange={(e) => setLongitude(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pictureTakenDate">Picture Taken Date</label>
                  <input
                    type="date"
                    id="pictureTakenDate"
                    value={pictureTakenDate}
                    onChange={(e) => setPictureTakenDate(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header">Images</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="displayImage">Display Image</label>
                  <input
                    type="file"
                    id="displayImage"
                    accept="image/*"
                    onChange={handleDisplayImageChange}
                    className="form-control"
                  />
                  {displayPreview && (
                    <img
                      src={displayPreview}
                      alt="Preview"
                      style={{ maxWidth: "100%", marginTop: 10 }}
                    />
                  )}
                </div>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="galleryImages">Gallery Images</label>
                  <input
                    type="file"
                    id="galleryImages"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImagesChange}
                    className="form-control"
                  />
                  <div
                    className="d-flex overflow-auto"
                    style={{ gap: 10, marginTop: 10 }}
                  >
                    {galleryPreviews.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Preview ${idx}`}
                        style={{ maxWidth: 100 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
