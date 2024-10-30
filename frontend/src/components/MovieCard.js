import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaEdit, FaTrash, FaPlay } from "react-icons/fa";

const MovieCard = ({ movie, onDelete, onEdit, onPlayTrailer }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTrailerOpen, setIsModalTrailerOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModalTrailer = () => setIsModalTrailerOpen(true);
  const handleCloseModalTrailer = () => setIsModalTrailerOpen(false);

  return (
    <>
      <motion.div
        className="rounded-3xl overflow-hidden w-[220px] cursor-pointer text-black"
        whileHover={{ scale: 1.02 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenModal}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <img
            src={movie.cover}
            alt={movie.title}
            className="w-[300px] object-cover rounded-[28px]"
            style={{ aspectRatio: "2 / 3" }}
          />

          {isHovered && (
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(movie);
                }}
                className="bg-blue-500 text-white p-2.5 rounded-full hover:bg-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(movie.id);
                }}
                className="bg-red-500 text-white p-2.5 rounded-full hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          )}

          <span className="text-opacity-60 font-medium absolute top-7 left-0 bg-white px-3 py-1 rounded-r-lg text-black">
            {new Date(movie.release_date).getFullYear()}
          </span>
        </div>

        <div className="p-5">
          <h2 className="font-bold text-xl mb-2 text-white">{movie.title}</h2>
          <div className="flex items-center mb-2">
            <FaStar className="text-yellow-500" />
            <span className="ml-2 text-white text-opacity-60 font-medium">
              {movie.rating}/10
            </span>
            <span
              className={`ml-2 px-3 py-1 rounded-full bg-opacity-20 text-white font-medium ${
                movie.category === "Movie"
                  ? "bg-gradient-to-r from-green-400 to-green-700"
                  : movie.category === "Series"
                    ? "bg-gradient-to-r from-purple-400 to-purple-700"
                    : movie.category === "Original"
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-700"
                      : "bg-gradient-to-r from-gray-400 to-gray-700"
              }`}
            >
              {movie.category}
            </span>
          </div>
          <span className="text-white text-opacity-60 font-medium">
            {movie.genre}
          </span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
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
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                onClick={handleCloseModal}
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
                  <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
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
                    {new Date(movie.release_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 text-justify">{movie.overview}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieCard;
