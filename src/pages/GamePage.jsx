import React from "react";
import { Menu } from "lucide-react";
import { GameBoard } from "../components/game/GameBoard";
import { GameHeader } from "../components/layout/GameHeader";
import { GameOverModal } from "../components/game/GameOverModal";
import GameMenu from "../components/layout/GameMenu";
import Popup from "../components/common/Popup";
import VirtualPad from "../components/controller/VirtualPad";
import { useGameLogic } from "../hooks/useGameLogic";

function GamePage() {
  const {
    containerRef,
    canvasRef,
    dimensions,
    gameState,
    score,
    highScore,
    isMenuOpen,
    setIsMenuOpen,
    handleRestart,
    handleVirtualPadInput,
    activePowerUps,
    powerUpTimers,
    isEating,
  } = useGameLogic();

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden"
    >
      <div className="absolute top-4 px-6 z-20">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="bg-primary-900 bg-opacity-10 backdrop-blur-sm p-2 border border-primary-200 border-opacity-20 rounded-lg"
        >
          <Menu className="text-neutral-white" size={24} />
        </button>
      </div>

      <Popup
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Game Menu"
      >
        <GameMenu onClose={() => setIsMenuOpen(false)} />
      </Popup>

      <GameHeader
        score={score}
        highScore={highScore}
        activePowerUps={activePowerUps}
        powerUpTimers={powerUpTimers}
      />

      <GameBoard
        canvasRef={canvasRef}
        gameState={gameState}
        dimensions={dimensions}
        gridSize={20}
        isEating={isEating}
      />

      {gameState.isGameOver && (
        <GameOverModal score={score} onRestart={handleRestart} />
      )}

      <VirtualPad onDirectionChange={handleVirtualPadInput} />
    </section>
  );
}

export default GamePage;
