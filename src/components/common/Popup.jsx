import React from "react";

function Popup({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary-900 bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-primary-900 bg-opacity-10 backdrop-blur-md rounded-lg p-8 max-w-sm w-full shadow-lg border border-primary-200 border-opacity-20">
        <h2 className="text-3xl md:text-4xl text-neutral-white mb-4">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

export default Popup;
