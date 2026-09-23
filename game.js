(() => {
  'use strict';

  const SUITS = [
    { key: 'clubs', symbol: '♣', color: 'black' },
    { key: 'diamonds', symbol: '♦', color: 'red' },
    { key: 'hearts', symbol: '♥', color: 'red' },
    { key: 'spades', symbol: '♠', color: 'black' },
  ];

  const RANKS = [
    { rank: 'A', value: 1 }, { rank: '2', value: 2 }, { rank: '3', value: 3 },
    { rank: '4', value: 4 }, { rank: '5', value: 5 }, { rank: '6', value: 6 },
    { rank: '7', value: 7 }, { rank: '8', value: 8 }, { rank: '9', value: 9 },
    { rank: '10', value: 10 }, { rank: 'J', value: 11 }, { rank: 'Q', value: 12 },
    { rank: 'K', value: 13 },
  ];

  const ALL_TIME_KEY = 'concina-all-time-v1';
  const LANGUAGE_KEY = 'concina-language-v1';

  const I18N = {
    ro: {
      brandTagline: 'Capturează. Adună. Câștigă.',
      scoring: 'Punctaj', howToPlay: 'Cum se joacă', stats: 'Statistici', newGame: 'Joc nou',
      computer: 'Computer', you: 'Tu', cardsLeft: 'cărți rămase', table: 'Masă',
      emptyTable: 'Nu sunt cărți pe masă', clearSelection: 'Șterge selecția', playCard: 'Joacă cartea',
      rulesEyebrow: 'Reguli', points: 'Puncte', gotIt: 'Am înțeles', close: 'Închide',
      localStats: 'Statistici locale', allTimeScoreboard: 'Scor all-time', gamesWon: 'jocuri câștigate',
      gamesPlayed: 'Jocuri jucate', statsSaved: 'Salvat local în acest browser și pe acest dispozitiv.',
      startNewGameQuestion: 'Începi un joc nou?',
      newGameWarning: 'Jocul curent va fi pierdut, iar pachetul va fi amestecat din nou.',
      cancel: 'Anulează', startNewGame: 'Începe joc nou', gameComplete: 'Joc terminat',
      finalScore: 'Scor final', playAgain: 'Joacă din nou',
      ruleDealTitle: 'Împărțire',
      ruleDealBody: 'Fiecare jucător primește 4 cărți. Patru cărți sunt puse cu fața în sus pe masă.',
      ruleCaptureTitle: 'Captură',
      ruleCaptureBody: 'Cu A–10 poți lua oricâte cărți numerice de pe masă dacă suma lor este exact egală cu valoarea cărții jucate. Asul valorează 1.',
      ruleJackTitle: 'Valet',
      ruleJackBody: 'Valetul (J) ia toate cărțile aflate pe masă. Golirea mesei cu J nu pornește o împărțire nouă: adversarul își joacă următoarea carte din mână, iar cărți noi se împart doar când ambele mâini sunt goale.',
      ruleFacesTitle: 'Damă și Rege',
      ruleFacesBody: 'Dama ia doar o Damă, iar Regele ia doar un Rege de pe masă.',
      rulePlaceTitle: 'Pune o carte',
      rulePlaceBody: 'Poți pune o carte cu fața în sus pe masă în loc să capturezi, chiar dacă ai o captură disponibilă.',
      ruleDealAgainTitle: 'Împărțire nouă',
      ruleDealAgainBody: 'Când ambele mâini sunt goale, fiecare jucător primește alte 4 cărți cât timp mai există cărți în pachet.',
      ruleFinalTitle: 'Finalul mesei',
      ruleFinalBody: 'După ultimele mâini, cărțile rămase pe masă merg la jucătorul care a făcut ultima captură.',
      ruleScoringTitle: 'Punctaj',
      ruleScoringBody: 'Cele mai multe cărți = 2 puncte, cele mai multe trefle = 1 punct, 2♣ = 1 punct, 10♦ = 2 puncte. La egalitate pentru cele mai multe cărți sau trefle, ambii jucători primesc punctele categoriei.',
      scoreMostCards: 'Cele mai multe cărți capturate', scoreMostCardsTie: 'egalitate: ambii +2',
      scoreMostClubs: 'Cele mai multe trefle', scoreMostClubsTie: 'egalitate: ambii +1',
      scoreTwoClubs: 'Doi de treflă', scoreTenDiamonds: 'Zece de caro',
      selectHand: 'Alege o carte din mână.', cardSelected: '{card} selectată.',
      tableSelectedOne: '1 carte de pe masă selectată.', tableSelectedMany: '{count} cărți de pe masă selectate.',
      invalidSelection: 'Cărțile selectate de pe masă nu se potrivesc cu cartea aleasă.',
      youCaptured: 'Ai luat {cards} cu {played}.', youPlaced: 'Ai pus {played} pe masă.',
      computerCaptured: 'Computerul a luat {cards} cu {played}.', computerPlaced: 'Computerul a pus {played} pe masă.',
      newCardsDealt: 'Fiecare jucător a primit 4 cărți noi.', yourTurnPrompt: 'Rândul tău. Alege o carte din mână.',
      cardSelectedShort: 'Carte selectată', chooseHandCard: 'Alege o carte',
      yourTurn: 'Rândul tău', computerTurn: 'Rândul computerului',
      capturedCount: '{count} cărți capturate', hiddenCard: 'Carte ascunsă',
      youWin: 'Ai câștigat!', computerWins: 'Computerul câștigă', drawGame: 'Egalitate',
      category: 'Categorie', mostCardsCategory: 'Cele mai multe cărți', mostClubsCategory: 'Cele mai multe trefle',
      twoClubsCategory: '2 de trefla', tenDiamondsCategory: '10 de caro', tie: 'egalitate',
      languageLabel: 'Schimbă limba', lastComputerCard: 'Ultima carte jucată de Computer', lastYourCard: 'Ultima ta carte jucată',
      aiHandAria: 'Cărțile Computerului', playerHandAria: 'Cărțile tale', tableAria: 'Cărți pe masă',
    },
    en: {
      brandTagline: 'Capture. Collect. Score.',
      scoring: 'Scoring', howToPlay: 'How to Play', stats: 'Stats', newGame: 'New game',
      computer: 'Computer', you: 'You', cardsLeft: 'cards left', table: 'Table',
      emptyTable: 'No cards on the table', clearSelection: 'Clear selection', playCard: 'Play card',
      rulesEyebrow: 'Rules', points: 'Points', gotIt: 'Got it', close: 'Close',
      localStats: 'Local stats', allTimeScoreboard: 'All-time scoreboard', gamesWon: 'games won',
      gamesPlayed: 'Games played', statsSaved: 'Saved locally on this browser and device.',
      startNewGameQuestion: 'Start a new game?',
      newGameWarning: 'Your current game will be lost and the deck will be shuffled again.',
      cancel: 'Cancel', startNewGame: 'Start new game', gameComplete: 'Game complete',
      finalScore: 'Final score', playAgain: 'Play again',
      ruleDealTitle: 'Deal',
      ruleDealBody: 'Each player gets 4 cards. Four cards start face up on the table.',
      ruleCaptureTitle: 'Capture',
      ruleCaptureBody: 'With A–10, you may take any number of numeric table cards if their total exactly matches the card you play. Ace = 1.',
      ruleJackTitle: 'Jack',
      ruleJackBody: 'A Jack (J) takes every card on the table. Clearing the table with a Jack does not trigger a new deal: the opponent plays the next card from their hand, and fresh cards are dealt only when both hands are empty.',
      ruleFacesTitle: 'Queen and King',
      ruleFacesBody: 'A Queen captures only a Queen, and a King captures only a King from the table.',
      rulePlaceTitle: 'Place a card',
      rulePlaceBody: 'You may place a card face up on the table instead of capturing, even when a capture is available.',
      ruleDealAgainTitle: 'New deal',
      ruleDealAgainBody: 'When both hands are empty, each player receives 4 fresh cards while the deck still has cards.',
      ruleFinalTitle: 'Final table',
      ruleFinalBody: 'After the final hands are played, remaining table cards go to the player who made the last capture.',
      ruleScoringTitle: 'Scoring',
      ruleScoringBody: 'Most cards = 2 points, most clubs = 1 point, 2♣ = 1 point, 10♦ = 2 points. If most cards or most clubs is tied, both players receive the category points.',
      scoreMostCards: 'Most captured cards', scoreMostCardsTie: 'ties: both +2',
      scoreMostClubs: 'Most clubs', scoreMostClubsTie: 'ties: both +1',
      scoreTwoClubs: 'Two of clubs', scoreTenDiamonds: 'Ten of diamonds',
      selectHand: 'Select a card from your hand.', cardSelected: '{card} selected.',
      tableSelectedOne: '1 table card selected.', tableSelectedMany: '{count} table cards selected.',
      invalidSelection: 'Those table cards do not match the selected card.',
      youCaptured: 'You captured {cards} with {played}.', youPlaced: 'You placed {played} on the table.',
      computerCaptured: 'Computer captured {cards} with {played}.', computerPlaced: 'Computer placed {played} on the table.',
      newCardsDealt: 'Four new cards have been dealt to each player.', yourTurnPrompt: 'Your turn. Select a card from your hand.',
      cardSelectedShort: 'Card selected', chooseHandCard: 'Choose a hand card',
      yourTurn: 'Your turn', computerTurn: 'Computer turn',
      capturedCount: '{count} captured', hiddenCard: 'Hidden card',
      youWin: 'You win!', computerWins: 'Computer wins', drawGame: 'Draw game',
      category: 'Category', mostCardsCategory: 'Most cards', mostClubsCategory: 'Most clubs',
      twoClubsCategory: '2 of clubs', tenDiamondsCategory: '10 of diamonds', tie: 'tie',
      languageLabel: 'Switch language', lastComputerCard: 'Computer last played card', lastYourCard: 'Your last played card',
      aiHandAria: 'Computer hand', playerHandAria: 'Your hand', tableAria: 'Cards on table',
    },
  };

  function loadLanguage() {
    try {
      const saved = window.localStorage.getItem(LANGUAGE_KEY);
      return saved === 'en' || saved === 'ro' ? saved : 'ro';
    } catch (_) {
      return 'ro';
    }
  }

  const state = {
    deck: [], table: [], hands: { player: [], ai: [] }, captured: { player: [], ai: [] },
    selectedHandId: null, selectedTableIds: new Set(), turn: 'player', lastCapturer: null,
    lastPlayed: { player: null, ai: null }, language: loadLanguage(),
    statusKey: 'selectHand', statusParams: {},
    animateHandsDeal: false, animateTableDeal: false, busy: false, gameOver: false,
    pendingTimer: null, pendingAction: null, pendingJackResponse: null,
  };

  const els = {
    aiHand: document.getElementById('aiHand'), playerHand: document.getElementById('playerHand'),
    tableCards: document.getElementById('tableCards'), emptyTable: document.getElementById('emptyTable'),
    deckCount: document.getElementById('deckCount'), playerCapturedLabel: document.getElementById('playerCapturedLabel'),
    aiCapturedLabel: document.getElementById('aiCapturedLabel'), turnPill: document.getElementById('turnPill'),
    statusBar: document.getElementById('statusBar'), selectionHelp: document.getElementById('selectionHelp'),
    playBtn: document.getElementById('playBtn'), clearSelectionBtn: document.getElementById('clearSelectionBtn'),
    scoringBtn: document.getElementById('scoringBtn'), rulesBtn: document.getElementById('rulesBtn'),
    statsBtn: document.getElementById('statsBtn'), languageBtn: document.getElementById('languageBtn'),
    newGameBtn: document.getElementById('newGameBtn'), rulesModal: document.getElementById('rulesModal'),
    scoringModal: document.getElementById('scoringModal'), statsModal: document.getElementById('statsModal'),
    newGameModal: document.getElementById('newGameModal'), cancelNewGameBtn: document.getElementById('cancelNewGameBtn'),
    confirmNewGameBtn: document.getElementById('confirmNewGameBtn'), scoreModal: document.getElementById('scoreModal'),
    winnerText: document.getElementById('winnerText'), finalPlayerScore: document.getElementById('finalPlayerScore'),
    finalAiScore: document.getElementById('finalAiScore'), scoreBreakdown: document.getElementById('scoreBreakdown'),
    playAgainBtn: document.getElementById('playAgainBtn'), allTimePlayerWins: document.getElementById('allTimePlayerWins'),
    allTimeAiWins: document.getElementById('allTimeAiWins'), allTimeGames: document.getElementById('allTimeGames'),
    playerLastCard: document.getElementById('playerLastCard'), aiLastCard: document.getElementById('aiLastCard'),
  };

  function t(key, params = {}) {
    let value = I18N[state.language][key] ?? I18N.en[key] ?? key;
    Object.entries(params).forEach(([name, replacement]) => {
      value = value.replaceAll(`{${name}}`, String(replacement));
    });
    return value;
  }

  function saveLanguage() {
    try { window.localStorage.setItem(LANGUAGE_KEY, state.language); } catch (_) {}
  }

  function applyLanguage() {
    document.documentElement.lang = state.language;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (I18N[state.language][key]) el.textContent = t(key);
    });
    els.languageBtn.textContent = 'RO/EN';
    els.languageBtn.setAttribute('aria-label', t('languageLabel'));
    els.aiHand.setAttribute('aria-label', t('aiHandAria'));
    els.playerHand.setAttribute('aria-label', t('playerHandAria'));
    els.tableCards.setAttribute('aria-label', t('tableAria'));
    els.aiLastCard.setAttribute('aria-label', t('lastComputerCard'));
    els.playerLastCard.setAttribute('aria-label', t('lastYourCard'));
    els.statusBar.textContent = t(state.statusKey, state.statusParams);
    renderControls();
    renderStats();
    renderLastPlayed();
    if (!els.scoreModal.classList.contains('hidden')) renderScoreModal(false);
  }

  function toggleLanguage() {
    state.language = state.language === 'ro' ? 'en' : 'ro';
    saveLanguage();
    applyLanguage();
  }

  function defaultAllTimeStats() { return { games: 0, playerWins: 0, aiWins: 0 }; }

  function loadAllTimeStats() {
    try {
      const raw = window.localStorage.getItem(ALL_TIME_KEY);
      if (!raw) return defaultAllTimeStats();
      const parsed = JSON.parse(raw);
      return {
        games: Number(parsed.games) || 0,
        playerWins: Number(parsed.playerWins ?? parsed.wins) || 0,
        aiWins: Number(parsed.aiWins ?? parsed.losses) || 0,
      };
    } catch (_) { return defaultAllTimeStats(); }
  }

  function saveAllTimeStats(stats) {
    try { window.localStorage.setItem(ALL_TIME_KEY, JSON.stringify(stats)); } catch (_) {}
  }

  function recordAllTimeScore(result) {
    const stats = loadAllTimeStats();
    stats.games += 1;
    if (result.playerScore > result.aiScore) stats.playerWins += 1;
    else if (result.aiScore > result.playerScore) stats.aiWins += 1;
    saveAllTimeStats(stats);
    renderAllTimeStats(stats);
  }

  function renderAllTimeStats(stats = loadAllTimeStats()) {
    els.allTimePlayerWins.textContent = stats.playerWins;
    els.allTimeAiWins.textContent = stats.aiWins;
    els.allTimeGames.textContent = stats.games;
  }

  function createDeck() {
    const deck = [];
    let id = 0;
    for (const suit of SUITS) {
      for (const rankData of RANKS) {
        deck.push({ id: `card-${id++}`, suit: suit.key, symbol: suit.symbol, color: suit.color, rank: rankData.rank, value: rankData.value });
      }
    }
    return deck;
  }

  function shuffle(array) {
    const out = [...array];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function clearPendingTimer() {
    if (state.pendingTimer !== null) {
      window.clearTimeout(state.pendingTimer);
      state.pendingTimer = null;
    }
  }

  function blockingModalOpen() {
    return !els.rulesModal.classList.contains('hidden') || !els.scoringModal.classList.contains('hidden')
      || !els.statsModal.classList.contains('hidden') || !els.newGameModal.classList.contains('hidden');
  }

  function runPendingAction() {
    if (blockingModalOpen()) return;
    const action = state.pendingAction;
    state.pendingAction = null;
    state.pendingTimer = null;
    if (action === 'aiTurn') aiTurn();
    else if (action === 'afterTurnCycle') afterTurnCycle();
  }

  function scheduleAction(action, delay) {
    clearPendingTimer();
    state.pendingAction = action;
    if (blockingModalOpen()) return;
    state.pendingTimer = window.setTimeout(runPendingAction, delay);
  }

  function setStatus(key, params = {}) {
    state.statusKey = key;
    state.statusParams = params;
    els.statusBar.textContent = t(key, params);
  }

  function newGame() {
    clearPendingTimer();
    state.deck = shuffle(createDeck());
    state.table = [];
    state.hands = { player: [], ai: [] };
    state.captured = { player: [], ai: [] };
    state.selectedHandId = null;
    state.selectedTableIds = new Set();
    state.turn = 'player';
    state.lastCapturer = null;
    state.lastPlayed = { player: null, ai: null };
    state.busy = false;
    state.gameOver = false;
    state.pendingAction = null;
    state.pendingJackResponse = null;
    els.rulesModal.classList.add('hidden');
    els.scoringModal.classList.add('hidden');
    els.statsModal.classList.add('hidden');
    els.newGameModal.classList.add('hidden');

    for (let i = 0; i < 4; i++) state.table.push(state.deck.pop());
    state.animateTableDeal = true;
    dealHands();
    hideScoreModal();
    setStatus('selectHand');
    render();
  }

  function dealHands() {
    state.animateHandsDeal = true;
    for (let i = 0; i < 4; i++) {
      if (state.deck.length) state.hands.player.push(state.deck.pop());
      if (state.deck.length) state.hands.ai.push(state.deck.pop());
    }
  }

  function cardLabel(card) { return `${card.rank}${card.symbol}`; }

  function getNumericCaptureCombinations(handCard, table = state.table) {
    if (handCard.value > 10) return [];
    const candidates = table.filter(c => c.value <= 10);
    const combos = [];

    function search(start, total, picked) {
      if (total === handCard.value && picked.length) {
        combos.push([...picked]);
        return;
      }
      if (total >= handCard.value) return;
      for (let i = start; i < candidates.length; i++) {
        const next = candidates[i];
        if (total + next.value <= handCard.value) {
          picked.push(next);
          search(i + 1, total + next.value, picked);
          picked.pop();
        }
      }
    }

    search(0, 0, []);
    return combos;
  }

  function getCaptureCombinations(handCard, table = state.table) {
    if (handCard.rank === 'J') return table.length ? [[...table]] : [];
    if (handCard.value <= 10) return getNumericCaptureCombinations(handCard, table);
    return table.filter(c => c.rank === handCard.rank).map(c => [c]);
  }

  function selectedHandCard() { return state.hands.player.find(c => c.id === state.selectedHandId) || null; }
  function selectedTableCards() { return state.table.filter(c => state.selectedTableIds.has(c.id)); }

  function isValidSelectedCapture() {
    const handCard = selectedHandCard();
    const selected = selectedTableCards();
    if (!handCard || !selected.length) return false;

    if (handCard.rank === 'J') return state.table.length > 0 && selected.length === state.table.length;
    if (handCard.value > 10) return selected.length === 1 && selected[0].rank === handCard.rank;
    if (selected.some(c => c.value > 10)) return false;
    return selected.reduce((sum, c) => sum + c.value, 0) === handCard.value;
  }

  function canDiscardSelected() { return !!selectedHandCard() && state.selectedTableIds.size === 0; }

  function onHandCardClick(cardId) {
    if (state.busy || state.turn !== 'player' || state.gameOver) return;
    state.selectedHandId = state.selectedHandId === cardId ? null : cardId;
    state.selectedTableIds.clear();
    const card = selectedHandCard();
    if (!card) setStatus('selectHand');
    else setStatus('cardSelected', { card: cardLabel(card) });
    render();
  }

  function onTableCardClick(cardId) {
    if (state.busy || state.turn !== 'player' || state.gameOver || !selectedHandCard()) return;
    const handCard = selectedHandCard();
    const card = state.table.find(c => c.id === cardId);
    if (!card) return;

    if (handCard.rank === 'J') {
      if (state.selectedTableIds.size === state.table.length) state.selectedTableIds.clear();
      else state.selectedTableIds = new Set(state.table.map(c => c.id));
    } else if (handCard.value > 10) {
      state.selectedTableIds.clear();
      if (card.rank === handCard.rank) state.selectedTableIds.add(cardId);
    } else if (card.value <= 10) {
      if (state.selectedTableIds.has(cardId)) state.selectedTableIds.delete(cardId);
      else state.selectedTableIds.add(cardId);
    }

    if (state.selectedTableIds.size === 1) setStatus('tableSelectedOne');
    else if (state.selectedTableIds.size > 1) setStatus('tableSelectedMany', { count: state.selectedTableIds.size });
    else setStatus('cardSelected', { card: cardLabel(handCard) });
    render();
  }

  function clearSelection() {
    state.selectedHandId = null;
    state.selectedTableIds.clear();
    setStatus('selectHand');
    render();
  }

  function removeHandCard(playerKey, cardId) {
    const index = state.hands[playerKey].findIndex(c => c.id === cardId);
    if (index === -1) return null;
    return state.hands[playerKey].splice(index, 1)[0];
  }

  function captureCards(playerKey, handCard, tableCards) {
    const ids = new Set(tableCards.map(c => c.id));
    state.table = state.table.filter(c => !ids.has(c.id));
    state.captured[playerKey].push(handCard, ...tableCards);
    state.lastCapturer = playerKey;
  }

  function discardCard(handCard) { state.table.push(handCard); }

  function playSelected() {
    if (state.busy || state.turn !== 'player' || state.gameOver) return;
    const handCard = selectedHandCard();
    if (!handCard) return;

    const validCapture = isValidSelectedCapture();
    const canDiscard = canDiscardSelected();
    if (!validCapture && !canDiscard) {
      setStatus('invalidSelection');
      return;
    }

    const played = removeHandCard('player', handCard.id);
    state.lastPlayed.player = played;
    if (state.pendingJackResponse === 'player') state.pendingJackResponse = null;
    if (validCapture) {
      const taken = selectedTableCards();
      captureCards('player', played, taken);
      if (played.rank === 'J') state.pendingJackResponse = 'ai';
      setStatus('youCaptured', { cards: taken.map(cardLabel).join(', '), played: cardLabel(played) });
    } else {
      discardCard(played);
      setStatus('youPlaced', { played: cardLabel(played) });
    }

    state.selectedHandId = null;
    state.selectedTableIds.clear();
    state.turn = 'ai';
    state.busy = true;
    render();
    scheduleAction('aiTurn', 650);
  }

  function chooseAiMove() {
    const options = [];
    for (const card of state.hands.ai) {
      const combos = getCaptureCombinations(card);
      for (const combo of combos) {
        const clubs = combo.filter(c => c.suit === 'clubs').length + (card.suit === 'clubs' ? 1 : 0);
        const special = combo.some(c => c.rank === '2' && c.suit === 'clubs') ? 6 : 0;
        const tenDiamond = combo.some(c => c.rank === '10' && c.suit === 'diamonds') ? 12 : 0;
        const jackSweep = card.rank === 'J' ? Math.max(2, combo.length * 2) : 0;
        const score = combo.length * 2 + clubs + special + tenDiamond + jackSweep + Math.random();
        options.push({ card, combo, score });
      }
    }

    if (options.length) {
      options.sort((a, b) => b.score - a.score);
      return { type: 'capture', ...options[0] };
    }

    const sorted = [...state.hands.ai].sort((a, b) => {
      const aPenalty = (a.suit === 'clubs' ? 3 : 0) + (a.rank === '2' && a.suit === 'clubs' ? 8 : 0)
        + (a.rank === '10' && a.suit === 'diamonds' ? 12 : 0) + (a.rank === 'J' ? 5 : 0);
      const bPenalty = (b.suit === 'clubs' ? 3 : 0) + (b.rank === '2' && b.suit === 'clubs' ? 8 : 0)
        + (b.rank === '10' && b.suit === 'diamonds' ? 12 : 0) + (b.rank === 'J' ? 5 : 0);
      return aPenalty - bPenalty || b.value - a.value;
    });
    return { type: 'discard', card: sorted[0] };
  }

  function aiTurn() {
    if (state.gameOver) return;
    const move = chooseAiMove();
    if (!move || !move.card) {
      state.busy = false;
      afterTurnCycle();
      return;
    }

    const played = removeHandCard('ai', move.card.id);
    state.lastPlayed.ai = played;
    if (state.pendingJackResponse === 'ai') state.pendingJackResponse = null;
    if (move.type === 'capture') {
      captureCards('ai', played, move.combo);
      if (played.rank === 'J') state.pendingJackResponse = 'player';
      setStatus('computerCaptured', { cards: move.combo.map(cardLabel).join(', '), played: cardLabel(played) });
    } else {
      discardCard(played);
      setStatus('computerPlaced', { played: cardLabel(played) });
    }

    state.busy = false;
    state.turn = 'player';
    render();
    scheduleAction('afterTurnCycle', 450);
  }

  function afterTurnCycle() {
    if (state.pendingJackResponse === 'player' && state.hands.player.length > 0) {
      state.turn = 'player';
      state.busy = false;
      setStatus('yourTurnPrompt');
      render();
      return;
    }
    if (state.pendingJackResponse === 'ai' && state.hands.ai.length > 0) {
      state.turn = 'ai';
      state.busy = true;
      render();
      scheduleAction('aiTurn', 650);
      return;
    }
    if (state.pendingJackResponse && state.hands[state.pendingJackResponse].length === 0) {
      state.pendingJackResponse = null;
    }

    if (state.hands.player.length === 0 && state.hands.ai.length === 0) {
      if (state.deck.length > 0) {
        dealHands();
        setStatus('newCardsDealt');
        state.turn = 'player';
        state.busy = false;
        render();
        return;
      }
      finishGame();
      return;
    }

    state.turn = 'player';
    state.busy = false;
    if (!state.gameOver) setStatus('yourTurnPrompt');
    render();
  }

  function finishGame() {
    if (state.gameOver) return;
    state.gameOver = true;
    if (state.table.length) {
      const recipient = state.lastCapturer || 'player';
      state.captured[recipient].push(...state.table);
      state.table = [];
    }
    render();
    renderScoreModal(true);
  }

  function countSuit(cards, suit) { return cards.filter(c => c.suit === suit).length; }
  function hasCard(cards, rank, suit) { return cards.some(c => c.rank === rank && c.suit === suit); }

  function calculateScore() {
    const p = state.captured.player;
    const a = state.captured.ai;
    let playerScore = 0;
    let aiScore = 0;
    const rows = [];

    if (p.length > a.length) { playerScore += 2; rows.push({ key: 'mostCardsCategory', p: `+2 (${p.length})`, a: `0 (${a.length})` }); }
    else if (a.length > p.length) { aiScore += 2; rows.push({ key: 'mostCardsCategory', p: `0 (${p.length})`, a: `+2 (${a.length})` }); }
    else { playerScore += 2; aiScore += 2; rows.push({ key: 'mostCardsCategory', p: `+2 ${t('tie')} (${p.length})`, a: `+2 ${t('tie')} (${a.length})` }); }

    const pClubs = countSuit(p, 'clubs');
    const aClubs = countSuit(a, 'clubs');
    if (pClubs > aClubs) { playerScore += 1; rows.push({ key: 'mostClubsCategory', p: `+1 (${pClubs})`, a: `0 (${aClubs})` }); }
    else if (aClubs > pClubs) { aiScore += 1; rows.push({ key: 'mostClubsCategory', p: `0 (${pClubs})`, a: `+1 (${aClubs})` }); }
    else { playerScore += 1; aiScore += 1; rows.push({ key: 'mostClubsCategory', p: `+1 ${t('tie')} (${pClubs})`, a: `+1 ${t('tie')} (${aClubs})` }); }

    const pTwoClubs = hasCard(p, '2', 'clubs');
    const aTwoClubs = hasCard(a, '2', 'clubs');
    if (pTwoClubs) playerScore += 1;
    if (aTwoClubs) aiScore += 1;
    rows.push({ key: 'twoClubsCategory', p: pTwoClubs ? '+1' : '0', a: aTwoClubs ? '+1' : '0' });

    const pTenDiamonds = hasCard(p, '10', 'diamonds');
    const aTenDiamonds = hasCard(a, '10', 'diamonds');
    if (pTenDiamonds) playerScore += 2;
    if (aTenDiamonds) aiScore += 2;
    rows.push({ key: 'tenDiamondsCategory', p: pTenDiamonds ? '+2' : '0', a: aTenDiamonds ? '+2' : '0' });

    return { playerScore, aiScore, rows };
  }

  function renderScoreModal(recordResult) {
    const result = calculateScore();
    if (recordResult) recordAllTimeScore(result);
    els.finalPlayerScore.textContent = result.playerScore;
    els.finalAiScore.textContent = result.aiScore;
    els.winnerText.textContent = result.playerScore > result.aiScore ? t('youWin') : result.aiScore > result.playerScore ? t('computerWins') : t('drawGame');
    els.scoreBreakdown.innerHTML = `
      <div class="breakdown-row header"><span>${t('category')}</span><span>${t('you')}</span><span>${t('computer')}</span></div>
      ${result.rows.map(row => `<div class="breakdown-row"><span>${t(row.key)}</span><span>${row.p}</span><span>${row.a}</span></div>`).join('')}
    `;
    els.scoreModal.classList.remove('hidden');
  }

  function hideScoreModal() { els.scoreModal.classList.add('hidden'); }

  function makeCardElement(card, options = {}) {
    const { back = false, selected = false, dealIndex = null, onClick = null } = options;
    const el = document.createElement('button');
    el.type = 'button';
    el.className = `playing-card${back ? ' back' : ''}${!back && card.color === 'red' ? ' red' : ''}${selected ? ' selected' : ''}${dealIndex !== null ? ' deal-in' : ''}`;
    if (dealIndex !== null) el.style.setProperty('--deal-delay', `${dealIndex * 85}ms`);
    el.setAttribute('aria-label', back ? t('hiddenCard') : cardLabel(card));
    if (!back) {
      el.innerHTML = `
        <span class="card-corner"><span>${card.rank}</span><span class="suit">${card.symbol}</span></span>
        <span class="card-center">${card.symbol}</span>
        <span class="card-corner bottom"><span>${card.rank}</span><span class="suit">${card.symbol}</span></span>
      `;
    }
    if (onClick) el.addEventListener('click', onClick);
    return el;
  }

  function renderHands() {
    els.aiHand.innerHTML = '';
    state.hands.ai.forEach((card, index) => els.aiHand.appendChild(makeCardElement(card, { back: true, dealIndex: state.animateHandsDeal ? index : null })));

    els.playerHand.innerHTML = '';
    state.hands.player.forEach((card, index) => {
      els.playerHand.appendChild(makeCardElement(card, {
        selected: state.selectedHandId === card.id,
        dealIndex: state.animateHandsDeal ? index + 2 : null,
        onClick: () => onHandCardClick(card.id),
      }));
    });
  }

  function renderTable() {
    els.tableCards.innerHTML = '';
    const mobileLayout = window.matchMedia('(max-width: 720px)').matches;
    const tableCount = state.table.length;
    const denseAt = mobileLayout ? 9 : 10;
    const ultraDenseAt = mobileLayout ? 12 : 18;
    els.tableCards.classList.toggle('dense', tableCount > denseAt);
    els.tableCards.classList.toggle('ultra-dense', tableCount > ultraDenseAt);
    els.tableCards.classList.toggle('mobile-centered-set', mobileLayout && tableCount > 0 && tableCount < 6);
    els.tableCards.classList.toggle('mobile-three-per-row', mobileLayout && tableCount >= 6);

    state.table.forEach((card, index) => {
      els.tableCards.appendChild(makeCardElement(card, {
        selected: state.selectedTableIds.has(card.id),
        dealIndex: state.animateTableDeal ? index : null,
        onClick: () => onTableCardClick(card.id),
      }));
    });
    els.emptyTable.classList.toggle('hidden', state.table.length !== 0);
  }

  function renderControls() {
    els.playBtn.disabled = state.turn !== 'player' || state.busy || !state.selectedHandId;
    els.clearSelectionBtn.disabled = state.turn !== 'player' || state.busy || (!state.selectedHandId && state.selectedTableIds.size === 0);
    els.playBtn.textContent = t('playCard');
    els.clearSelectionBtn.textContent = t('clearSelection');
    els.selectionHelp.textContent = selectedHandCard() ? t('cardSelectedShort') : t('chooseHandCard');
  }

  function renderLastPlayed() {
    const updateChip = (el, card) => {
      el.textContent = card ? cardLabel(card) : '—';
      el.classList.toggle('red-suit', !!card && card.color === 'red');
      el.classList.toggle('black-suit', !!card && card.color !== 'red');
    };
    updateChip(els.playerLastCard, state.lastPlayed.player);
    updateChip(els.aiLastCard, state.lastPlayed.ai);
  }

  function renderStats() {
    els.deckCount.textContent = state.deck.length;
    els.playerCapturedLabel.textContent = t('capturedCount', { count: state.captured.player.length });
    els.aiCapturedLabel.textContent = t('capturedCount', { count: state.captured.ai.length });
    const aiTurnActive = state.turn === 'ai' || state.busy;
    els.turnPill.textContent = aiTurnActive ? t('computerTurn') : t('yourTurn');
    els.turnPill.classList.toggle('ai', aiTurnActive);
  }

  function render() {
    renderHands();
    renderTable();
    renderControls();
    renderStats();
    renderLastPlayed();
    state.animateHandsDeal = false;
    state.animateTableDeal = false;
  }

  function openRules() { clearPendingTimer(); els.rulesModal.classList.remove('hidden'); }
  function closeRules() { els.rulesModal.classList.add('hidden'); if (state.pendingAction) scheduleAction(state.pendingAction, 180); }
  function openScoring() { clearPendingTimer(); els.scoringModal.classList.remove('hidden'); }
  function closeScoring() { els.scoringModal.classList.add('hidden'); if (state.pendingAction) scheduleAction(state.pendingAction, 180); }
  function openStats() { clearPendingTimer(); renderAllTimeStats(); els.statsModal.classList.remove('hidden'); }
  function closeStats() { els.statsModal.classList.add('hidden'); if (state.pendingAction) scheduleAction(state.pendingAction, 180); }
  function openNewGameConfirm() { clearPendingTimer(); els.newGameModal.classList.remove('hidden'); }
  function closeNewGameConfirm() { els.newGameModal.classList.add('hidden'); if (state.pendingAction) scheduleAction(state.pendingAction, 180); }
  function confirmNewGame() { els.newGameModal.classList.add('hidden'); newGame(); }

  els.playBtn.addEventListener('click', playSelected);
  els.clearSelectionBtn.addEventListener('click', clearSelection);
  els.scoringBtn.addEventListener('click', openScoring);
  els.rulesBtn.addEventListener('click', openRules);
  els.statsBtn.addEventListener('click', openStats);
  els.languageBtn.addEventListener('click', toggleLanguage);
  els.newGameBtn.addEventListener('click', openNewGameConfirm);
  els.cancelNewGameBtn.addEventListener('click', closeNewGameConfirm);
  els.confirmNewGameBtn.addEventListener('click', confirmNewGame);
  els.playAgainBtn.addEventListener('click', newGame);
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeRules));
  document.querySelectorAll('[data-close-scoring]').forEach(el => el.addEventListener('click', closeScoring));
  document.querySelectorAll('[data-close-stats]').forEach(el => el.addEventListener('click', closeStats));
  document.querySelectorAll('[data-close-new-game]').forEach(el => el.addEventListener('click', closeNewGameConfirm));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !els.rulesModal.classList.contains('hidden')) closeRules();
    else if (e.key === 'Escape' && !els.scoringModal.classList.contains('hidden')) closeScoring();
    else if (e.key === 'Escape' && !els.statsModal.classList.contains('hidden')) closeStats();
    else if (e.key === 'Escape' && !els.newGameModal.classList.contains('hidden')) closeNewGameConfirm();
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(renderTable, 100);
  });

  renderAllTimeStats();
  applyLanguage();
  newGame();
})();
