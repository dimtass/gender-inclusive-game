# Equality Pairs

Equality Pairs is an educational memory matching game designed to promote gender equality concepts to children aged 6-13. The game features a grid of cards that players flip to find matching pairs, with each pair representing a gender equality concept.

> Fun fact:
> The code of this repo was created using [Anthropic Claude 3.5 Sonnet](https://claude.ai/) and the images were created using the `Pixar Style XL` model from [openart.io](https://openart.ai/)

## Features

- Responsive game board with flippable cards
- Score tracking and timer
- High score system
- Countdown before game start
- Matched concept explanations
- Card flip animations

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory in your terminal
3. Run the following command to install the dependencies:

```
npm install
```

### Running the Game

To start the development server and play the game, run:

```
npm start
```

This will start the game on `http://localhost:3000`. Open this URL in your web browser to play the game.

### Building for Production

To create a production build of the game, run:

```
npm run build
```

This will create a `build` directory with optimized production files that can be deployed to a web server.

## How to Play

1. Click the "Play Game" button on the main menu to start a new game.
2. Wait for the countdown to finish.
3. Click on cards to flip them over.
4. Try to find matching pairs of cards.
5. When you find a match, you'll see a brief explanation of the gender equality concept.
6. Continue until all pairs are matched.
7. Your score and time will be recorded, and you can try to beat your high score!

## Technologies Used

- React
- TypeScript
- CSS

## Future Improvements

- Add more card decks with different themes
- Implement difficulty levels (e.g., larger grids, time limits)
- Create a system for educators to customize card decks
- Add sound effects and background music
- Implement accessibility features for keyboard navigation and screen readers

Enjoy playing Equality Pairs and learning about gender equality!
