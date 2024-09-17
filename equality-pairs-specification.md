# Equality Pairs: Product Specification

## 1. Project Overview

"Equality Pairs" is a web-based memory matching game designed to promote gender equality concepts to children aged 6-13. The game features a grid of cards that players flip to find matching pairs, with each pair representing a gender equality concept.

## 2. Core Functionality

### 2.1 Game Mechanics

- **Card Grid**: Implement a grid of face-down cards (4x4 for beginners, 5x5 for advanced).
- **Card Flipping**: Allow players to flip two cards at a time by clicking or tapping.
- **Matching Logic**: 
  - If the two flipped cards match, keep them face-up.
  - If they don't match, flip them back face-down after a short delay (e.g., 1 second).
- **Game Completion**: The game ends when all pairs are matched.

### 2.2 Scoring System

- Award points for each successful match (e.g., 10 points per match).
- Implement a timer to track game duration.
- Calculate final score based on points and time taken.
- Store and display high scores using local storage.

### 2.3 Educational Content

- Display a brief fact or question about gender equality when a match is made.
- Show a summary of matched concepts and learned facts at the end of each game.

## 3. User Interface

### 3.1 Main Menu

- Play Game button
- Instructions button
- High Scores button

### 3.2 Game Screen

- Card grid (centered)
- Score display
- Timer display
- Back to Menu button

### 3.3 End Game Screen

- Final score display
- Time taken display
- Summary of matched concepts
- Play Again button
- Back to Menu button

### 3.4 High Scores Screen

- Display top 10 scores with player initials
- Back to Menu button

## 4. Technical Specifications

### 4.1 Responsive Design

- Implement a responsive layout that works on both desktop and mobile devices.
- Use relative units (e.g., %, vh, vw) for sizing elements.
- Implement touch events for mobile play.

### 4.2 Card System

- Create a Card component with properties:
  - id: unique identifier
  - imageUrl: path to card image
  - concept: string describing the equality concept
  - isFlipped: boolean to track card state
- Implement a deck of at least 16 unique cards (8 pairs) for the 4x4 grid.

### 4.3 State Management

- Track game state including:
  - Current score
  - Time elapsed
  - Flipped cards
  - Matched pairs
  - Game completion status

### 4.4 Local Storage

- Use browser's localStorage to persist high scores.

### 4.5 Animations

- Implement smooth flip animations for cards.
- Add subtle animations for successful matches and game completion.

## 5. Content Requirements

### 5.1 Card Images

- Create or source 16 vector-based images representing diverse individuals in various roles.
- Ensure images are clear and distinguishable at small sizes.
- Use an equal number of male and female representations.

### 5.2 Educational Content

- Develop a database of at least 20 age-appropriate facts or questions about gender equality.
- Ensure content is scientifically accurate and up-to-date.

## 6. Performance Requirements

- Initial load time should be under 3 seconds on average broadband connections.
- Animations should run at 60 fps for smooth user experience.
- The game should function without errors on the latest versions of major browsers (Chrome, Firefox, Safari, Edge).

## 7. Accessibility

- Implement keyboard navigation for card selection and menu navigation.
- Use ARIA labels for important game elements.
- Ensure color choices have sufficient contrast for readability.

## 8. Future Expansion Considerations

- Design the code structure to easily add new card decks or themes.
- Plan for potential difficulty levels (e.g., larger grids, time limits).
- Consider a system for educators to create custom decks.

## 9. Development Stack Recommendation

For optimal development efficiency and compatibility with most LLMs' coding capabilities, I recommend using the following tech stack:

1. **Framework: React**
   - Widely known and well-documented
   - Component-based architecture suits this game's structure
   - Extensive ecosystem of libraries and tools
   - Efficient for creating interactive UIs

2. **State Management: React Hooks**
   - Built into React, reducing external dependencies
   - Sufficient for managing the game's state complexity

3. **Styling: CSS Modules or Styled-Components**
   - CSS Modules for scoped styling if preferring traditional CSS
   - Styled-Components if preferring CSS-in-JS approach

4. **Build Tool: Create React App or Vite**
   - Create React App for a zero-config setup
   - Vite for faster development experience and builds

5. **Animation Library: React Spring**
   - Provides smooth, physics-based animations
   - Works well with React's component model

6. **Testing: Jest and React Testing Library**
   - Included with Create React App
   - Widely used and well-documented

This stack provides a balance of simplicity, performance, and familiarity that should be well-suited for implementation by an LLM.

