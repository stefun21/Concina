# Concina

A lightweight two-player browser card game built with plain HTML, CSS and JavaScript.

## Stack

- No framework
- No backend
- No database
- No API keys
- No paid services
- No extra accounts required beyond GitHub/Vercel
- All-time wins and language preference are stored locally with `localStorage`

## Run locally

Open `index.html` directly in a browser, or serve the folder with any simple static server.

## Deploy to Vercel

1. Create a GitHub repository.
2. Upload the files from this folder to the repository root.
3. In Vercel, choose **Add New Project** and import the repository.
4. Framework preset: **Other**.
5. No build command or environment variables are needed.
6. Deploy.

## Implemented rules

- One standard 52-card deck, no jokers.
- Human vs computer.
- Four cards are dealt to each player and four cards start face up on the table.
- Ace = 1; 2–10 use their numeric value.
- A numeric card captures any number of numeric table cards whose total exactly equals the played card.
- A Jack (J) captures every card currently on the table when used for a capture.
- A Queen captures a Queen; a King captures a King.
- A player may place a card on the table instead of capturing, even if a capture is available.
- When both hands are empty, four new cards are dealt to each player while cards remain in the deck.
- At the end, remaining table cards go to the player who made the last capture.
- Most captured cards: 2 points. If tied, both players receive 2 points.
- Most clubs: 1 point. If tied, both players receive 1 point.
- 2 of clubs: 1 point.
- 10 of diamonds: 2 points.

## UI

- Responsive desktop/mobile layout with no mobile page scrolling.
- Scoring, How to Play, Stats, language switch and New Game are available from the header.
- New Game asks for confirmation before resetting the match.
- No capture hints are shown.
- Multiple selected table cards use the same selection glow.
- Each player has a compact last-played-card indicator showing only rank + suit.
- Romanian/English switch. Romanian is the default on first visit; the last selected language is remembered locally.
- All-time scoreboard stores games played and games won by You / Computer on the current browser/device.

## Files

- `index.html` — game UI
- `styles.css` — responsive visual design
- `game.js` — rules, AI, language system, local stats and scoring
- `vercel.json` — Vercel static configuration
- `favicon.svg` — project icon


## v14 rules fix
- A Jack clears the table, but never triggers a redeal by itself. The opponent continues by playing from their current hand.
- Fresh hands are dealt only after both players have no cards left.
- Scoring details remain in the dedicated Scoring modal and were removed from How to Play.
