import React from "react";
import { X } from "lucide-react";

const Button = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors ${className}`}
    >
      <X className="w-6 h-6 text-white" />
    </button>
  );
};

export default Button;
