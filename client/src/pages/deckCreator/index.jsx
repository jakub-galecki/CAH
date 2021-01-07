import './style.scss';

import React, { useState } from 'react';

import { DeckSwitcher } from '../../components/deckCreator/containers/DeckSwitcher';
import { myDeck1Data, otherDeck1Data } from './dummyData';

const DeckCreator = () => {
  const [myDeck, setMyDeck] = useState(myDeck1Data);
  const [chosenDecks, _setChosenDecks] = useState([otherDeck1Data]);

  const updateCardInDeck = (cardID, newContent) => {
    console.log(
      `Updating card ${cardID} to "${newContent}". Send this to server`,
    );
    const newCards = myDeck.cards.map((card) =>
      cardID === card.id ? { cardText: newContent, id: cardID } : card,
    );
    setMyDeck({ ...myDeck, cards: newCards });
  };

  const addNewCardToDeck = (newContent) => {
    console.log(`Adding new card "${newContent}" to deck. Send this to server`);

    const newCards = Array.from(myDeck.cards);
    //TODO: Change id from random to a value from server
    newCards.unshift({
      cardText: newContent,
      id: Math.floor(Math.random() * 5000) + 100,
    });

    setMyDeck({ ...myDeck, cards: newCards });
  };

  const removeCardFromDeck = (cardID) => {
    console.log(`Removing card ${cardID} from deck. Send this to server`);

    const newCards = myDeck.cards.filter((card) => card.id !== cardID);
    setMyDeck({ ...myDeck, cards: newCards });
  };

  return (
    <div className="deck-creator">
      <DeckSwitcher
        myDeck={myDeck}
        chosenDecks={chosenDecks}
        updateCard={updateCardInDeck}
        addCard={addNewCardToDeck}
        removeCard={removeCardFromDeck}
      ></DeckSwitcher>
    </div>
  );
};

export { DeckCreator };
