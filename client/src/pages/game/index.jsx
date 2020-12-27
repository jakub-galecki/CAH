import './style.scss';

import React from 'react';

import { QuestionCard } from '../../components/game/cards/QuestionCard';
import { CardsInHand, PlayedCards } from '../../components/game/containers';
import { Counter } from '../../components/game/counter/Counter';
import { Deck } from '../../components/game/deck/Deck';
import { Leaderboard } from '../../components/game/leaderboard/Leaderboard';
import { cardsInHandData, leaderboardData } from './dummyData';

const Game = () => (
  <div className="game">
    <CardsInHand cards={cardsInHandData}></CardsInHand>
    <div className="left-side-panel">
      <Deck color="black" cardsLeft={23} cardsMax={40}></Deck>
      <Counter></Counter>
      <Deck color="white" cardsLeft={44} cardsMax={80}></Deck>
    </div>
    <QuestionCard text="Fill this sentence _________________"></QuestionCard>
    <PlayedCards numberOfCards={10}></PlayedCards>

    <Leaderboard playersInfo={leaderboardData}></Leaderboard>
  </div>
);

export { Game };
