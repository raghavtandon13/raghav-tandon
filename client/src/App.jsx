import React, { useState } from "react";
import CardT from "./components/CardT.jsx";
import SearchBar from "./components/SearchBar.jsx";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`http://localhost:3001/search?term=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results", error);
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <div className="searchbar-container">
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />

        <div>
          {searchResults.map((result) => (
            <CardT
              key={result.companyId}
              company={result.company}
              headline={result.headline}
              description={result.description}
              primaryText={result.primaryText}
              imgUrl={result.imgUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
