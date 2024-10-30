import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const ModalFilm = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  isEditing,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`bg-white ${formData.cover ? "rounded-[36px]" : "rounded-3xl"} shadow-lg p-0 w-full max-w-fit mx-4 max-h-[80vh] flex flex-row text-black`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {formData.cover && (
            <div className="pl-6 py-6">
              <img
                src={formData.cover}
                alt={formData.title}
                className="w-[480px] object-cover rounded-3xl"
                style={{ aspectRatio: "2 / 3" }}
              />
            </div>
          )}
          <motion.div
            className="flex flex-col p-6 w-96"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {isEditing ? "Edit Film" : "Tambah Film"}
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:bg-red-600 rounded-xl bg-red-500 size-9 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-grow max-h-[70vh] px-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="title" className="mb-1 font-medium">
                    Judul
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Judul"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="overview" className="mb-1 font-medium">
                    Ringkasan
                  </label>
                  <textarea
                    name="overview"
                    id="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    placeholder="Ringkasan"
                    className="border p-3 rounded-xl w-full h-32"
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="rating" className="mb-1 font-medium">
                    Rating
                  </label>
                  <input
                    type="text"
                    name="rating"
                    id="rating"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="cover" className="mb-1 font-medium">
                    Link Cover
                  </label>
                  <input
                    type="text"
                    name="cover"
                    id="cover"
                    value={formData.cover}
                    onChange={handleChange}
                    placeholder="Cover URL"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="genre" className="mb-1 font-medium">
                    Genre
                  </label>
                  <input
                    type="text"
                    name="genre"
                    id="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Genre"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="release_date" className="mb-1 font-medium">
                    Tanggal Rilis
                  </label>
                  <input
                    type="date"
                    name="release_date"
                    id="release_date"
                    value={formData.release_date}
                    onChange={handleChange}
                    placeholder="Tanggal Rilis"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="duration" className="mb-1 font-medium">
                    Durasi
                  </label>
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    min={0}
                    max={1000}
                    placeholder="Durasi"
                    value={formData.duration}
                    onChange={handleChange}
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="age_rating" className="mb-1 font-medium">
                    Rating Umur
                  </label>
                  <input
                    type="text"
                    name="age_rating"
                    id="age_rating"
                    value={formData.age_rating}
                    onChange={handleChange}
                    placeholder="Rating Umur"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="trailer" className="mb-1 font-medium">
                    URL Trailer
                  </label>
                  <input
                    type="text"
                    name="trailer"
                    id="trailer"
                    value={formData.trailer}
                    onChange={handleChange}
                    placeholder="URL Trailer"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="category" className="mb-1 font-medium">
                    Kategori
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-3 rounded-xl w-full"
                    required
                  >
                    <option value="Movie">Movie</option>
                    <option value="Series">Series</option>
                    <option value="Original">Original</option>
                  </select>
                </div>
              </form>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#010f1d] text-white px-4 py-2.5 rounded-xl w-full mt-4"
            >
              {isEditing ? "Perbarui Film" : "Tambah Film"}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalFilm;
