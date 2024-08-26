import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ReadStory() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/stories/${id}`
        );
        setStory(data);
        setCurrentSection(data.content.start);
        setStartTime(Date.now());
      } catch (error) {
        console.error("Failed to fetch story", error);
      }
    };

    fetchStory();
  }, [id]);

  const handleChoice = async (nextSection) => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    setStartTime(Date.now());
    setCurrentSection(story.content[nextSection]);

    try {
      await axios.post(
        `http://localhost:5000/api/stories/${id}/stats`,
        { sectionId: currentSection._id, choice: nextSection, timeSpent },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (error) {
      console.error("Failed to update story stats", error);
    }
  };

  if (!story || !currentSection) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{story.title}</h1>
      <p className="mb-4">{currentSection.text}</p>
      <div>
        {currentSection.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoice(choice.next)}
            className="bg-blue-500 text-white py-2 px-4 rounded mb-2 mr-2"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReadStory;
