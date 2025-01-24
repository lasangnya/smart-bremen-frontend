import React, { useState } from "react";
import postRequestsData from "../data/postRequests.json";
import "./postrequests.css";

function PostRequests() {
  const [postRequests, setPostRequests] = useState(postRequestsData);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleReview = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleInputChange = (id, field, value) => {
    setPostRequests((prevRequests) =>
      prevRequests.map((post) =>
        post.id === id ? { ...post, [field]: value } : post
      )
    );
  };

  const handleLocationChange = (id, field, value) => {
    setPostRequests((prevRequests) =>
      prevRequests.map((post) =>
        post.id === id
          ? { ...post, location: { ...post.location, [field]: value } }
          : post
      )
    );
  };

  const handleDisplayPictureChange = (id, file) => {
    setPostRequests((prevRequests) =>
      prevRequests.map((post) =>
        post.id === id ? { ...post, displayPicture: URL.createObjectURL(file) } : post
      )
    );
  };

  const handleGalleryChange = (id, files) => {
    setPostRequests((prevRequests) =>
      prevRequests.map((post) =>
        post.id === id
          ? {
              ...post,
              gallery: [...post.gallery, ...Array.from(files).map((file) => URL.createObjectURL(file))],
            }
          : post
      )
    );
  };

  const handleRemoveGalleryImage = (id, index) => {
    setPostRequests((prevRequests) =>
      prevRequests.map((post) =>
        post.id === id
          ? { ...post, gallery: post.gallery.filter((_, i) => i !== index) }
          : post
      )
    );
  };

  const handleRemoveDisplayPicture = (id) => {
    setPostRequests((prevRequests) =>
      prevRequests.map((post) =>
        post.id === id ? { ...post, displayPicture: null } : post
      )
    );
  };

  return (
    <div className="post-requests">
      {postRequests.map((post) =>
        expandedRow === post.id ? (
          <div key={post.id} className="row-details">
            <div className="details-header">
              <a href="#" className="remove-link">
                Remove
              </a>
              <button className="approve-button">Approve</button>
            </div>
            <div>
              <strong>Name:</strong>
              <input
                type="text"
                value={post.name}
                onChange={(e) =>
                  handleInputChange(post.id, "name", e.target.value)
                }
              />
            </div>
            <div>
              <strong>Category:</strong>
              <span>{post.category}</span>
            </div>
            <div className="location">
              <strong>Location:</strong>
              <div>
                <span>
                  Latitude:{" "}
                  <input
                    type="text"
                    value={post.location.latitude}
                    onChange={(e) =>
                      handleLocationChange(post.id, "latitude", e.target.value)
                    }
                  />
                </span>
                <span>
                  Longitude:{" "}
                  <input
                    type="text"
                    value={post.location.longitude}
                    onChange={(e) =>
                      handleLocationChange(post.id, "longitude", e.target.value)
                    }
                  />
                </span>
              </div>
            </div>
            <div>
              <strong>Description:</strong>
              <textarea
                value={post.description}
                onChange={(e) =>
                  handleInputChange(post.id, "description", e.target.value)
                }
              />
            </div>
            <div>
              <strong>Display Picture:</strong>
              {post.displayPicture ? (
                <div className="preview-container">
                  <img
                    src={post.displayPicture}
                    alt="Display"
                    className="preview-image"
                  />
                  <div className="preview-actions">
                    <button
                      type="button"
                      className="change-button"
                      onClick={() =>
                        document.getElementById(`display-picture-${post.id}`).click()
                      }
                    >
                      Change
                    </button>
                  </div>
                  <input
                    type="file"
                    id={`display-picture-${post.id}`}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) =>
                      handleDisplayPictureChange(post.id, e.target.files[0])
                    }
                  />
                </div>
              ) : (
                <div
                  className="upload-placeholder"
                  onClick={() =>
                    document.getElementById(`display-picture-${post.id}`).click()
                  }
                >
                  Drop your image here or Browse
                </div>
              )}
            </div>
            <div>
              <strong>Gallery:</strong>
              <div
                className="gallery-container"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleGalleryChange(post.id, e.dataTransfer.files);
                }}
              >
                {post.gallery.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img src={image} alt={`Gallery ${index}`} />
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveGalleryImage(post.id, index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div
                  className="gallery-upload-placeholder"
                  onClick={() =>
                    document.getElementById(`gallery-upload-${post.id}`).click()
                  }
                >
                  <span className="plus-icon">+</span>
                </div>
                <input
                  type="file"
                  id={`gallery-upload-${post.id}`}
                  style={{ display: "none" }}
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    handleGalleryChange(post.id, e.target.files)
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div key={post.id} className="post-row">
            <div className="row-header">
              <span>{post.name}</span>
              <span>{post.date}</span>
              <span>{post.category}</span>
              <span>{post.location.longitude}</span>
              <span>{post.location.latitude}</span>
              <button
                className="review-button"
                onClick={() => handleReview(post.id)}
              >
                Review
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default PostRequests;
