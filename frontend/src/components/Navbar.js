import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar({ selectedCategory, setSelectedCategory, openModal }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchMovies = async (query) => {
    if (query === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/movies/search?search=${query}`
      );

      const textResponse = await response.text();
      console.log("Raw response:", textResponse);

      if (response.ok) {
        const results = JSON.parse(textResponse);
        setSearchResults(results);
      } else {
        console.error("Server error:", textResponse);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchMovies(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    setQuery("");
    setSearchResults([]);
  };

  return (
    <motion.div
      className="mb-6 px-52 py-4 relative flex items-center justify-between h-24 w-full bg-[#010f1d] bg-opacity-60 backdrop-blur-md z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between w-full">
        <motion.h1
          className="text-4xl font-bold text-white z-20"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Flix.id
        </motion.h1>

        {/* Jika isSearching true, tampilkan kolom pencarian, jika tidak, tampilkan navigasi kategori */}
        <div className="w-full absolute flex flex-col justify-center items-center top-6 left-0 right-0">
          <div className="bg-[#05203a] rounded-full flex flex-row items-center w-fit">
            <div className="flex justify-center space-x-1 px-0">
              {["All", "Movie", "Series", "Original"].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-4 rounded-full ${isSearching && "hidden"} ${
                    selectedCategory === category
                      ? "text-white font-semibold"
                      : "text-white opacity-40"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {category}
                </motion.button>
              ))}
              <div
                className={`relative flex items-center ${!isSearching && "hidden"}`}
              >
                {/* Kolom pencarian saat isSearching true */}
                <motion.input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-[#05203a] text-white px-4 py-2 rounded-full outline-none"
                  autoFocus
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                />

                {/* Tampilkan hasil pencarian saat pengguna mengetik */}
                {searchResults.length > 0 && (
                  <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg overflow-hidden z-50 max-h-64 overflow-y-auto">
                    {searchResults.map((movie) => (
                      <Link
                        to={`/movies/${movie.id}`}
                        key={movie.id}
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setQuery("")}
                      >
                        {movie.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <motion.button
                onClick={isSearching ? handleCloseSearch : handleSearchClick}
                className="ml-2 bg-white p-5 rounded-full text-white bg-opacity-20"
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.8 }}
              >
                {isSearching ? <FaTimes size={20} /> : <FaSearch size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        <motion.button
          onClick={openModal}
          className="border-2 z-20 border-white border-opacity-35 hover:bg-white hover:text-[#010f1d] text-white px-4 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300 ml-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus />
          Tambah Film
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Navbar;
