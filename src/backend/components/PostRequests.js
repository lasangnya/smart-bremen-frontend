import React from "react";
import postRequests from "../data/postRequests.json";

function PostRequests() {
  return (
    <div className="post-requests">
      <h2>Post Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Location</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postRequests.map((post) => (
            <tr key={post.id}>
              <td>{post.name}</td>
              <td>{post.category}</td>
              <td>
                {post.location.longitude}, {post.location.latitude}
              </td>
              <td>{post.description}</td>
              <td>
                <button className="review-button">Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostRequests;
