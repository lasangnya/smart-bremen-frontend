import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import "./addnewlocation.css"; // Import the CSS file
import routes from "../../routes";
import { API_BASE_URL } from "../../routes";

import { useLocation } from "react-router-dom";
function EditLocation() {
  const location = useLocation();
  const { post, markerPosition } = location.state || {}; // Extract state

  const [title, setTitle] = useState(post?.title);
  const [contactInfo, setContactInfo] = useState(post?.contact_information);
  const [content, setContent] = useState(post?.content);
  const [citations, setCitations] = useState(post?.citations);
  const [pictureTakenDate, setPictureTakenDate] = useState("");
  const [informalityLayerId, setInformalityLayerId] = useState(
    post?.informality_layer.id
  );
  const [informalityLayers, setInformalityLayers] = useState([]);
  // const [category, setCategory] = useState("artist");
  const [longitude, setLongitude] = useState(post?.metadata.longitude);
  const [latitude, setLatitude] = useState(post?.metadata.latitude);
  const [description, setDescription] = useState("");
  // const [displayPicture, setDisplayPicture] = useState(post?.images[0].fullurl);
  // const [gallery, setGallery] = useState([]);

  const [displayPicture, setDisplayPicture] = useState(
    post?.images.length > 0
      ? post.images.find((image) => image.image_status === "display")?.full_url
      : null
  );

  const [gallery, setGallery] = useState(
    post?.images
      ? post.images
          .filter((image) => image.image_status !== "display")
          .map((image) => image.full_url)
      : []
  );

  const [removedImages, setRemovedImages] = useState([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);

  const { token } = useAuth(); // Retrieve the token from the context
  const navigate = useNavigate();

  useEffect(() => {
    console.log(post.images.map((image) => image));
    axios
      .get(`${API_BASE_URL}/api/informality-layers`)
      .then((res) => setInformalityLayers(res.data))
      .catch((err) => console.error("Error fetching informality layers:", err));
  }, []);

  // const handleDisplayPictureChange = (e) => {
  //   setDisplayPicture(e.target.files[0]);
  // };

  // const handleGalleryChange = (e) => {
  //   setGallery([...e.target.files]);
  // };
  function EditLocation() {
    const location = useLocation();
    const { post, markerPosition } = location.state || {}; // Extract state

    const [title, setTitle] = useState(post?.title);
    const [contactInfo, setContactInfo] = useState(post?.contact_information);
    const [content, setContent] = useState(post?.content);
    const [citations, setCitations] = useState(post?.citations);
    const [pictureTakenDate, setPictureTakenDate] = useState("");
    const [informalityLayerId, setInformalityLayerId] = useState(
      post?.informality_layer.id
    );
    const [informalityLayers, setInformalityLayers] = useState([]);
    // const [category, setCategory] = useState("artist");
    const [longitude, setLongitude] = useState(post?.metadata.longitude);
    const [latitude, setLatitude] = useState(post?.metadata.latitude);
    const [description, setDescription] = useState("");
    // const [displayPicture, setDisplayPicture] = useState(post?.images[0].fullurl);
    // const [gallery, setGallery] = useState([]);

    const [displayPicture, setDisplayPicture] = useState(
      post?.images.length > 0
        ? post.images.find((image) => image.image_status === "display")
            ?.full_url
        : null
    );

    const [gallery, setGallery] = useState(
      post?.images
        ? post.images
            .filter((image) => image.image_status !== "display")
            .map((image) => image.full_url)
        : []
    );

    const [removedImages, setRemovedImages] = useState([]);
    const [newGalleryFiles, setNewGalleryFiles] = useState([]);

    const { token } = useAuth(); // Retrieve the token from the context
    const navigate = useNavigate();

    useEffect(() => {
      console.log(post.images.map((image) => image));
      axios
        .get(`${API_BASE_URL}/api/informality-layers`)
        .then((res) => setInformalityLayers(res.data))
        .catch((err) =>
          console.error("Error fetching informality layers:", err)
        );
    }, []);

    // const handleDisplayPictureChange = (e) => {
    //   setDisplayPicture(e.target.files[0]);
    // };

    // const handleGalleryChange = (e) => {
    //   setGallery([...e.target.files]);
    // };

    const handleRemoveImage = (imageUrl) => {
      if (imageUrl === displayPicture) {
        setDisplayPicture(null);
      } else {
        // Check if it's a new file or an existing URL
        if (
          newGalleryFiles.some((file) => URL.createObjectURL(file) === imageUrl)
        ) {
          setNewGalleryFiles(
            newGalleryFiles.filter(
              (file) => URL.createObjectURL(file) !== imageUrl
            )
          );
        } else {
          setRemovedImages([...removedImages, imageUrl]);
        }
        setGallery(gallery.filter((image) => image !== imageUrl));
      }
    };

    const handleGalleryImageChange = (e) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files);
        setNewGalleryFiles([...newGalleryFiles, ...filesArray]);

        const newImages = filesArray.map((file) => URL.createObjectURL(file));
        setGallery([...gallery, ...newImages]);
      }
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

      if (displayPicture instanceof File) {
        formData.append("display_image", displayPicture);
      } else if (displayPicture) {
        formData.append("existing_display_image", displayPicture);
      }

      newGalleryFiles.forEach((file) =>
        formData.append("gallery_images[]", file)
      );
      removedImages.forEach((url) => formData.append("removed_images[]", url));

      try {
        const res = await axios.put(
          `${API_BASE_URL}/api/posts/${post.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Post updated:", res.data);
        navigate(routes.home);
      } catch (error) {
        console.error(
          "Error updating post:",
          error.response?.data || error.message
        );
        alert("Failed to update post. Check console for details.");
      }
    };

    const handleCancel = () => {
      navigate(routes.home);
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
                  src={
                    displayPicture instanceof File
                      ? URL.createObjectURL(displayPicture)
                      : displayPicture
                  }
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
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setDisplayPicture(e.target.files[0]); // Updating the state with the new file
                }
              }}
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
                  const newImages = Array.from(e.dataTransfer.files).map(
                    (file) => URL.createObjectURL(file)
                  );
                  setGallery([...gallery, ...newImages]);
                }
              }}
            >
              {gallery.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img
                    src={image}
                    alt={`Gallery Preview ${index}`}
                    className="gallery-image"
                  />
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveImage(image)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Placeholder for uploading images */}
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
                    const newImages = Array.from(e.target.files).map((file) =>
                      URL.createObjectURL(file)
                    );
                    setGallery([...gallery, ...newImages]);
                  }
                }}
              />
            </div>
          </div>
        </form>
        <div className="form-header">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
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
  function EditLocation() {
    const location = useLocation();
    const { post, markerPosition } = location.state || {}; // Extract state

    const [title, setTitle] = useState(post?.title);
    const [contactInfo, setContactInfo] = useState(post?.contact_information);
    const [content, setContent] = useState(post?.content);
    const [citations, setCitations] = useState(post?.citations);
    const [pictureTakenDate, setPictureTakenDate] = useState("");
    const [informalityLayerId, setInformalityLayerId] = useState(
      post?.informality_layer.id
    );
    const [informalityLayers, setInformalityLayers] = useState([]);
    // const [category, setCategory] = useState("artist");
    const [longitude, setLongitude] = useState(post?.metadata.longitude);
    const [latitude, setLatitude] = useState(post?.metadata.latitude);
    const [description, setDescription] = useState("");
    // const [displayPicture, setDisplayPicture] = useState(post?.images[0].fullurl);
    // const [gallery, setGallery] = useState([]);

    const [displayPicture, setDisplayPicture] = useState(
      post?.images.length > 0
        ? post.images.find((image) => image.image_status === "display")
            ?.full_url
        : null
    );

    const [gallery, setGallery] = useState(
      post?.images
        ? post.images
            .filter((image) => image.image_status !== "display")
            .map((image) => image.full_url)
        : []
    );

    const [removedImages, setRemovedImages] = useState([]);
    const [newGalleryFiles, setNewGalleryFiles] = useState([]);

    const { token } = useAuth(); // Retrieve the token from the context
    const navigate = useNavigate();

    useEffect(() => {
      console.log(post.images.map((image) => image));
      axios
        .get(`${API_BASE_URL}/api/informality-layers`)
        .then((res) => setInformalityLayers(res.data))
        .catch((err) =>
          console.error("Error fetching informality layers:", err)
        );
    }, []);

    // const handleDisplayPictureChange = (e) => {
    //   setDisplayPicture(e.target.files[0]);
    // };

    // const handleGalleryChange = (e) => {
    //   setGallery([...e.target.files]);
    // };

    const handleRemoveImage = (imageUrl) => {
      if (imageUrl === displayPicture) {
        setDisplayPicture(null);
      } else {
        // Check if it's a new file or an existing URL
        if (
          newGalleryFiles.some((file) => URL.createObjectURL(file) === imageUrl)
        ) {
          setNewGalleryFiles(
            newGalleryFiles.filter(
              (file) => URL.createObjectURL(file) !== imageUrl
            )
          );
        } else {
          setRemovedImages([...removedImages, imageUrl]);
        }
        setGallery(gallery.filter((image) => image !== imageUrl));
      }
    };

    const handleGalleryImageChange = (e) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files);
        setNewGalleryFiles([...newGalleryFiles, ...filesArray]);

        const newImages = filesArray.map((file) => URL.createObjectURL(file));
        setGallery([...gallery, ...newImages]);
      }
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

      if (displayPicture instanceof File) {
        formData.append("display_image", displayPicture);
      } else if (displayPicture) {
        formData.append("existing_display_image", displayPicture);
      }

      newGalleryFiles.forEach((file) =>
        formData.append("gallery_images[]", file)
      );
      removedImages.forEach((url) => formData.append("removed_images[]", url));

      try {
        const res = await axios.put(
          `${API_BASE_URL}/api/posts/${post.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Post updated:", res.data);
        navigate(routes.home);
      } catch (error) {
        console.error(
          "Error updating post:",
          error.response?.data || error.message
        );
        alert("Failed to update post. Check console for details.");
      }
    };

    const handleCancel = () => {
      navigate(routes.home);
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
                  src={
                    displayPicture instanceof File
                      ? URL.createObjectURL(displayPicture)
                      : displayPicture
                  }
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
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setDisplayPicture(e.target.files[0]); // Updating the state with the new file
                }
              }}
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
                  const newImages = Array.from(e.dataTransfer.files).map(
                    (file) => URL.createObjectURL(file)
                  );
                  setGallery([...gallery, ...newImages]);
                }
              }}
            >
              {gallery.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img
                    src={image}
                    alt={`Gallery Preview ${index}`}
                    className="gallery-image"
                  />
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveImage(image)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Placeholder for uploading images */}
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
                    const newImages = Array.from(e.target.files).map((file) =>
                      URL.createObjectURL(file)
                    );
                    setGallery([...gallery, ...newImages]);
                  }
                }}
              />
            </div>
          </div>
        </form>
        <div className="form-header">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
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
  const handleRemoveImage = (imageUrl) => {
    if (imageUrl === displayPicture) {
      setDisplayPicture(null);
    } else {
      // Check if it's a new file or an existing URL
      if (
        newGalleryFiles.some((file) => URL.createObjectURL(file) === imageUrl)
      ) {
        setNewGalleryFiles(
          newGalleryFiles.filter(
            (file) => URL.createObjectURL(file) !== imageUrl
          )
        );
      } else {
        setRemovedImages([...removedImages, imageUrl]);
      }
      setGallery(gallery.filter((image) => image !== imageUrl));
    }
  };

  const handleGalleryImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewGalleryFiles([...newGalleryFiles, ...filesArray]);

      const newImages = filesArray.map((file) => URL.createObjectURL(file));
      setGallery([...gallery, ...newImages]);
    }
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

    if (displayPicture instanceof File) {
      formData.append("display_image", displayPicture);
    } else if (displayPicture) {
      formData.append("existing_display_image", displayPicture);
    }

    newGalleryFiles.forEach((file) =>
      formData.append("gallery_images[]", file)
    );
    removedImages.forEach((url) => formData.append("removed_images[]", url));

    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/posts/${post.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post updated:", res.data);
      navigate(routes.home);
    } catch (error) {
      console.error(
        "Error updating post:",
        error.response?.data || error.message
      );
      alert("Failed to update post. Check console for details.");
    }
  };

  const handleCancel = () => {
    navigate(routes.home);
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
                src={
                  displayPicture instanceof File
                    ? URL.createObjectURL(displayPicture)
                    : displayPicture
                }
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
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setDisplayPicture(e.target.files[0]); // Updating the state with the new file
              }
            }}
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
                const newImages = Array.from(e.dataTransfer.files).map((file) =>
                  URL.createObjectURL(file)
                );
                setGallery([...gallery, ...newImages]);
              }
            }}
          >
            {gallery.map((image, index) => (
              <div key={index} className="gallery-item">
                <img
                  src={image}
                  alt={`Gallery Preview ${index}`}
                  className="gallery-image"
                />
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemoveImage(image)}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Placeholder for uploading images */}
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
                  const newImages = Array.from(e.target.files).map((file) =>
                    URL.createObjectURL(file)
                  );
                  setGallery([...gallery, ...newImages]);
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

export default EditLocation;
