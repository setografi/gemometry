import React from "react";
import Button from "../components/common/Button";

function AboutPage({ setCurrentPage }) {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center z-10">
      <h1 className="text-dark-text-primary text-6xl font-bold mb-16">
        About Me?
      </h1>

      <p className="text-dark-text-primary text-2xl font-medium mb-16">
        This game is still in the development stage, so sorry if there are still
        some bugs
      </p>

      <Button setCurrentPage={setCurrentPage} />
    </section>
  );
}

export default AboutPage;
