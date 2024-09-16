import React, { useState, useEffect, useCallback, useRef } from 'react';
import Card from './Card';
import './GameBoard.css';

interface CardData {
  id: string;
  imageUrl: string;
  job: string;
  gender: string;
}

interface GameBoardProps {
  onReturnToMainMenu: () => void;
}

interface CardPair {
  boy: string;
  girl: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
  onReturnToMainMenu,
}) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchedConcepts, setMatchedConcepts] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [matchedConcept, setMatchedConcept] = useState<string | null>(null);
  const [numberOfCards, setNumberOfCards] = useState<number>(8);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [congratulationMessage, setCongratulationMessage] = useState('');
  const previousFlippedCards = useRef<string[]>([]);

  const saveHighScore = useCallback((finalScore: number) => {
    const storedScores = localStorage.getItem('highScores');
    let highScores = storedScores ? JSON.parse(storedScores) : [];
    const newScore = { score: finalScore, time: timer };
    
    highScores.push(newScore);
    highScores.sort((a: any, b: any) => b.score - a.score || a.time - b.time);
    highScores = highScores.slice(0, 10); // Keep only top 10 scores
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }, [timer]);

  const initializeCards = useCallback(async () => {
    try {
      // Fetch the image list from the JSON file
      const response = await fetch('/imageList.json');
      const data = await response.json();
      const imageFiles: string[] = data.images;

      // Group images into boy-girl pairs
      const cardPairs = imageFiles.reduce((acc: Record<string, CardPair>, file: string) => {
        const [job, gender] = file.replace('.jpg', '').split('-');
        if (!acc[job]) {
          acc[job] = { boy: '', girl: '' };
        }
        acc[job][gender as 'boy' | 'girl'] = `/images/${file}`;
        return acc;
      }, {});

      // Filter out incomplete pairs and convert to array
      const completePairs = Object.entries(cardPairs)
        .filter(([_, pair]) => pair.boy && pair.girl)
        .map(([job, pair]) => ({ job, ...pair }));

      // Shuffle the complete pairs
      for (let i = completePairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [completePairs[i], completePairs[j]] = [completePairs[j], completePairs[i]];
      }

      // Select the required number of pairs
      const selectedPairs = completePairs.slice(0, numberOfCards / 2);

      // Create card data from selected pairs
      const selectedCards = selectedPairs.flatMap(pair => [
        { id: `${pair.job}-boy`, job: pair.job, gender: 'boy', imageUrl: pair.boy },
        { id: `${pair.job}-girl`, job: pair.job, gender: 'girl', imageUrl: pair.girl }
      ]);

      // Shuffle the selected cards
      for (let i = selectedCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedCards[i], selectedCards[j]] = [selectedCards[j], selectedCards[i]];
      }

      setCards(selectedCards);
    } catch (error) {
      console.error('Error initializing cards:', error);
    }
  }, [numberOfCards]);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    if (gameStarted && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [gameStarted, countdown]);

  useEffect(() => {
    if (gameStarted && countdown === 0 && !isGameEnded) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, countdown, isGameEnded]);

  useEffect(() => {
    if (gameStarted && countdown === 0 && cards.length > 0 && matchedPairs.length === cards.length) {
      setIsGameEnded(true);
      saveHighScore(score);
      setCongratulationMessage(`Congratulations! You've completed the game in ${timer} seconds with a score of ${score}. Remember, boys and girls can do the same things. Gender doesn't limit your abilities or career choices!`);
    }
  }, [gameStarted, countdown, cards.length, matchedPairs.length, score, timer, saveHighScore]);

  useEffect(() => {
    if (flippedCards.length === 2 && 
        (flippedCards[0] !== previousFlippedCards.current[0] || flippedCards[1] !== previousFlippedCards.current[1])) {
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.job === secondCard.job && firstCard.gender !== secondCard.gender) {
        // Match found
        setMatchedPairs((prevMatchedPairs) => [...prevMatchedPairs, firstCardId, secondCardId]);
        const newScore = score + 10;
        setScore(newScore);
        if (!matchedConcepts.includes(firstCard.job)) {
          setMatchedConcepts((prevConcepts) => [...prevConcepts, firstCard.job]);
        }
        setMatchedConcept(`${firstCard.job.charAt(0).toUpperCase() + firstCard.job.slice(1)}s can be any gender. Both boys and girls can excel in this role.`);
        setTimeout(() => {
          setMatchedConcept(null);
          setFlippedCards([]); // Reset flipped cards after a match
        }, 1500); // Changed from 5000 to 1500 milliseconds
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }

      previousFlippedCards.current = flippedCards;
    }
  }, [flippedCards, cards, score, matchedConcepts]);

  const handleCardClick = (id: string) => {
    if (!gameStarted || countdown > 0 || flippedCards.length === 2 || matchedPairs.includes(id) || isGameEnded) {
      return;
    }

    setFlippedCards((prevFlippedCards) => {
      if (prevFlippedCards.includes(id)) {
        return prevFlippedCards;
      }
      if (prevFlippedCards.length === 2) {
        return [prevFlippedCards[0], id];
      }
      return [...prevFlippedCards, id];
    });
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfCards(Number(event.target.value));
  };

  const startGame = () => {
    setGameStarted(false);  // Reset game started state
    setScore(0);
    setTimer(0);
    setMatchedPairs([]);
    setMatchedConcepts([]);
    setFlippedCards([]);
    setCountdown(3);
    setCards([]);
    setIsGameEnded(false);
    setCongratulationMessage('');
    previousFlippedCards.current = [];
    
    // Use setTimeout to ensure all state updates have been processed
    setTimeout(() => {
      setGameStarted(true);
      initializeCards();
    }, 0);
  };

  const playAgain = () => {
    startGame();
  };

  if (!gameStarted) {
    return (
      <div className="card-selection">
        <h2>Select number of cards:</h2>
        <select value={numberOfCards} onChange={handleCardNumberChange}>
          <option value={6}>6 cards</option>
          <option value={8}>8 cards</option>
          <option value={12}>12 cards</option>
          <option value={18}>18 cards</option>
          <option value={20}>20 cards</option>
          <option value={24}>24 cards</option>
        </select>
        <button onClick={startGame}>Start Game</button>
      </div>
    );
  }

  if (countdown > 0) {
    return <div className="countdown">Get Ready! {countdown}</div>;
  }

  return (
    <div className="game-board">
      <div className="game-info">
        <p>Score: {score}</p>
        <p>Time: {timer} seconds</p>
        <p>Matched Pairs: {matchedPairs.length / 2} / {cards.length / 2}</p>
      </div>
      {matchedConcept && <div className="matched-concept">{matchedConcept}</div>}
      <div className={`card-grid cards-${numberOfCards}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            isFlipped={flippedCards.includes(card.id) || matchedPairs.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {isGameEnded && (
        <div className="game-end-overlay">
          <div className="game-end-message">
            <p>{congratulationMessage}</p>
            <div className="game-end-buttons">
              <button onClick={playAgain}>Play Again</button>
              <button onClick={onReturnToMainMenu}>Main Menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;