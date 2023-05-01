import React from "react";
import "./../App.css";

/**
 * The SearchBar function returns a search bar component with a title, input field, and search button
 * for searching GitHub usernames.
 * In contrast to `App` which is a class component `SearchBar` is a functional one. It takes two props,
 * `setSearchUser` and `handleSearch` (here I use object destructing), and returns a
 * div containing a heading, an input field, and a button. The input field has an `onChange` event listener that updates the `setSearchUser` state with
 * the value of the input field. The button has an `onClick` event listener that calls the `handleSearch` function.
 * when it is clicked.
 */
const SearchBar = ({ searchUser, setSearchUser, handleSearch }) => {
  return (
    <div className="search-bar">
      <h1>GitHub Profile Search</h1>
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={searchUser} // value
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
