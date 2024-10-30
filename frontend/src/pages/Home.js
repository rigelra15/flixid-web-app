import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import ModalDelete from "../components/ModalDelete";
import ModalFilm from "../components/ModalFilm";
import Navbar from "../components/Navbar";
import ModalTrailer from "../components/ModalTrailer";
import {
  FaFire,
  FaHeart,
  FaFilm,
  FaStar,
  FaGhost,
  FaCrown,
} from "react-icons/fa";
import { motion } from "framer-motion";

function Home() {
  const [movies, setMovies] = useState([]);
  const [bannerMovies, setBannerMovies] = useState([]); // State untuk menyimpan film banner
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    overview: "",
    rating: 1,
    cover: "",
    genre: "",
    release_date: "",
    duration: "",
    category: "Movie",
    age_rating: "SU",
    trailer: "",
    episode: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [movieToDelete, setMovieToDelete] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/movies");
      const formattedMovies = response.data.map((movie) => ({
        id: movie[0],
        title: movie[1],
        overview: movie[2],
        rating: movie[3],
        cover: movie[4],
        genre: movie[5] || "Movie",
        release_date: new Date(movie[6]).toISOString().split("T")[0],
        duration: movie[7],
        category: movie[8] || "Movie",
        age_rating: movie[9] || "SU",
        trailer: movie[10],
        episode: movie[11],
      }));
      setMovies(formattedMovies);
      selectRandomBanners(formattedMovies); // Pilih dua film acak untuk banner setelah data di-fetch
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fungsi untuk memilih dua film acak yang berbeda
  const selectRandomBanners = (movies) => {
    if (movies.length < 2) return; // Pastikan ada minimal 2 film

    // Pilih dua indeks acak yang berbeda
    const firstIndex = Math.floor(Math.random() * movies.length);
    let secondIndex = Math.floor(Math.random() * movies.length);
    while (secondIndex === firstIndex) {
      secondIndex = Math.floor(Math.random() * movies.length);
    }

    // Setel state bannerMovies dengan dua film yang dipilih
    setBannerMovies([movies[firstIndex], movies[secondIndex]]);
  };

  const openDeleteModal = (movie) => {
    setMovieToDelete(movie);
    setIsDeleteModalOpen(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: null,
      title: "",
      overview: "",
      rating: 1,
      cover: "",
      genre: "",
      release_date: "",
      duration: "",
      category: "Movie",
      age_rating: "SU",
      trailer: "",
      episode: 0,
    });
  };

  const categories = [
    { title: "All Movies", filter: "Movie" },
    { title: "All Series", filter: "Series" },
    { title: "All Originals", filter: "Original" },
  ];

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-20">
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          openModal={() => {
            setIsEditing(false);
            openModal();
          }}
        />
      </div>

      <div
        className="container mx-auto p-4 text-white w-full min-h-screen"
        style={{ backgroundColor: "#010f1d" }}
      >
        <div className="flex flex-row gap-4 mt-28 mb-12 w-full">
          {bannerMovies.map((movie) => (
            <div
              key={movie.id}
              className="w-full h-64 flex items-center rounded-2xl shadow-lg relative overflow-hidden bg-[#869daa]"
            >
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${movie.cover})`,
                }}
              ></div>

              <div className="relative z-10 w-1/2 pl-8 text-white">
                <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
                <button
                  onClick={() => {
                    <motion.div
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 overflow-y-auto backdrop-grayscale text-black"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="bg-white rounded-3xl w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-h-[90vh] overflow-hidden relative"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <button
                          // onClick={handleCloseModal}
                          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/2 flex-shrink-0">
                            <img
                              src={movie.cover}
                              alt={movie.title}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div className="p-6 md:w-1/2 overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-2">
                              {movie.title}
                            </h2>
                            <div className="flex items-center mb-2">
                              <span className="text-white font-medium bg-gray-700 px-3 py-1 rounded-full mr-2">
                                {movie.age_rating}
                              </span>
                              <span
                                className={`text-white font-medium ${
                                  movie.category === "Movie"
                                    ? "bg-gradient-to-r from-green-400 to-green-700"
                                    : movie.category === "Series"
                                      ? "bg-gradient-to-r from-purple-400 to-purple-700"
                                      : movie.category === "Original"
                                        ? "bg-gradient-to-r from-yellow-400 to-yellow-700"
                                        : "bg-gradient-to-r from-gray-400 to-gray-700"
                                } px-3 py-1 rounded-full mr-2`}
                              >
                                {movie.category}
                              </span>
                              <FaStar className="text-yellow-500" />
                              <span className="ml-2 text-gray-700 font-medium">
                                {movie.rating}/10
                              </span>
                            </div>
                            <span className="text-gray-700 font-medium">
                              {movie.genre}
                            </span>
                            <p className="text-gray-700 mb-4">
                              <strong>Tanggal Rilis:</strong>{" "}
                              {new Date(
                                movie.release_date
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 text-justify">
                              {movie.overview}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>;
                  }}
                  className="flex items-center text-sm font-semibold mt-2 px-4 py-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition"
                >
                  <span className="mr-2 bg-white rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6.5 5.5L15 10L6.5 14.5V5.5Z" />
                    </svg>
                  </span>
                  Let Play Movie
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
          {[
            { name: "Trending", icon: <FaFire /> },
            { name: "Action", icon: <FaStar /> },
            { name: "Romance", icon: <FaHeart /> },
            { name: "Animation", icon: <FaFilm /> },
            { name: "Horror", icon: <FaGhost /> },
            { name: "Special", icon: <FaCrown /> },
          ].map((category) => (
            <div
              key={category.name}
              className="flex flex-row gap-4 justify-center items-center px-8 py-6 bg-white bg-opacity-15 backdrop-blur-lg rounded-3xl text-center min-w-[150px] cursor-pointer hover:bg-opacity-30 hover:border transition-all text-white"
            >
              <div className="text-3xl">{category.icon}</div>
              <span className="text-lg font-semibold drop-shadow-md">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 drop-shadow-lg">
            Trending in Animation
          </h2>
          <div className="flex flex-wrap justify-start gap-4">
            {movies
              .filter((movie) =>
                movie.genre.toLowerCase().includes("animation")
              )
              .map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onDelete={() => openDeleteModal(movie)}
                  onEdit={() => {
                    setFormData(movie);
                    setIsEditing(true);
                    openModal();
                  }}
                  onPlayTrailer={() => {
                    setFormData(movie);
                    setIsTrailerModalOpen(true);
                  }}
                />
              ))}
          </div>
        </div>

        {categories.map((section) => (
          <div key={section.filter} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 drop-shadow-lg">
              {section.title}
            </h2>
            <div className="flex flex-wrap justify-start gap-4">
              {movies
                .filter((movie) => movie.category === section.filter)
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onDelete={() => openDeleteModal(movie)}
                    onEdit={() => {
                      setFormData(movie);
                      setIsEditing(true);
                      openModal();
                    }}
                    onPlayTrailer={() => {
                      setFormData(movie);
                      setIsTrailerModalOpen(true);
                    }}
                  />
                ))}
            </div>
          </div>
        ))}

        <ModalFilm
          isOpen={isModalOpen}
          onClose={closeModal}
          formData={formData}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          handleSubmit={async (e) => {
            e.preventDefault();
            if (isEditing) {
              await axios.put(
                `http://localhost:5000/movies/${formData.id}`,
                formData
              );
            } else {
              await axios.post("http://localhost:5000/movies", formData);
            }
            fetchMovies();
            closeModal();
          }}
          isEditing={isEditing}
        />
        <ModalDelete
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={async () => {
            if (movieToDelete) {
              await axios.delete(
                `http://localhost:5000/movies/${movieToDelete.id}`
              );
              fetchMovies();
              setIsDeleteModalOpen(false);
            }
          }}
          movieTitle={movieToDelete?.title}
        />
        <ModalTrailer
          isOpen={isTrailerModalOpen}
          onClose={() => setIsTrailerModalOpen(false)}
          trailerUrl={formData.trailer}
        />
      </div>
    </>
  );
}

export default Home;
