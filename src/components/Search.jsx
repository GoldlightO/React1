import React, { useState } from "react";

const Search = ({ searchMovies, initialValue = "", onFilterChange, currentType = "all" }) => {
  const [search, setSearch] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(search);
  };

  const handleFilterChange = (e) => {
    const type = e.target.value;
    onFilterChange(type);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <div className="input-group mb-3">
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

      <div className="d-flex gap-3">
        <label>
          <input
            className="with-gap"
            name="type"
            type="radio"
            value="all"
            onChange={handleFilterChange}
            checked={currentType === "all"}
          />
          <span>All</span>
        </label>
        <label>
          <input
            className="with-gap"
            name="type"
            type="radio"
            value="movie"
            onChange={handleFilterChange}
            checked={currentType === "movie"}
          />
          <span>Movies only</span>
        </label>
        <label>
          <input
            className="with-gap"
            name="type"
            type="radio"
            value="series"
            onChange={handleFilterChange}
            checked={currentType === "series"}
          />
          <span>Series only</span>
        </label>
      </div>
    </form>
  );
};

export default Search;