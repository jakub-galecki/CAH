const cardsInHandData = [
  { cardText: 'Card 1', id: 1 },
  { cardText: 'Another card', id: 2 },
  { cardText: 'An answer', id: 3 },
  { cardText: 'This is an answer', id: 4 },
  { cardText: 'Card 5', id: 5 },
  { cardText: 'This is an answer', id: 6 },
  { cardText: 'This is an answer', id: 7 },
  { cardText: 'This is an answer', id: 8 },
  { cardText: 'This is an answer', id: 9 },
  { cardText: 'This is an answer', id: 10 },
];

const leaderboardData = [
  { id: 1, state: 'choosing', nick: 'Player_1', points: 8, isAdmin: false },
  { id: 2, state: 'black', nick: 'Player_2', points: 2, isAdmin: false },
  { id: 3, state: 'choosing', nick: 'Player_3', points: 15, isAdmin: false },
  { id: 4, state: 'chosen', nick: 'Player_4', points: 4, isAdmin: true },
  { id: 5, state: 'chosen', nick: 'Player_5', points: 9, isAdmin: false },
  { id: 6, state: 'choosing', nick: 'Player_6', points: 7, isAdmin: false },
  { id: 7, state: 'chosen', nick: 'Player_7', points: 23, isAdmin: false },
  { id: 8, state: 'chosen', nick: 'Player_8', points: 21, isAdmin: false },
  { id: 9, state: 'choosing', nick: 'Player_9', points: 9, isAdmin: false },
  { id: 10, state: 'choosing', nick: 'Player_10', points: 18, isAdmin: false },
];

export { cardsInHandData, leaderboardData };
