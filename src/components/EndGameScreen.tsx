import React from 'react';

interface EndGameScreenProps {
  score: number;
  timeTaken: number;
  matchedConcepts: string[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const EndGameScreen: React.FC<EndGameScreenProps> = ({
  score,
  timeTaken,
  matchedConcepts,
  onPlayAgain,
  onBackToMenu,
}) => {
  return (
    <div className="end-game-screen">
      <h2>Game Over!</h2>
      <p>Final Score: {score}</p>
      <p>Time Taken: {timeTaken} seconds</p>
      <h3>Matched Concepts:</h3>
      <ul>
        {matchedConcepts.map((concept, index) => (
          <li key={index}>{concept}</li>
        ))}
      </ul>
      <button onClick={onPlayAgain}>Play Again</button>
      <button onClick={onBackToMenu}>Back to Menu</button>
    </div>
  );
};

export default EndGameScreen;