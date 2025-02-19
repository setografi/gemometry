import React from "react";
import Button from "../common/Button";

const Settings = ({ onClose }) => {
  return (
    <div className="relative">
      <Button onClick={onClose} />
      <div className="space-y-4 mt-6">
        <div className="flex justify-between items-center">
          <span>Music Volume</span>
          <input type="range" className="w-32" />
        </div>
        <div className="flex justify-between items-center">
          <span>Sound Effects</span>
          <input type="range" className="w-32" />
        </div>
        <div className="flex justify-between items-center">
          <span>Vibration</span>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
