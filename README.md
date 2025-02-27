# Cyber Flashcards - Learn To Hack 🔒

An interactive flashcard application designed to help you master cybersecurity concepts through engaging practice and spaced repetition.

## Features ✨

- **Smart Answer Matching**: Answers are evaluated using fuzzy matching, allowing for slight variations
- **Progress Tracking**: 
  - Track your current and longest streaks of correct answers
  - Mark cards as mastered and view them in a dedicated list
  - Mastered cards remain in the deck for continuous review
- **Interactive Navigation**:
  - Forward and backward navigation through cards
  - Shuffle feature to randomize card order
- **Instant Feedback**: Visual cues indicate correct and incorrect answers

## Technologies Used 🛠️

- React
- Vite
- CSS for styling
- Custom fuzzy matching algorithm

## Getting Started 🚀

This project uses Vite as the build tool. To run it locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Technical Implementation Details 🔧

### Fuzzy Answer Matching
- Implemented Levenshtein distance algorithm for string similarity comparison
- Carefully tuned similarity thresholds for optimal answer recognition
- Handles edge cases like empty strings and varying input lengths

### UI/UX Considerations
- Conditional rendering for mastery checkbox
- Responsive design with flexbox
- Clean visual feedback system

## Development Challenges Overcome 💪

1. **Fuzzy Matching Implementation**
   - Built custom string comparison algorithm
   - Balanced accuracy vs leniency in answer matching
   - Optimized performance for real-time feedback

2. **Dynamic UI Components**
   - Implemented conditional rendering logic
   - Managed complex state for card mastery
   - Created intuitive navigation system

## Demo

![Application Demo](/src/assets/images/project3.gif)

## Credits 🙏

- Created by: Lee Ovalle 
- GIF created with [Kap](https://getkap.co/) for macOS
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

## Development Environment

Currently using:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) with Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) with SWC for Fast Refresh
