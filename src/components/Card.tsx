import React from 'react';

interface CardProps {
  id: string;
  imageUrl: string;
  job: string;
  gender: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, job, gender, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <div className="card-logo">?</div>
        </div>
        <div className="card-back">
          <img src={imageUrl} alt={`${job} - ${gender}`} />
        </div>
      </div>
    </div>
  );
};

export default Card;