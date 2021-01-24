import './style.scss';

import React, { useEffect,useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { QuestionCard } from '../../components/game/cards/QuestionCard';
import { CardsInHand, PlayedCards } from '../../components/game/containers';
import { Counter } from '../../components/game/counter/Counter';
import { Deck } from '../../components/game/deck/Deck';
import { CustomDragLayer } from '../../components/game/dragAndDrop/CustomDragLayer';
import { Leaderboard } from '../../components/shared/leaderboard/Leaderboard';
import { useAuth } from '../../contexts/auth';
import { useConnection } from '../../contexts/connection';
import { useRoom } from '../../contexts/room';
import { cardsInHandData } from './dummyData';

const Game = () => {
  const [cardsPlayed, setCardsPlayed] = useState(0);
  const [cardsInHand, setCardsInHand] = useState(cardsInHandData);
  const [cardsOnTable, setCardsOnTable] = useState(null);
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const [judge, setJudge] = useState(null);
  const [isJudge, setIsJudge] = useState(false);
  const [winnerId, setWinnerId] = useState(false);
  const [isFreezed, setIsFreezed] = useState(true);
  const { rpc, ws } = useConnection();
  const { userId } = useAuth();
  const { roomId } = useRoom();

  // @todo: temp - gather info bout users
  useEffect( async () => {
    const data = await rpc.send('room.getUsers', { roomId }, false);
    console.log(data);
    const users = data.map((user) => ({
      id: user._id,
      nick: user.username,
      isAdmin: false,
      points: 0,
    }))
    setLeaderBoardData(users)
  }, [])

  ws.onmessage = (msg) => {
    console.log(msg);
    const { result } = JSON.parse(msg.data);
    if (!result) return; // @todo: error handling
    switch (result.method) {
      case 'game.nextTurn':
        if (!result.data) return; // @todo: error handling

        setCardsOnTable(null);
        setWinnerId(null);
        setIsFreezed(false);
        setJudge(result.data.judge);
        setCardsInHand(result.data.cards);

        // setIsJudge
        if (userId === result.data.judge) setIsJudge(true);
        else setIsJudge(false);

        break;
      case 'game.endPickingTime':
        setIsFreezed(true);
        setCardsOnTable(result.data.cards);

        break;
      case 'game.winner':
        if (!result.data) return; // @todo: error handling
        setWinnerId(result.data._id);

        break;
      default:
        console.log(result);
    }
  };

  const playCardFromHand = (cardID) => {
    if (isFreezed && isJudge) return;

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
        <CardsInHand cards={cardsInHand} playCardFromHand={playCardFromHand} />
        <div className="left-side-panel">
          <Deck color="black" cardsLeft={23} cardsMax={40} />
          <Counter />
          <Deck color="white" cardsLeft={44} cardsMax={80} />
        </div>
        <QuestionCard text="Fill this sentence _________________" />
        <PlayedCards numberOfCards={cardsPlayed} />

        <Leaderboard playersInfo={leaderboardData} isInGameplay={true} />
        <CustomDragLayer />
      </DndProvider>
    </div>
  );
};

export { Game };
