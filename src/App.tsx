import React, { useState } from 'react';
import './App.css';
import './components/Components.css';
import MainMenu from './components/MainMenu';
import GameBoard from './components/GameBoard';
import HighScores from './components/HighScores';

enum GameState {
  MAIN_MENU,
  PLAYING,
  HIGH_SCORES,
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MAIN_MENU);

  const startGame = () => {
    setGameState(GameState.PLAYING);
  };

  const showHighScores = () => {
    setGameState(GameState.HIGH_SCORES);
  };

  const backToMainMenu = () => {
    setGameState(GameState.MAIN_MENU);
  };

  return (
    <div className="App">
      {gameState === GameState.MAIN_MENU && (
        <MainMenu
          onPlayGame={startGame}
          onShowHighScores={showHighScores}
        />
      )}
      {gameState === GameState.PLAYING && (
        <GameBoard
          onReturnToMainMenu={backToMainMenu}
        />
      )}
      {gameState === GameState.HIGH_SCORES && (
        <HighScores onBackToMenu={backToMainMenu} />
      )}
    </div>
  );
};

export default App;
