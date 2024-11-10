import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  const handleLinkClick = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <nav className="absolute w-full h-full flex flex-col justify-center items-center">
        <div className="mb-16">
          <h1 className="text-light-text-primary text-6xl">Gemometry</h1>
        </div>

        <ul className="grid grid-rows-3 gap-4 justify-center items-center">
          <li
            onClick={handleLinkClick}
            className="w-40 h-12 flex flex-col justify-center items-center bg-accent-yellow-500 group hover:bg-accent-cyan-500"
          >
            <Link
              to="/start"
              className="text-light-text-primary group-hover:text-dark-text-primary text-xl font-medium"
            >
              Start
            </Link>
          </li>
          <li
            onClick={handleLinkClick}
            className="w-40 h-12 flex flex-col justify-center items-center bg-accent-yellow-500 group hover:bg-accent-cyan-500"
          >
            <Link
              to="/"
              className="text-light-text-primary group-hover:text-dark-text-primary text-xl font-medium"
            >
              How to Play
            </Link>
          </li>
          <li
            onClick={handleLinkClick}
            className="w-40 h-12 flex flex-col justify-center items-center bg-accent-yellow-500 group hover:bg-accent-cyan-500"
          >
            <Link
              to="/"
              className="text-light-text-primary group-hover:text-dark-text-primary text-xl font-medium"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    )
  );
}

export default Navbar;
