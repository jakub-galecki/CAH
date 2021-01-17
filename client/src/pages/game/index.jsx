import './style.scss';

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { QuestionCard } from '../../components/game/cards/QuestionCard';
import { CardsInHand, PlayedCards } from '../../components/game/containers';
import { Counter } from '../../components/game/counter/Counter';
import { Deck } from '../../components/game/deck/Deck';
import { CustomDragLayer } from '../../components/game/dragAndDrop/CustomDragLayer';
import { Leaderboard } from '../../components/game/leaderboard/Leaderboard';
import { cardsInHandData, leaderboardData } from './dummyData';

const Game = () => {
  const [cardsPlayed, setCardsPlayed] = useState(0);
  const [cardsInHand, setCardsInHand] = useState(cardsInHandData);

  const playCardFromHand = (cardID) => {
    if (canPlayCard(cardID)) {
      setCardsPlayed(cardsPlayed + 1);
      removeCardFromHand(cardID);
    }
  };

  const canPlayCard = (cardID) => {
    //TODO: Here check whether the card can be played (Haven't yet played a card and the player is not black)
    console.log(cardID);
    return true;
  };

  const removeCardFromHand = (cardID) => {
    setCardsInHand(cardsInHand.filter((element) => element.id !== cardID));
  };

  return (
    <div className="game">
      <DndProvider backend={HTML5Backend}>
        <CardsInHand
          cards={cardsInHand}
          playCardFromHand={playCardFromHand}
        ></CardsInHand>
        <div className="left-side-panel">
          <Deck color="black" cardsLeft={23} cardsMax={40}></Deck>
          <Counter></Counter>
          <Deck color="white" cardsLeft={44} cardsMax={80}></Deck>
        </div>
        <QuestionCard text="Fill this sentence _________________"></QuestionCard>
        <PlayedCards numberOfCards={cardsPlayed}></PlayedCards>

        <Leaderboard
          playersInfo={leaderboardData}
          isInGameplay={true}
        ></Leaderboard>
        <CustomDragLayer></CustomDragLayer>
      </DndProvider>
    </div>
  );
};

export { Game };
