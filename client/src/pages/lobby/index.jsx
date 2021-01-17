import './style.scss';

import React, { useState } from 'react';

import { generateDecks } from '../../components/lobby/cardPanel/fakeDecks';
import { CardPanel } from '../../components/lobby/cardPanel/index';
import { Overview } from '../../components/lobby/overview/index';
import { Team } from '../../components/lobby/team/index';

const Lobby = () => {
  const [availableDecks, _setAvailableDecks] = useState(generateDecks(18));
  const [chosenDecks, setChosenDecks] = useState(availableDecks);

  const isDeckChosen = (deckID) => chosenDecks.some((d) => d.id === deckID);

  const addDeck = (deckID) => {
    if (!isDeckChosen(deckID)) {
      const deckToAdd = availableDecks.find((deck) => deck.id === deckID);
      if (deckToAdd) {
        setChosenDecks([...chosenDecks, deckToAdd]);
        console.log(`Adding deck ${deckID} to room. Send this to server`);
      }
    }
  };

  const removeDeck = (deckID) => {
    setChosenDecks(chosenDecks.filter((deck) => deck.id !== deckID));
    console.log(`Removing deck ${deckID} from room. Send this to server`);
  };

  return (
    <div className="lobby">
      <CardPanel
        availableDecks={availableDecks}
        addDeck={addDeck}
        isDeckChosen={isDeckChosen}
      />
      <Overview
        chosenDecks={chosenDecks}
        removeDeck={removeDeck}
        isDeckChosen={isDeckChosen}
      />
      <Team />
    </div>
  );
};

export { Lobby };
