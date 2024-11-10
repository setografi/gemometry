import React from "react";
import Button from "../components/common/Button";

function HowPage({ setCurrentPage }) {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center z-10">
      <h1 className="text-dark-text-primary text-6xl font-bold mb-16">
        How to Play
      </h1>

      <p className="text-dark-text-primary text-2xl font-medium mb-16">
        Tap your screen to move the player
      </p>

      <Button setCurrentPage={setCurrentPage} />
    </section>
  );
}

export default HowPage;
