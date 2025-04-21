import React, { useState } from "react";

const Search = ({ searchMovies, initialValue = "" }) => {
  const [search, setSearch] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(search);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Найти фильм..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search movies"
        />
        <button className="btn btn-primary" type="submit">
          Поиск
        </button>
      </div>
    </form>
  );
};

export default Search;
