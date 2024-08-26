import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function StoryDetailPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/stories/${id}`
        );
        setStory(response.data);
      } catch (error) {
        setError("Error fetching story: " + error.message);
        console.error("Error fetching story", error);
      }
    };

    fetchStory();
  }, [id]);

  if (!story) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">{story.title}</h1>
        <p className="mb-4">{story.content}</p>
        <div>
          {story.choices.map((choice, index) => (
            <button
              key={index}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mr-2"
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoryDetailPage;
