import React from "react";
import Button from "../common/Button";

const About = ({ onClose }) => {
  return (
    <div className="space-y-4">
      <p className="text-neutral-white text-xl">
        "Gemo and The Astro Code" is an exciting space-themed snake game where
        you guide Gemo through the cosmic void, collecting astro-fragments and
        growing stronger while avoiding celestial obstacles.
      </p>
      <p className="text-primary-200 text-base">Version 1.0.0</p>

      <div className="flex justify-end">
        <Button onClick={onClose} />
      </div>
    </div>
  );
};

export default About;
