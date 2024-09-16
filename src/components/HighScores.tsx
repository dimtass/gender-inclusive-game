import React, { useState, useEffect } from 'react';

interface HighScore {
  initials: string;
  score: number;
}

interface HighScoresProps {
  onBackToMenu: () => void;
}

const HighScores: React.FC<HighScoresProps> = ({ onBackToMenu }) => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    const storedScores = localStorage.getItem('highScores');
    if (storedScores) {
      setHighScores(JSON.parse(storedScores));
    }
  }, []);

  return (
    <div className="high-scores">
      <h2>High Scores</h2>
      {highScores.length > 0 ? (
        <ol>
          {highScores.map((score, index) => (
            <li key={index}>
              {score.initials}: {score.score}
            </li>
          ))}
        </ol>
      ) : (
        <p>No high scores yet!</p>
      )}
      <button onClick={onBackToMenu}>Back to Menu</button>
    </div>
  );
};

export default HighScores;