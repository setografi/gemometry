import React from "react";

function Popup({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#121212] bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-[#121212] bg-opacity-10 backdrop-blur-md rounded-lg p-10 max-w-sm w-full shadow-lg border border-white border-opacity-20">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Popup;
