import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client"; // Import createRoot

import Moviecard from "./Moviecard";
import SearchIcon from "./Search.svg";
import "./App.css";

//  Make sure to have the correct base URL and endpoint here.
const API_URL =
  "https://your-rapidapi-base-url/endpoint?apikey=ba88d5427emsh77b08521194eb47p12ef09js"; // Replace with your actual RapidAPI URL

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Superman"); // Initial search
  }, []);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`); // Corrected template literal
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle potential errors
      }
      const data = await response.json();
      console.log("API Response:", data); // Check the API response in the console
      setMovies(data.Search || []); // Handle cases where Search might be undefined or empty
    } catch (error) {
      console.error("Error fetching movies:", error); // Log errors to the console
      // Optionally display an error message to the user
    }
  };

  const root = createRoot(document.getElementById("root")); // createRoot for React 18
  root.render(<App />);

  return (
    <div className="app">
      <h1>Filmpire Movies</h1>
      <h2 className="text-white m-2 p-4">Wangila Movie App</h2>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies.length > 0 ? ( // Simplified condition
        <div className="container">
          {movies.map((movie) => (
            <Moviecard key={movie.imdbID} movie={movie} /> // Add a unique key prop!
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
