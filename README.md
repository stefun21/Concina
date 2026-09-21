# Concina

A lightweight two-player browser card game built with plain HTML, CSS and JavaScript.

## Stack

- No framework
- No backend
- No database
- No API keys
- No paid services
- No extra accounts required beyond GitHub/Vercel

## Run locally

Open `index.html` directly in a browser, or serve the folder with any simple static server.

## Deploy to Vercel

1. Create a GitHub repository.
2. Upload the files from this folder to the repository root.
3. In Vercel, choose **Add New Project** and import the repository.
4. Framework preset: **Other** (Vercel usually detects this automatically).
5. No build command is needed.
6. Deploy.

## Implemented rules

- One standard 52-card deck, no jokers.
- Human vs computer.
- Four cards dealt to each player and four face-up cards placed on the table.
- Ace is worth 1; 2–10 use their numeric value.
- A numeric card captures any number of numeric table cards whose total exactly equals the card played. Example: 1 + 2 + 3 + 3 = 9, captured with a 9.
- J/Q/K capture only a matching J/Q/K from the table.
- If any capture is available in a player's hand, a capture must be made.
- If no capture exists, one card must be placed on the table.
- When both hands are empty, four new cards are dealt to each player while cards remain in the deck.
- At the end, remaining table cards go to the player who made the last capture.
- Most captured cards: 1 point. If tied, both players receive 1 point.
- Most clubs: 1 point. If tied, both players receive 1 point.
- 2 of clubs: 1 point.
- 10 of diamonds: 2 points.

## Files

- `index.html` — game UI
- `styles.css` — responsive visual design
- `game.js` — game rules, AI and scoring
- `vercel.json` — simple Vercel static configuration
- `favicon.svg` — project icon

- Scoring and How to Play remain available from the header.
- New Game asks for confirmation before resetting the current match.


## UI notes
- Scoring and How to Play are available from buttons in the top bar and open in modals.
- Round UI and round numbering are intentionally removed.
- Player cards do not reveal capture hints or availability states.
- Card dealing uses a short staggered animation.

- Mobile layout fits the gameplay into the viewport without page scrolling.

## Mobile layout
The mobile layout is optimized for a single-screen game experience: compact spacing between hands and table, no page scrolling, non-overlapping card hitboxes, adaptive table-card density, and a single-row header with the game title and controls.

### Mobile layout v6
- Larger responsive hand and table cards on phones.
- Gameplay content is vertically centered when the viewport has spare height.
- Short screens automatically use a more compact card size.
- Table cards switch to compact layouts sooner as the table grows.
- Mobile tap targets and selected-card spacing were refined to avoid overlaps.
