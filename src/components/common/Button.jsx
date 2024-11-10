import React from "react";

function Button({ setCurrentPage }) {
  return (
    <button
      onClick={() => setCurrentPage("home")}
      className="flex flex-col justify-center items-center bg-accent-magenta-500 group hover:bg-accent-yellow-500 px-4 py-2 cursor-pointer"
    >
      <span className="text-dark-text-primary group-hover:text-light-text-primary text-xl font-medium">
        Back
      </span>
    </button>
  );
}

export default Button;
