import { useRef, useState } from "react";
import { ScoringSystem } from "../utils/systems/ScoringSystem";
import { FoodSystem } from "../utils/systems/FoodSystem";
import { PowerUpSystem } from "../utils/systems/PowerUpSystem";

export function useGameSystems() {
  const scoringSystem = useRef(new ScoringSystem());
  const foodSystem = useRef(new FoodSystem(20));
  const powerUpSystem = useRef(new PowerUpSystem(20));
  const [activePowerUps, setActivePowerUps] = useState(new Map());
  const [powerUpTimers, setPowerUpTimers] = useState(new Map());

  const updatePowerUpTimer = (powerUpType, remaining) => {
    setPowerUpTimers((prev) => new Map(prev).set(powerUpType, remaining));
  };

  const updateActivePowerUp = (powerUpType, powerUpData) => {
    setActivePowerUps((prev) => {
      const newMap = new Map(prev);
      if (powerUpData === null) {
        newMap.delete(powerUpType);
      } else {
        newMap.set(powerUpType, powerUpData);
      }
      return newMap;
    });
  };

  return {
    scoringSystem,
    foodSystem,
    powerUpSystem,
    activePowerUps,
    powerUpTimers,
    updatePowerUpTimer,
    updateActivePowerUp,
  };
}
