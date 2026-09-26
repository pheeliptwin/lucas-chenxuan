# Project: Number Guesser

## Goal
A single-player browser game. The app picks a random number between
1 and 100, and the player guesses until they get it right.

## Must-Have Features
1. On load, generate a random number between 1 and 100 (kept hidden from the player)
2. An input box where the player types a guess, plus a Submit button
3. After each guess, show one of: "Too high", "Too low", or "Correct!"
4. Show a running count of how many guesses the player has made
5. After a correct guess, show a "Play Again" button that starts a new round
   (new random number, guess count reset to 0)

## Out of Scope (not this version)
- No login, no accounts
- No saved scores or leaderboard
- No database of any kind — everything resets on refresh

## Success Criteria
A player can load the page, guess repeatedly with clear feedback each time,
win, and start a new round — all without a page reload.
