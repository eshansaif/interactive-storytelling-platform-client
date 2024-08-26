// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateStory from "./pages/CreateStory";
import ReadStory from "./pages/ReadStory";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-story" element={<CreateStory />} />
        <Route path="/story/:id" element={<ReadStory />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
