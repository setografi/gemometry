import React from "react";

const Button = ({ onClick, className = "" }) => {
  return (
    <button onClick={onClick} className={`group ${className}`}>
      <span className="text-neutral-white group-hover:text-primary-400 duration-300 transition-colors">
        Back
      </span>
    </button>
  );
};

export default Button;
