import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import movieData from "../movies.json";
import Card from "./Card";
import PageUI from "./PageUI";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Select from "react-select";
import { useColor } from "../context/colorContext";
import BackgroundCarousel from "./BackgroundCarousel";

function Display() {
  
  const { darkMode, logout } = useColor();
  const [products] = useState(movieData);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [Rating, setRating] = useState("all");
  const [Genres, setGenres] = useState([]);
  const [Years, setYears] = useState("all");
  const [lengthRange, setLengthRange] = useState([60, 180]);

  const navigate = useNavigate();
  const PageSize = 72;

  function useDebouncedValue(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearch = useDebouncedValue(search, 300);

  const filteredMovies = products.filter((item) => {
    const query = debouncedSearch.toLowerCase();
    return (
      (typeof item.title === "string" &&
        item.title.toLowerCase().includes(query)) ||
      (typeof item.writers === "string" &&
        item.writers.toLowerCase().includes(query)) ||
      (typeof item.genres === "string" &&
        item.genres.toLowerCase().includes(query)) ||
      (Array.isArray(item.genres) &&
        item.genres.join(" ").toLowerCase().includes(query)) ||
      (typeof item.directors === "string" &&
        item.directors.toLowerCase().includes(query))
    );
  });

  const finalMovies = useMemo(() => {
    let movies = filteredMovies;

    if (Years !== "all") {
      const yearVal = parseInt(Years, 10);
      if (yearVal === 1700) {
        movies = movies.filter(
          (item) => item.release_year >= 1700 && item.release_year <= 1750
        );
      } else if (yearVal === 1750) {
        movies = movies.filter(
          (item) => item.release_year >= 1751 && item.release_year <= 1800
        );
      } else if (yearVal === 1800) {
        movies = movies.filter(
          (item) => item.release_year >= 1801 && item.release_year <= 1850
        );
      } else if (yearVal === 1850) {
        movies = movies.filter(
          (item) => item.release_year >= 1851 && item.release_year <= 1900
        );
      } else if (yearVal === 1900) {
        movies = movies.filter(
          (item) => item.release_year >= 1901 && item.release_year <= 1950
        );
      } else if (yearVal === 1950) {
        movies = movies.filter(
          (item) => item.release_year >= 1951 && item.release_year <= 2000
        );
      } else if (yearVal === 2000) {
        movies = movies.filter((item) => item.release_year >= 2001);
      }
    }

    if (Genres.length > 0) {
      movies = movies.filter((item) => {
        const itemGenres = Array.isArray(item.genres)
          ? item.genres
          : [item.genres];
        return Genres.some((g) => itemGenres.includes(g));
      });
    }

    if (Rating !== "all") {
      const ratingVal = parseInt(Rating, 10);
      if (ratingVal === 10) {
        movies = movies.filter((item) => item.imdb_rating === 10);
      } else if (ratingVal === 8) {
        movies = movies.filter(
          (item) => item.imdb_rating < 10 && item.imdb_rating >= 8
        );
      } else if (ratingVal === 6) {
        movies = movies.filter(
          (item) => item.imdb_rating < 8 && item.imdb_rating >= 6
        );
      } else if (ratingVal === 4) {
        movies = movies.filter(
          (item) => item.imdb_rating < 6 && item.imdb_rating >= 4
        );
      } else if (ratingVal === 3) {
        movies = movies.filter((item) => item.imdb_rating < 4);
      }
    }

    movies = movies.filter(
      (item) =>
        item.length_in_min >= lengthRange[0] &&
        item.length_in_min <= lengthRange[1]
    );

    return movies;
  }, [filteredMovies, Years, Genres, Rating, lengthRange]);

  const totalPages = Math.ceil(finalMovies.length / PageSize);
  const start = currentPage * PageSize;
  const end = start + PageSize;
  const paginatedMovies = finalMovies.slice(start, end);

  const ratings = [
    { label: "All", value: "all" },
    { label: "Excellent (10)", value: "10" },
    { label: "Great (8 - 9.9)", value: "8" },
    { label: "Good (6 - 7.9)", value: "6" },
    { label: "Average (4 - 5.9)", value: "4" },
    { label: "Poor (< 4)", value: "3" },
  ];

  const genres = [
    { label: "All", value: "all" },
    { label: "Romance", value: "Romance" },
    { label: "History", value: "History" },
    { label: "Biography", value: "Biography" },
    { label: "Drama", value: "Drama" },
    { label: "Adventure", value: "Adventure" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "War", value: "War" },
    { label: "Thriller", value: "Thriller" },
    { label: "Crime", value: "Crime" },
  ];

  const years = [
    { label: "All", value: "all" },
    { label: "1700 to 1750", value: "1700" },
    { label: "1751 to 1800", value: "1750" },
    { label: "1801 to 1850", value: "1800" },
    { label: "1851 to 1900", value: "1850" },
    { label: "1901 to 1950", value: "1900" },
    { label: "1951 to 2000", value: "1950" },
    { label: "2000 to 2500", value: "2000" },
  ];

  function handlePage(pageNum) {
    setCurrentPage(pageNum);
  }
  
  
  return (
    <>
      <BackgroundCarousel height="65vh" />
    <div className={darkMode ? "darkMode" : "lightMode"}>
      <div className="display-container">
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Movie Catalog
        </h1>

        {/* First Row: Search, Ratings, Years */}
        <div className="display-filters-row">
          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <SearchBar
              search={search}
              setSearch={setSearch}
              setCurrentPage={setCurrentPage}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="ratings">Ratings</label>
            <Filter
              menu={ratings}
              name={"rating"}
              setCurrentPage={setCurrentPage}
              setValue={setRating}
              value={Rating}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="years">Years</label>
            <Filter
              menu={years}
              name={"years"}
              setCurrentPage={setCurrentPage}
              setValue={setYears}
              value = {Years}
            />
          </div>
        </div>

        {/* Second Row: Length, Genres, Reset Filters */}
        <div className="display-filters-row">
          <div className="filter-group length-slider">
            <label htmlFor="length-range">
              Length (min): {lengthRange[0]} - {lengthRange[1]} mins
            </label>
            <input
              type="range"
              min={60}
              max={240}
              step={5}
              value={lengthRange[0]}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                if (newMin <= lengthRange[1] - 5) {
                  setLengthRange([newMin, lengthRange[1]]);
                }
              }}
            />
            <input
              type="range"
              min={60}
              max={240}
              step={5}
              value={lengthRange[1]}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                if (newMax >= lengthRange[0] + 5) {
                  setLengthRange([lengthRange[0], newMax]);
                }
              }}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="genres">Genres</label>
            <Select
              isMulti
              options={genres.slice(1)}
              value={Genres.map((g) => ({ value: g, label: g }))}
              onChange={(selectedOptions) => {
                setGenres(selectedOptions.map((opt) => opt.value));
                setCurrentPage(0);
              }}
              placeholder="Select genres..."
              className="genre-select"
              classNamePrefix="select"
            />
          </div>

          <div className="filter-group" style={{
            display: "flex",
            alignItems: "flex-end", // Align to the bottom of the row if others are taller
          }}>
            <button
              onClick={() => {
                setSearch("");
                setRating("all");
                setGenres([]);
                setYears("all");
                setLengthRange([60, 180]);
                setCurrentPage(0);
              }}
              style={{
                background: darkMode ? "#ffd600" : "#7b1f24",
                color: darkMode ? "#23272f" : "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.6rem 1.5rem",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
                width: "100%", // Make the button fill its container
                minHeight: "44px" // Match height of other inputs
              }}
            >
              Reset Filters
            </button>
          </div>
        </div> {/* End of display-filters-row for second row */}

        <div className="movie-container">
          {paginatedMovies.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              img={item.poster}
              rating={item.imdb_rating}
              genre={item.genres}
              className={darkMode ? "dark-card" : "light-card"}
              item={item}
            />
          ))}
        </div>

        <PageUI
          handlePage={handlePage}
          totalPages={totalPages}
          curretpage={currentPage}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
        />
      </div>
    </div>
    </>
  );
}

export default Display;