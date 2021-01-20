import './style.scss';

import React, { useEffect,useState } from 'react';

import { generateDecks } from '../../components/lobby/cardPanel/fakeDecks';
import { CardPanel } from '../../components/lobby/cardPanel/index';
import { Overview } from '../../components/lobby/overview/index';
import { Leaderboard } from '../../components/shared/leaderboard/Leaderboard';
import { useConnection } from '../../contexts/connection';
import { useRoom } from '../../contexts/room';

const Lobby = () => {
  const [availableDecks, _setAvailableDecks] = useState(generateDecks(18));
  const [chosenDecks, setChosenDecks] = useState([]);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  const { rpc } = useConnection();
  const { roomId } = useRoom();
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

  useEffect(async () => {
    try {
      const result = await rpc.send('room.getRoom', {roomId}, false); 
      const users = result.users.map((user) => {
        return {
          isAdmin: user === result.owner,
          id: user,
          nick: user, // ! temp
          state: 'lobby', // ! temp
          points: 0 // ! temp
        }
      })
      setLeaderBoardData(users);
    } catch (e){
      console.error(e);
    }
  }, [])

  return (
    <div className="lobby">
      <CardPanel
        availableDecks={availableDecks}
        addDeck={addDeck}
        isDeckChosen={isDeckChosen}
        isAdmin={isAdmin}
      />
      <Overview
        chosenDecks={chosenDecks}
        removeDeck={removeDeck}
        isDeckChosen={isDeckChosen}
        isAdmin={isAdmin}
      />
      <Leaderboard playersInfo={leaderBoardData} isInGameplay={false} />
    </div>
  );
};

export { Lobby };
