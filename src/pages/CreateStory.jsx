// src/pages/CreateStory.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateStory() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState({});
  const [contentError, setContentError] = useState(""); // State to handle parsing errors
  const navigate = useNavigate();

  const handleCreateStory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/stories",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Failed to create story", error);
    }
  };

  const handleContentChange = (e) => {
    const inputValue = e.target.value;
    try {
      const parsedContent = JSON.parse(inputValue);
      setContent(parsedContent);
      setContentError(""); // Clear error if parsing is successful
    } catch (error) {
      setContentError("Invalid JSON format. Please correct it.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleCreateStory}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create a Story</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Content (JSON format)</label>
          <textarea
            // value={JSON.stringify(content, null, 2)} // Indented JSON for readability
            onChange={handleContentChange}
            className="w-full p-2 border rounded"
            rows="10"
            placeholder={`Input this field like below example:
  {
  "start": {
    "text": "You are an adventurer searching for hidden treasure in a mysterious jungle. After days of traveling, you arrive at a fork in the road.",
    "choices": [
      {
        "text": "Take the left path",
        "next": "junglePath"
      },
      {
        "text": "Take the right path",
        "next": "riverPath"
      }
    ]
  },
  "junglePath": {
    "text": "You venture deeper into the jungle, where the sounds of wild animals grow louder.",
    "choices": [
      {
        "text": "Enter the cave",
        "next": "caveEntrance"
      },
      {
        "text": "Continue exploring the jungle",
        "next": "jungleExploration"
      }
    ]
  }
}`}
            required
          ></textarea>
          {contentError && <p className="text-red-500 mt-2">{contentError}</p>}
          <p className="text-gray-600 mt-2">
            Please enter the story content in JSON format. Each section should
            have a unique name and include text and choices that lead to other
            sections.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Create Story
        </button>
      </form>
    </div>
  );
}

export default CreateStory;
