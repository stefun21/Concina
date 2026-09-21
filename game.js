(() => {
  'use strict';

  const SUITS = [
    { key: 'clubs', symbol: '♣', color: 'black' },
    { key: 'diamonds', symbol: '♦', color: 'red' },
    { key: 'hearts', symbol: '♥', color: 'red' },
    { key: 'spades', symbol: '♠', color: 'black' },
  ];

  const RANKS = [
    { rank: 'A', value: 1 },
    { rank: '2', value: 2 },
    { rank: '3', value: 3 },
    { rank: '4', value: 4 },
    { rank: '5', value: 5 },
    { rank: '6', value: 6 },
    { rank: '7', value: 7 },
    { rank: '8', value: 8 },
    { rank: '9', value: 9 },
    { rank: '10', value: 10 },
    { rank: 'J', value: 11 },
    { rank: 'Q', value: 12 },
    { rank: 'K', value: 13 },
  ];

  const state = {
    deck: [],
    table: [],
    hands: { player: [], ai: [] },
    captured: { player: [], ai: [] },
    selectedHandId: null,
    selectedTableIds: new Set(),
    turn: 'player',
    lastCapturer: null,
    animateHandsDeal: false,
    animateTableDeal: false,
    busy: false,
    gameOver: false,
    pendingTimer: null,
    pendingAction: null,
  };

  const els = {
    aiHand: document.getElementById('aiHand'),
    playerHand: document.getElementById('playerHand'),
    tableCards: document.getElementById('tableCards'),
    emptyTable: document.getElementById('emptyTable'),
    deckCount: document.getElementById('deckCount'),
    playerCapturedLabel: document.getElementById('playerCapturedLabel'),
    aiCapturedLabel: document.getElementById('aiCapturedLabel'),
    turnPill: document.getElementById('turnPill'),
    statusBar: document.getElementById('statusBar'),
    selectionHelp: document.getElementById('selectionHelp'),
    playBtn: document.getElementById('playBtn'),
    clearSelectionBtn: document.getElementById('clearSelectionBtn'),
    scoringBtn: document.getElementById('scoringBtn'),
    rulesBtn: document.getElementById('rulesBtn'),
    newGameBtn: document.getElementById('newGameBtn'),
    rulesModal: document.getElementById('rulesModal'),
    scoringModal: document.getElementById('scoringModal'),
    newGameModal: document.getElementById('newGameModal'),
    cancelNewGameBtn: document.getElementById('cancelNewGameBtn'),
    confirmNewGameBtn: document.getElementById('confirmNewGameBtn'),
    scoreModal: document.getElementById('scoreModal'),
    winnerText: document.getElementById('winnerText'),
    finalPlayerScore: document.getElementById('finalPlayerScore'),
    finalAiScore: document.getElementById('finalAiScore'),
    scoreBreakdown: document.getElementById('scoreBreakdown'),
    playAgainBtn: document.getElementById('playAgainBtn'),
  };

  function createDeck() {
    const deck = [];
    let id = 0;
    for (const suit of SUITS) {
      for (const rankData of RANKS) {
        deck.push({
          id: `card-${id++}`,
          suit: suit.key,
          symbol: suit.symbol,
          color: suit.color,
          rank: rankData.rank,
          value: rankData.value,
        });
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
    return !els.rulesModal.classList.contains('hidden')
      || !els.scoringModal.classList.contains('hidden')
      || !els.newGameModal.classList.contains('hidden');
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
    state.busy = false;
    state.gameOver = false;
    state.pendingAction = null;
    els.rulesModal.classList.add('hidden');
    els.scoringModal.classList.add('hidden');
    els.newGameModal.classList.add('hidden');

    for (let i = 0; i < 4; i++) state.table.push(state.deck.pop());
    state.animateTableDeal = true;
    dealHands();
    hideScoreModal();
    setStatus('Select a card from your hand.');
    render();
  }

  function dealHands() {
    state.animateHandsDeal = true;
    for (let i = 0; i < 4; i++) {
      if (state.deck.length) state.hands.player.push(state.deck.pop());
      if (state.deck.length) state.hands.ai.push(state.deck.pop());
    }
  }

  function cardLabel(card) {
    return `${card.rank}${card.symbol}`;
  }

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
    if (handCard.value <= 10) return getNumericCaptureCombinations(handCard, table);
    return table.filter(c => c.rank === handCard.rank).map(c => [c]);
  }

  function hasAnyCapture(playerKey) {
    return state.hands[playerKey].some(card => getCaptureCombinations(card).length > 0);
  }

  function selectedHandCard() {
    return state.hands.player.find(c => c.id === state.selectedHandId) || null;
  }

  function selectedTableCards() {
    return state.table.filter(c => state.selectedTableIds.has(c.id));
  }

  function isValidSelectedCapture() {
    const handCard = selectedHandCard();
    const selected = selectedTableCards();
    if (!handCard || !selected.length) return false;

    if (handCard.value > 10) {
      return selected.length === 1 && selected[0].rank === handCard.rank;
    }
    if (selected.some(c => c.value > 10)) return false;
    return selected.reduce((sum, c) => sum + c.value, 0) === handCard.value;
  }

  function canDiscardSelected() {
    return !!selectedHandCard() && state.selectedTableIds.size === 0 && !hasAnyCapture('player');
  }

  function setStatus(message) {
    els.statusBar.textContent = message;
  }

  function onHandCardClick(cardId) {
    if (state.busy || state.turn !== 'player' || state.gameOver) return;
    state.selectedHandId = state.selectedHandId === cardId ? null : cardId;
    state.selectedTableIds.clear();

    const card = selectedHandCard();
    if (!card) setStatus('Select a card from your hand.');
    else {
      const mobile = window.matchMedia('(max-width: 720px)').matches;
      setStatus(mobile
        ? `${cardLabel(card)} selected. Choose table cards, then press Play card.`
        : `${cardLabel(card)} selected. Choose table cards if you want to capture, then press Play card.`);
    }
    render();
  }

  function onTableCardClick(cardId) {
    if (state.busy || state.turn !== 'player' || state.gameOver || !selectedHandCard()) return;
    const handCard = selectedHandCard();
    const card = state.table.find(c => c.id === cardId);
    if (!card) return;

    if (handCard.value > 10) {
      state.selectedTableIds.clear();
      if (card.rank === handCard.rank) state.selectedTableIds.add(cardId);
    } else if (card.value <= 10) {
      if (state.selectedTableIds.has(cardId)) state.selectedTableIds.delete(cardId);
      else state.selectedTableIds.add(cardId);
    }

    if (state.selectedTableIds.size) setStatus(`${state.selectedTableIds.size} table card${state.selectedTableIds.size === 1 ? '' : 's'} selected.`);
    else setStatus(`${cardLabel(handCard)} selected.`);
    render();
  }

  function clearSelection() {
    state.selectedHandId = null;
    state.selectedTableIds.clear();
    setStatus('Select a card from your hand.');
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

  function discardCard(handCard) {
    state.table.push(handCard);
  }

  function playSelected() {
    if (state.busy || state.turn !== 'player' || state.gameOver) return;
    const handCard = selectedHandCard();
    if (!handCard) return;

    const validCapture = isValidSelectedCapture();
    const canDiscard = canDiscardSelected();

    if (!validCapture && !canDiscard) {
      if (hasAnyCapture('player')) setStatus('A capture is available. Select a valid combination before playing.');
      else setStatus('Select no table cards to place this card on the table.');
      return;
    }

    const played = removeHandCard('player', handCard.id);
    if (validCapture) {
      const taken = selectedTableCards();
      captureCards('player', played, taken);
      setStatus(`You captured ${taken.map(cardLabel).join(', ')} with ${cardLabel(played)}.`);
    } else {
      discardCard(played);
      setStatus(`You placed ${cardLabel(played)} on the table.`);
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
        const score = combo.length * 2 + clubs + special + tenDiamond + Math.random();
        options.push({ card, combo, score });
      }
    }

    if (options.length) {
      options.sort((a, b) => b.score - a.score);
      return { type: 'capture', ...options[0] };
    }

    const sorted = [...state.hands.ai].sort((a, b) => {
      const aPenalty = (a.suit === 'clubs' ? 3 : 0) + (a.rank === '2' && a.suit === 'clubs' ? 8 : 0) + (a.rank === '10' && a.suit === 'diamonds' ? 12 : 0);
      const bPenalty = (b.suit === 'clubs' ? 3 : 0) + (b.rank === '2' && b.suit === 'clubs' ? 8 : 0) + (b.rank === '10' && b.suit === 'diamonds' ? 12 : 0);
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
    if (move.type === 'capture') {
      captureCards('ai', played, move.combo);
      setStatus(`Computer captured ${move.combo.map(cardLabel).join(', ')} with ${cardLabel(played)}.`);
    } else {
      discardCard(played);
      setStatus(`Computer placed ${cardLabel(played)} on the table.`);
    }

    state.busy = false;
    state.turn = 'player';
    render();
    scheduleAction('afterTurnCycle', 450);
  }

  function afterTurnCycle() {
    if (state.hands.player.length === 0 && state.hands.ai.length === 0) {
      if (state.deck.length > 0) {
        dealHands();
        setStatus('Four new cards have been dealt to each player.');
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
    if (!state.gameOver) setStatus('Your turn. Select a card from your hand.');
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
    showScoreModal();
  }

  function countSuit(cards, suit) {
    return cards.filter(c => c.suit === suit).length;
  }

  function hasCard(cards, rank, suit) {
    return cards.some(c => c.rank === rank && c.suit === suit);
  }

  function calculateScore() {
    const p = state.captured.player;
    const a = state.captured.ai;
    let playerScore = 0;
    let aiScore = 0;

    const rows = [];
    if (p.length > a.length) { playerScore += 1; rows.push(['Most cards', `+1 (${p.length})`, `0 (${a.length})`]); }
    else if (a.length > p.length) { aiScore += 1; rows.push(['Most cards', `0 (${p.length})`, `+1 (${a.length})`]); }
    else { playerScore += 1; aiScore += 1; rows.push(['Most cards', `+1 tie (${p.length})`, `+1 tie (${a.length})`]); }

    const pClubs = countSuit(p, 'clubs');
    const aClubs = countSuit(a, 'clubs');
    if (pClubs > aClubs) { playerScore += 1; rows.push(['Most clubs', `+1 (${pClubs})`, `0 (${aClubs})`]); }
    else if (aClubs > pClubs) { aiScore += 1; rows.push(['Most clubs', `0 (${pClubs})`, `+1 (${aClubs})`]); }
    else { playerScore += 1; aiScore += 1; rows.push(['Most clubs', `+1 tie (${pClubs})`, `+1 tie (${aClubs})`]); }

    const pTwoClubs = hasCard(p, '2', 'clubs');
    const aTwoClubs = hasCard(a, '2', 'clubs');
    if (pTwoClubs) playerScore += 1;
    if (aTwoClubs) aiScore += 1;
    rows.push(['2 of clubs', pTwoClubs ? '+1' : '0', aTwoClubs ? '+1' : '0']);

    const pTenDiamonds = hasCard(p, '10', 'diamonds');
    const aTenDiamonds = hasCard(a, '10', 'diamonds');
    if (pTenDiamonds) playerScore += 2;
    if (aTenDiamonds) aiScore += 2;
    rows.push(['10 of diamonds', pTenDiamonds ? '+2' : '0', aTenDiamonds ? '+2' : '0']);

    return { playerScore, aiScore, rows };
  }

  function showScoreModal() {
    const result = calculateScore();
    els.finalPlayerScore.textContent = result.playerScore;
    els.finalAiScore.textContent = result.aiScore;
    els.winnerText.textContent = result.playerScore > result.aiScore
      ? 'You win!'
      : result.aiScore > result.playerScore
        ? 'Computer wins'
        : 'Draw game';

    els.scoreBreakdown.innerHTML = `
      <div class="breakdown-row header"><span>Category</span><span>You</span><span>Computer</span></div>
      ${result.rows.map(row => `<div class="breakdown-row"><span>${row[0]}</span><span>${row[1]}</span><span>${row[2]}</span></div>`).join('')}
    `;
    els.scoreModal.classList.remove('hidden');
  }

  function hideScoreModal() {
    els.scoreModal.classList.add('hidden');
  }

  function makeCardElement(card, options = {}) {
    const { back = false, selected = false, dealIndex = null, onClick = null } = options;
    const el = document.createElement('button');
    el.type = 'button';
    el.className = `playing-card${back ? ' back' : ''}${!back && card.color === 'red' ? ' red' : ''}${selected ? ' selected' : ''}${dealIndex !== null ? ' deal-in' : ''}`;
    if (dealIndex !== null) el.style.setProperty('--deal-delay', `${dealIndex * 85}ms`);
    el.setAttribute('aria-label', back ? 'Hidden card' : cardLabel(card));
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
    state.hands.ai.forEach((card, index) => els.aiHand.appendChild(makeCardElement(card, {
      back: true,
      dealIndex: state.animateHandsDeal ? index : null,
    })));

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
    const captureValid = isValidSelectedCapture();
    const discardValid = canDiscardSelected();
    els.playBtn.disabled = state.turn !== 'player' || state.busy || !state.selectedHandId;
    els.clearSelectionBtn.disabled = state.turn !== 'player' || state.busy || (!state.selectedHandId && state.selectedTableIds.size === 0);

    els.playBtn.textContent = 'Play card';

    const handCard = selectedHandCard();
    els.selectionHelp.textContent = handCard ? 'Card selected' : 'Choose a hand card';
  }

  function renderStats() {
    els.deckCount.textContent = state.deck.length;
    els.playerCapturedLabel.textContent = `${state.captured.player.length} captured`;
    els.aiCapturedLabel.textContent = `${state.captured.ai.length} captured`;

    const aiTurnActive = state.turn === 'ai' || state.busy;
    els.turnPill.textContent = aiTurnActive ? 'Computer turn' : 'Your turn';
    els.turnPill.classList.toggle('ai', aiTurnActive);
  }

  function render() {
    renderHands();
    renderTable();
    renderControls();
    renderStats();
    state.animateHandsDeal = false;
    state.animateTableDeal = false;
  }

  function openRules() {
    clearPendingTimer();
    els.rulesModal.classList.remove('hidden');
  }

  function closeRules() {
    els.rulesModal.classList.add('hidden');
    if (state.pendingAction) scheduleAction(state.pendingAction, 180);
  }


  function openScoring() {
    clearPendingTimer();
    els.scoringModal.classList.remove('hidden');
  }

  function closeScoring() {
    els.scoringModal.classList.add('hidden');
    if (state.pendingAction) scheduleAction(state.pendingAction, 180);
  }

  function openNewGameConfirm() {
    clearPendingTimer();
    els.newGameModal.classList.remove('hidden');
  }

  function closeNewGameConfirm() {
    els.newGameModal.classList.add('hidden');
    if (state.pendingAction) scheduleAction(state.pendingAction, 180);
  }

  function confirmNewGame() {
    els.newGameModal.classList.add('hidden');
    newGame();
  }

  els.playBtn.addEventListener('click', playSelected);
  els.clearSelectionBtn.addEventListener('click', clearSelection);
  els.scoringBtn.addEventListener('click', openScoring);
  els.rulesBtn.addEventListener('click', openRules);
  els.newGameBtn.addEventListener('click', openNewGameConfirm);
  els.cancelNewGameBtn.addEventListener('click', closeNewGameConfirm);
  els.confirmNewGameBtn.addEventListener('click', confirmNewGame);
  els.playAgainBtn.addEventListener('click', newGame);
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeRules));
  document.querySelectorAll('[data-close-scoring]').forEach(el => el.addEventListener('click', closeScoring));
  document.querySelectorAll('[data-close-new-game]').forEach(el => el.addEventListener('click', closeNewGameConfirm));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !els.rulesModal.classList.contains('hidden')) closeRules();
    else if (e.key === 'Escape' && !els.scoringModal.classList.contains('hidden')) closeScoring();
    else if (e.key === 'Escape' && !els.newGameModal.classList.contains('hidden')) closeNewGameConfirm();
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(renderTable, 100);
  });

  newGame();
})();
