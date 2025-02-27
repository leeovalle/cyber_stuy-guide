import React, { useState } from 'react';

// Sample list of flashcards
const flashCardsData = [
  {
    question: "Type of attacks that occur in the physical layer?",
    answer: "Eavesdropping, jamming, False data injection attacks", 
    image: "/src/assets/images/physical.png"
  },
  {
    question: "Type of attacks that occur in the Data link layer?",
    answer: "MAC Spoofing, MITM attacks",
    image: "/src/assets/images/datalink.png"
  },
  {
    question: "Type of attacks that occur in the Network layer?",
    answer: "IP hijacking, IP spoofing, Smurf attack",
    image: "/src/assets/images/network.png"
  },
  {
    question: "Type of attacks that occur in the Transport layer?",
    answer: "SYN flood, TCP/IP hijacking",
    image: "/src/assets/images/transport.png"
  },
  {
    question: "Type of attack that occur in the session layer?",
    answer: "Session hijacking: attacker takes over a session between two machines, session fixation: attacker sets the session ID of the victim, session sniffing: attacker sniffs the session ID", 
    image: "/src/assets/images/session.png"
  },
  {
    question: "Type of attack that occur in the presentation layer?",
    answer: "SSL stripping",
    image: "/src/assets/images/presentation.png"
  },
  {
    question: "Type of attacks that occur in the Application layer?",
    answer: "SQL injection, XSS, CSRF",
    image: "/src/assets/images/application.png"
  },
  {
    question: "What is Transmission Control Protocol (TCP)?",
    answer: "TCP is a connection-oriented protocol that provides reliable data delivery. It is used in applications that require high reliability, such as email, file transfer, and web browsing.",
    image: "/src/assets/images/tcp.png"
  },
  {
    question: "What is Simple Mail Transfer Protocol (SMTP)?",
    answer: "SMTP is a protocol used to send email messages between servers. It is used to send email messages from a client to a server and from one server to another.",
    image: "/src/assets/images/smtp.png"
  },
  {
    question: "What is Secure Sockets Layer (SSL)?",
    answer: "It is a protocol that provides secure communication over a computer network. It is used to encrypt data transmitted between a client and a server, such as a web browser and a web server.",
    image: "/src/assets/images/ssl.png"
  },
];

// Helper function: Compute the Levenshtein Distance between two strings.
const levenshteinDistance = (a, b) => {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  const matrix = [];

  // Initialize the first row and column of the matrix.
  for (let i = 0; i <= bLower.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= aLower.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix.
  for (let i = 1; i <= bLower.length; i++) {
    for (let j = 1; j <= aLower.length; j++) {
      if (bLower.charAt(i - 1) === aLower.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[bLower.length][aLower.length];
};

// Function to decide if two strings are "close enough"
const isApproximatelyCorrect = (userAnswer, correctAnswer, threshold = 0.8) => {
  const userNormalized = userAnswer.trim().toLowerCase();
  const correctNormalized = correctAnswer.trim().toLowerCase();
  if (!userNormalized && !correctNormalized) return true;
  const distance = levenshteinDistance(userNormalized, correctNormalized);
  const maxLen = Math.max(userNormalized.length, correctNormalized.length);
  if (maxLen === 0) return true;
  const similarity = (maxLen - distance) / maxLen;
  return similarity >= threshold;
};

const FlashCardApp = () => {
  // Initialize the cards with an additional "mastered" property.
  const [cards, setCards] = useState(
    flashCardsData.map(card => ({ ...card, mastered: false }))
  );
  // Current card index and UI state.
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  // Streak counters.
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const currentCard = cards[currentIndex];

  // When the user submits an answer, use fuzzy matching.
  const handleSubmit = () => {
    if (!currentCard) return;
    const isCorrect = isApproximatelyCorrect(userGuess, currentCard.answer);
    if (isCorrect) {
      setFeedback("Correct!");
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        setLongestStreak(prevLongest => Math.max(prevLongest, newStreak));
        return newStreak;
      });
    } else {
      setFeedback("Incorrect!");
      setCurrentStreak(0);
    }
    setShowQuestion(false);
  };

  // Navigation functions.
  const handleNextCard = () => {
    if (cards.length === 0) return;
    const nextIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(nextIndex);
    setShowQuestion(true);
    setUserGuess("");
    setFeedback("");
  };

  const handlePreviousCard = () => {
    if (cards.length === 0) return;
    const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setShowQuestion(true);
    setUserGuess("");
    setFeedback("");
  };

  const handleRandomCard = () => {
    if (cards.length === 0) return;
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentIndex(randomIndex);
    setShowQuestion(true);
    setUserGuess("");
    setFeedback("");
  };

  // Update the current card's "mastered" property when the checkbox changes.
  const handleMasteredChange = (e) => {
    const checked = e.target.checked;
    setCards(prevCards => {
      const newCards = [...prevCards];
      newCards[currentIndex] = { ...newCards[currentIndex], mastered: checked };
      return newCards;
    });
  };

  return (
    <div className="flashcard-app">
      {/* Header */}
      <header>
        <h1>Learn To Hack. Ethically</h1>
        <p>Test your cybersecurity knowledge.</p>
        <p><strong>Total Cards:</strong> {cards.length}</p>
        <p>
          <strong>Mastered Cards:</strong>{" "}
          {cards.filter(card => card.mastered).length}
        </p>
      </header>

      {/* Streak Counters */}
      <div className="streak-counter" style={{ marginBottom: "20px" }}>
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>

      {/* Flashcard Display */}
      <div className="flashcard">
        {showQuestion && (
          <div className="flashcard-image">
            <img src={currentCard.image} alt="Flashcard visual" />
          </div>
        )}
        <div
          className="flashcard-content"
          style={{
            flexDirection: "column", // Vertical stacking
            border:
              feedback === "Correct!"
                ? "3px solid green"
                : feedback === "Incorrect!"
                ? "3px solid red"
                : "none"
          }}
        >
          {showQuestion ? (
            <p>{currentCard.question}</p>
          ) : (
            <>
              <p>{currentCard.answer}</p>
              {feedback && (
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                  {feedback}
                </p>
              )}
              {/* Checkbox for marking the card as mastered */}
              <div style={{ marginTop: "10px" }}>
                <input
                  type="checkbox"
                  id="mastered"
                  checked={currentCard.mastered}
                  onChange={handleMasteredChange}
                />
                <label htmlFor="mastered" style={{ marginLeft: "5px" }}>
                  Check as mastered
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation and Input */}
      <div className="navigation">
        <div className="user-input">
          <input
            type="text"
            placeholder="Enter your answer"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            disabled={!showQuestion}
          />
          <button
            onClick={handleSubmit}
            disabled={!showQuestion || userGuess.trim() === ""}
          >
            Submit
          </button>
        </div>
        <div className="navigation-buttons">
          <button onClick={handlePreviousCard}>Previous Card</button>
          <button onClick={handleNextCard}>Next Card</button>
          <button onClick={handleRandomCard}>Shuffle Cards</button>
        </div>
      </div>

      {/* Mastered Cards List */}
      <div className="mastered-cards" style={{ marginTop: "20px" }}>
        <h2>Mastered Cards</h2>
        {cards.filter(card => card.mastered).length === 0 ? (
          <p>No mastered cards yet.</p>
        ) : (
          <ul>
            {cards
              .filter(card => card.mastered)
              .map((card, index) => (
                <li key={index}>{card.question}</li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FlashCardApp;