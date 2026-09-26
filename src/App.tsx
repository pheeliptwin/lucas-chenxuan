import { useState, useRef, useEffect, FormEvent } from "react";

type Feedback = { kind: "high" | "low" | "correct"; text: string } | null;

function randomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}

export default function App() {
  const [target, setTarget] = useState<number>(() => randomNumber());
  const [guess, setGuess] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [hasWon, setHasWon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (hasWon) return;

    const value = parseInt(guess, 10);
    if (Number.isNaN(value) || value < 1 || value > 100) {
      setFeedback({ kind: "low", text: "Enter a number between 1 and 100" });
      return;
    }

    const nextCount = guessCount + 1;
    setGuessCount(nextCount);

    if (value === target) {
      setFeedback({ kind: "correct", text: "Correct!" });
      setHasWon(true);
    } else if (value > target) {
      setFeedback({ kind: "high", text: "Too high" });
    } else {
      setFeedback({ kind: "low", text: "Too low" });
    }

    setGuess("");
  }

  function playAgain() {
    setTarget(randomNumber());
    setGuess("");
    setGuessCount(0);
    setFeedback(null);
    setHasWon(false);
    inputRef.current?.focus();
  }

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Number Guesser</h1>
        <p className="subtitle">I'm thinking of a number between 1 and 100. Can you guess it?</p>

        <div className="stats">
          <div className="stat">
            <span className="stat-value">{guessCount}</span>
            <span className="stat-label">Guesses</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputRef}
            type="number"
            min={1}
            max={100}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your guess"
            disabled={hasWon}
            className={`input ${feedback ? `input--${feedback.kind}` : ""}`}
            aria-label="Enter your guess"
          />
          <button type="submit" disabled={hasWon} className="btn btn--primary">
            Submit
          </button>
        </form>

        {feedback && !hasWon && (
          <div className={`feedback feedback--${feedback.kind}`} key={guessCount}>
            {feedback.text}
          </div>
        )}

        {hasWon && (
          <div className="win">
            <div className="feedback feedback--correct win-feedback" key={guessCount}>
              Correct! You got it in {guessCount} {guessCount === 1 ? "guess" : "guesses"}.
            </div>
            <button onClick={playAgain} className="btn btn--accent">
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
