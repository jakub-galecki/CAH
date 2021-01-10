import './style.scss';

import React, { useState } from 'react';

import { DeckSwitcher } from '../../components/deckCreator/containers/DeckSwitcher';
import { Sidebar } from '../../components/deckCreator/sidebar/Sidebar';
import { myDecksData, newDeck, otherDecksData } from './dummyData';

const DeckCreator = () => {
  const [myDecks, setMyDecks] = useState(myDecksData);
  const [currentMyDeck, setCurrentMyDeck] = useState(myDecks[0]);
  const [chosenDecks, setChosenDecks] = useState([otherDecksData[0]]);

  const setCurrentMyDeckCards = (newCards) => {
    const newMyDeck = { ...currentMyDeck, cards: newCards };
    setCurrentMyDeck(newMyDeck);
    setMyDecks(
      myDecks.map((deck) => (deck.id === newMyDeck.id ? newMyDeck : deck)),
    );
  };

  const updateCardInDeck = (cardID, newContent) => {
    console.log(
      `Updating card ${cardID} to "${newContent}". Send this to server`,
    );
    const newCards = currentMyDeck.cards.map((card) =>
      cardID === card.id ? { cardText: newContent, id: cardID } : card,
    );
    setCurrentMyDeckCards(newCards);
  };

  const addNewCardToDeck = (newContent) => {
    console.log(`Adding new card "${newContent}" to deck. Send this to server`);

    const newCards = Array.from(currentMyDeck.cards);
    //TODO: Change id from random to a value from server
    newCards.unshift({
      cardText: newContent,
      id: Math.floor(Math.random() * 5000) + 100,
    });

    setCurrentMyDeckCards(newCards);
  };

  const removeCardFromDeck = (cardID) => {
    console.log(`Removing card ${cardID} from deck. Send this to server`);

    const newCards = currentMyDeck.cards.filter((card) => card.id !== cardID);
    setCurrentMyDeckCards(newCards);
  };

  const toggleChosenDeckVisibility = (deckID) => {
    const isVisible = isDeckVisible(deckID);
    if (isVisible) {
      hideDeck(deckID);
    } else {
      const chosenDeck =
        otherDecksData.find((deck) => deck.id === deckID) ||
        myDecks.find((deck) => deck.id === deckID);
      setChosenDecks([...chosenDecks, chosenDeck]);
    }
  };

  const isDeckVisible = (deckID) => {
    return chosenDecks.find((deck) => deck.id === deckID);
  };

  const hideDeck = (deckID) => {
    setChosenDecks(chosenDecks.filter((deck) => deck.id !== deckID));
  };

  const editDeck = (deckID) => {
    if (isDeckVisible(deckID)) {
      hideDeck(deckID);
    }

    const newMyDeck = myDecks.find((deck) => deck.id === deckID);
    setCurrentMyDeck(newMyDeck);
  };

  const removeDeck = (deckID) => {
    console.log(`Removing my deck ${deckID}. Send this to server`);
    setMyDecks(myDecks.filter((deck) => deck.id !== deckID));
  };

  const newEmptyDeck = () => {
    const deck = newDeck();
    console.log(`Creating new empty deck ${deck.id}. Send this to server`);
    setMyDecks([...myDecks, deck]);
    setCurrentMyDeck(deck);
  };

  return (
    <div className="deck-creator">
      <Sidebar
        availableDecks={otherDecksData}
        chosenDecks={chosenDecks}
        myDecks={myDecks}
        currentMyDeck={currentMyDeck}
        toggleDeckVisiblity={toggleChosenDeckVisibility}
        editDeck={editDeck}
        removeDeck={removeDeck}
        newDeck={newEmptyDeck}
      ></Sidebar>
      <DeckSwitcher
        myDeck={currentMyDeck}
        chosenDecks={chosenDecks}
        updateCard={updateCardInDeck}
        addCard={addNewCardToDeck}
        removeCard={removeCardFromDeck}
      ></DeckSwitcher>
    </div>
  );
};

export { DeckCreator };
