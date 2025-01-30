import React, { useEffect, useState } from "react";
import SmartBremenLines from "../assets/icons/smart_bremen_lines.svg";
import "./featured.css";
import Button from "./Button";
import axios from "axios";
import { API_BASE_URL } from "../routes";

const Featured = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from API
    const fetchPosts = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/posts/featured/?limit=3`
      ); // Adjust to your API endpoint
      const data = await response.data;
      console.log(data);
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? posts.length - 1 : prevSlide - 1
    );
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === posts.length - 1 ? 0 : prevSlide + 1
    );
  };

  if (posts.length === 0) return <div>Loading...</div>;

  const { title, content, images } = posts[currentSlide];

  // Dynamically duplicate images for endless scrolling
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="featured-container">
      <div className="text-container">
        <div className="text-we-are-bremen">
          <span className="text-we-are">WE ARE</span>
          <span className="text-with-icon">
            <span className="text-bremen">BREMEN</span>
            <img src={SmartBremenLines} alt="lines" className="icon" />
          </span>
        </div>
        <div className="text-featured">FEATURED</div>
      </div>
      <div className="slide">
        <div className="pictures-container">
          {duplicatedImages.map((image, index) => (
            <img
              key={index}
              src={image.full_url}
              alt={`Post ${title} image ${index}`}
              className="picture"
            />
          ))}
        </div>
        <div className="post-info">
          <div className="post-title">{title}</div>
          <div className="post-content">{content}</div>
        </div>
      </div>
      <div className="arrow left-arrow" onClick={handlePrevClick}>
        &#9664;
      </div>
      <div className="arrow right-arrow" onClick={handleNextClick}>
        &#9654;
      </div>
      {/* <div className="button-container">
        <Button text="SEE MORE" onClick={() => {}} />
      </div> */}
    </div>
  );
};

export default Featured;
