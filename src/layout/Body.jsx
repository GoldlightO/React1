import React, { useState, useEffect } from "react";
import { Movies } from "../components/Movies";
import { Preloader } from "../components/preloader";
import Search from "../components/Search";

const Body = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("matrix");

  const fetchMovies = async (search = "matrix") => {
    try {
      setLoading(true);
      setError(null);
      
      // Проверяем и очищаем поисковый запрос
      const query = search.trim();
      if (!query) {
        setError("Введите поисковый запрос");
        return;
      }

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=3155ba6d&s=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "Фильмы не найдены");
      } else {
        setMovies(data.Search);
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

  // Загрузка при монтировании
  useEffect(() => {
    fetchMovies(searchTerm);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchMovies(term);
  };

  return (
    <main className="container content">
      <Search searchMovies={handleSearch} initialValue={searchTerm} />
      
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