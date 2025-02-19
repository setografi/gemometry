import React from "react";
import Button from "../common/Button";

const HighScores = ({ onClose }) => {
  return (
    <div className="relative">
      <Button onClick={onClose} />

      <div className="space-y-4 mt-6">
        <div className="bg-purple-900/50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Endless Mode</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>1. Player123</span>
              <span>10,500</span>
            </div>
            <div className="flex justify-between">
              <span>2. AstroGamer</span>
              <span>9,800</span>
            </div>
            <div className="flex justify-between">
              <span>3. SpaceExplorer</span>
              <span>8,900</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighScores;
