import React from "react";
import Button from "../common/Button";

const HighScores = ({ onClose }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-neutral-white text-xl">Endless Mode:</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-neutral-white text-base">
          <span>1. Player123</span>
          <span>10,500</span>
        </div>
        <div className="flex justify-between text-neutral-white text-base">
          <span>2. AstroGamer</span>
          <span>9,800</span>
        </div>
        <div className="flex justify-between text-neutral-white text-base">
          <span>3. SpaceExplorer</span>
          <span>8,900</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose} />
      </div>
    </div>
  );
};

export default HighScores;
