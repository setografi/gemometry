import React from "react";

function Popup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-[#121212] bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-[#121212] bg-opacity-10 backdrop-blur-md rounded-lg p-10 max-w-sm w-full text-center shadow-lg border border-white border-opacity-20">
        <h2 className="text-2xl font-bold text-white mb-4">Congratulations!</h2>
        <p className="text-white mb-6">
          Now you know we all like 'Willow'. We always grow.
        </p>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
