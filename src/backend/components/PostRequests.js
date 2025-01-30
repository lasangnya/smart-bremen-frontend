import React, { useState, useEffect } from "react";
import axios from "axios";
import "./postrequests.css";
import { useAuth } from "./AuthContext";

function PostRequests() {
  const [postRequests, setPostRequests] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get("http://134.102.23.131:8082/api/dashboard/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const unpublishedPosts = response.data.data.filter(
          (post) => !post.published
        );
        setPostRequests(unpublishedPosts);
      })
      .catch((error) => console.error("Error fetching post requests:", error));
  }, [token]);

  const handleReview = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://134.102.23.131:8082/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() =>
        setPostRequests((prevRequests) =>
          prevRequests.filter((post) => post.id !== id)
        )
      )
      .catch((error) => console.error("Error deleting post:", error));
  };

  const handlePublish = (id) => {
    axios
      .post(
        `http://134.102.23.131:8082/api/admin/posts/${id}/toggle-publish`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setPostRequests((prevRequests) =>
          prevRequests.filter((post) => post.id !== id)
        );
        console.log("Post published");
      })
      .catch((error) => console.error("Error publishing post:", error));
  };

  return (
    <div className="post-requests">
      {postRequests.map((post) => (
        <div
          key={post.id}
          className={expandedRow === post.id ? "row-details" : "post-row"}
        >
          {expandedRow !== post.id && (
            <div className="row-header">
              <span>{post.title}</span>
              {/* <span>{post.date}</span> */}
              <span>{post.informality_layer.name}</span>
              {/* <span>{post.metadata.longitude}</span>
            <span>{post.metadata.latitude}</span> */}
              <button
                className="review-button"
                onClick={() => handleReview(post.id)}
              >
                Review
              </button>
            </div>
          )}
          {expandedRow === post.id && (
            <div>
              <button
                className="collapse-button"
                onClick={() => handleReview(post.id)}
              >
                Collapse
              </button>
              <div>
                <strong>Title:</strong>
                <span>{post.title}</span>
              </div>
              <div>
                <strong>Category:</strong>
                <span>{post.informality_layer.name}</span>
              </div>
              <div className="location">
                <strong>Location:</strong>
                <span>Latitude: {post.metadata.latitude}</span>
                <span>Longitude: {post.metadata.longitude}</span>
              </div>
              <div>
                <strong>Description:</strong>
                <p>{post.content}</p>
              </div>
              <div>
                <strong>Citations:</strong>
                <p>{post.citations}</p>
              </div>
              <div>
                <strong>Display Picture:</strong>
                {post.images.find(
                  (image) => image.image_status === "display"
                ) && (
                  <div className="display-picture">
                    <img
                      src={
                        post.images.find(
                          (image) => image.image_status === "display"
                        ).full_url
                      }
                      alt="Display"
                    />
                  </div>
                )}
              </div>
              <div>
                <strong>Gallery:</strong>
                <div className="gallery-container">
                  {post.images
                    .filter((image) => image.image_status === "gallery")
                    .map((image, index) => (
                      <div key={image.id} className="gallery-item">
                        <img src={image.full_url} alt={`Gallery ${index}`} />
                      </div>
                    ))}
                </div>
              </div>
              <div className="action-buttons">
                <button
                  className="delete-button mr-2"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
                <button
                  className="publish-button"
                  onClick={() => handlePublish(post.id)}
                >
                  Publish
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostRequests;
