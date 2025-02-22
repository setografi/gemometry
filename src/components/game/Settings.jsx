import React from "react";
import Button from "../common/Button";

const Settings = ({ onClose }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-neutral-white text-base">
        <span>Music Volume</span>
        <input type="range" className="w-32" />
      </div>
      <div className="flex justify-between items-center text-neutral-white text-base">
        <span>Sound Effects</span>
        <input type="range" className="w-32" />
      </div>
      <div className="flex justify-between items-center text-neutral-white text-base">
        <span>Vibration</span>
        <input type="checkbox" />
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose} />
      </div>
    </div>
  );
};

export default Settings;
