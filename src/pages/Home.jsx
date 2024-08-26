// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  // Initialize stories as an empty array
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/stories");
        // Ensure the data is an array before setting it to stories
        setStories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch stories", error);
        setStories([]); // Set stories to an empty array on error
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Stories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.length > 0 ? (
          stories.map((story) => (
            <Link to={`/story/${story._id}`} key={story._id}>
              <div className="p-4 bg-white rounded shadow-md">
                <h2 className="text-xl font-bold">{story.title}</h2>
                <p>by {story.author.username}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">No stories available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
