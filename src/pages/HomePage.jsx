import React from "react";

function HomePage({ setCurrentPage }) {
  return (
    <section className="absolute w-full h-full flex flex-col justify-center items-center z-10">
      <div className="mb-16">
        <h1 className="text-dark-text-primary text-6xl font-bold">Gemometry</h1>
      </div>

      <nav>
        <ul className="grid grid-rows-3 gap-4 justify-center items-center">
          <li
            className="w-40 h-12 flex flex-col justify-center items-center bg-accent-magenta-500 group hover:bg-accent-yellow-500 cursor-pointer"
            onClick={() => setCurrentPage("start")}
          >
            <span className="text-dark-text-primary group-hover:text-light-text-primary text-xl font-medium">
              Start
            </span>
          </li>
          <li
            className="w-40 h-12 flex flex-col justify-center items-center bg-accent-magenta-500 group hover:bg-accent-yellow-500 cursor-pointer"
            onClick={() => setCurrentPage("how-to-play")}
          >
            <span className="text-dark-text-primary group-hover:text-light-text-primary text-xl font-medium">
              How to Play
            </span>
          </li>
          <li
            className="w-40 h-12 flex flex-col justify-center items-center bg-accent-magenta-500 group hover:bg-accent-yellow-500 cursor-pointer"
            onClick={() => setCurrentPage("about")}
          >
            <span className="text-dark-text-primary group-hover:text-light-text-primary text-xl font-medium">
              About
            </span>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default HomePage;
