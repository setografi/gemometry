import React from "react";
import Button from "../common/Button";

const About = ({ onClose }) => {
  return (
    <div className="relative">
      <Button onClick={onClose} />

      <div className="space-y-4 mt-6">
        <p>
          "Gemo and The Astro Code" is an exciting space-themed snake game where
          you guide Gemo through the cosmic void, collecting astro-fragments and
          growing stronger while avoiding celestial obstacles.
        </p>
        <p className="text-sm text-gray-400">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default About;
