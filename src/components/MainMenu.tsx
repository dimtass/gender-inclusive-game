import React from 'react';

interface MainMenuProps {
  onPlayGame: () => void;
  onShowHighScores: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onPlayGame, onShowHighScores }) => {
  return (
    <div className="main-menu">
      <h1>Equality Pairs</h1>
      <button onClick={onPlayGame}>Play Game</button>
      <button onClick={() => alert("Instructions: Match pairs of cards representing gender equality concepts.")}>Instructions</button>
      <button onClick={onShowHighScores}>High Scores</button>
    </div>
  );
};

export default MainMenu;