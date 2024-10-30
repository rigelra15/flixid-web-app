import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 float-right mb-4"
        >
          Tutup ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
