const myDeck1Data = {
  id: 'MYDC1',
  name: 'My deck 1',
  type: 'answers',
  cards: [
    { cardText: 'MYDC1 Card 1', id: 1 },
    { cardText: 'MYDC1 Another card', id: 2 },
    { cardText: 'MYDC1 An answer', id: 3 },
    { cardText: 'MYDC1 This is an answer', id: 4 },
    { cardText: 'MYDC1 Card 5', id: 5 },
    { cardText: 'MYDC1 This is an answer', id: 6 },
    { cardText: 'MYDC1 This is an answer', id: 7 },
    { cardText: 'MYDC1 This is an answer', id: 8 },
    { cardText: 'MYDC1 This is an answer', id: 9 },
    { cardText: 'MYDC1 This is an answer', id: 10 },
    { cardText: 'MYDC1 Card 11', id: 11 },
    { cardText: 'MYDC1 Another card', id: 12 },
    { cardText: 'MYDC1 An answer', id: 13 },
    { cardText: 'MYDC1 This is an answer', id: 14 },
    { cardText: 'MYDC1 Card 15', id: 15 },
    { cardText: 'MYDC1 This is an answer', id: 16 },
    { cardText: 'MYDC1 This is an answer', id: 17 },
    { cardText: 'MYDC1 This is an answer', id: 18 },
    { cardText: 'MYDC1 This is an answer', id: 19 },
    { cardText: 'MYDC1 This is an answer', id: 20 },
  ],
};

const myDeck2Data = {
  id: 'MYDC2',
  name: 'My deck 2',
  type: 'answers',
  cards: [
    { cardText: 'MYDC2 Card 1', id: 51 },
    { cardText: 'MYDC2 Another card', id: 52 },
    { cardText: 'MYDC2 An answer', id: 53 },
    { cardText: 'MYDC2 This is an answer', id: 54 },
    { cardText: 'MYDC2 Card 5', id: 55 },
    { cardText: 'MYDC2 This is an answer', id: 56 },
    { cardText: 'MYDC2 This is an answer', id: 57 },
    { cardText: 'MYDC2 This is an answer', id: 58 },
    { cardText: 'MYDC2 This is an answer', id: 59 },
    { cardText: 'MYDC2 This is an answer', id: 60 },
    { cardText: 'MYDC2 Card 11', id: 61 },
    { cardText: 'MYDC2 Another card', id: 62 },
    { cardText: 'MYDC2 An answer', id: 63 },
    { cardText: 'MYDC2 This is an answer', id: 64 },
    { cardText: 'MYDC2 Card 15', id: 65 },
    { cardText: 'MYDC2 This is an answer', id: 66 },
    { cardText: 'MYDC2 This is an answer', id: 67 },
    { cardText: 'MYDC2 This is an answer', id: 68 },
    { cardText: 'MYDC2 This is an answer', id: 69 },
    { cardText: 'MYDC2 This is an answer', id: 70 },
  ],
};

const myDecksData = [myDeck1Data, myDeck2Data];

const otherDeck1Data = {
  id: 'OTDC1',
  name: 'Other deck 1',
  type: 'answers',
  cards: [
    { cardText: 'Other deck card 1', id: 101 },
    { cardText: 'Other deck card 2', id: 102 },
    { cardText: 'Other deck card 3', id: 103 },
    { cardText: 'Other deck card 4', id: 104 },
    { cardText: 'Other deck card 5', id: 105 },
    { cardText: 'Other deck card 6', id: 106 },
    { cardText: 'Other deck card 7', id: 107 },
    { cardText: 'Other deck card 8', id: 108 },
  ],
};

const otherDeck2Data = {
  id: 'OTDC2',
  name: 'Other deck 2',
  type: 'answers',
  cards: [
    { cardText: 'Other deck 2 card 1', id: 201 },
    { cardText: 'Other deck 2 card 2', id: 202 },
    { cardText: 'Other deck 2 card 3', id: 203 },
    { cardText: 'Other deck 2 card 4', id: 204 },
    { cardText: 'Other deck 2 card 5', id: 205 },
    { cardText: 'Other deck 2 card 6', id: 206 },
    { cardText: 'Other deck 2 card 7', id: 207 },
    { cardText: 'Other deck 2 card 8', id: 208 },
    { cardText: 'Other deck 2 card 9', id: 209 },
    { cardText: 'Other deck 2 card 10', id: 210 },
    { cardText: 'Other deck 2 card 11', id: 211 },
    { cardText: 'Other deck 2 card 12', id: 212 },
    { cardText: 'Other deck 2 card 13', id: 213 },
    { cardText: 'Other deck 2 card 14', id: 214 },
    { cardText: 'Other deck 2 card 15', id: 215 },
    { cardText: 'Other deck 2 card 16', id: 216 },
  ],
};

let deckIDCounter = 3;

const otherDecksData = [otherDeck1Data, otherDeck2Data];

const newDeck = () => {
  const deck = {
    id: `MYDC${deckIDCounter}`,
    name: `My deck ${deckIDCounter}`,
    type: 'answers',
    cards: [],
  };

  deckIDCounter++;
  return deck;
};

export { myDecksData, otherDecksData, newDeck };
