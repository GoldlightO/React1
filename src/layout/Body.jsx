import React, { useState, useEffect } from "react";
import { Movies } from "../components/Movies";
import { Preloader } from "../components/preloader";
import Search from "../components/Search";

const Body = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("matrix");
  const [contentType, setContentType] = useState("all"); // "all", "movie", "series"

  const fetchMovies = async (search = "matrix", type = "all") => {
    try {
      setLoading(true);
      setError(null);
      
      const query = search.trim();
      if (!query) {
        setError("Введите поисковый запрос");
        return;
      }

      // Добавляем параметр type в запрос, если выбран не "all"
      const typeParam = type !== "all" ? `&type=${type}` : "";
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=3155ba6d&s=${encodeURIComponent(query)}${typeParam}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "Фильмы не найдены");
      } else {
        // Дополнительная фильтрация на клиенте (на случай, если API не точно фильтрует)
        const filteredResults = type !== "all" 
          ? data.Search.filter(item => item.Type === type) 
          : data.Search;
        
        setMovies(filteredResults);
        setError(null);
      }
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
      setError("Ошибка при загрузке данных. Попробуйте позже.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm, contentType);
  }, []);

  const handleSearch = (term, type = contentType) => {
    setSearchTerm(term);
    fetchMovies(term, type);
  };

  const handleFilterChange = (type) => {
    setContentType(type);
    fetchMovies(searchTerm, type);
  };

  return (
    <main className="container content">
      <Search 
        searchMovies={handleSearch} 
        initialValue={searchTerm}
        onFilterChange={handleFilterChange}
        currentType={contentType}
      />
      
      {error && (
        <div className="error-message" style={{ color: "red", margin: "20px 0" }}>
          {error}
        </div>
      )}

      {loading ? (
        <Preloader />
      ) : (
        <>
          {movies?.length > 0 ? (
            <Movies movies={movies} />
          ) : (
            !error && <div>Введите запрос для поиска фильмов</div>
          )}
        </>
      )}
    </main>
  );
};

export default Body;