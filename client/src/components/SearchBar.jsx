import React from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
function SearchBar(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="type to search"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </form>
  );
}
export default SearchBar;
