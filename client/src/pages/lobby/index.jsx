import './style.scss';

import React, { useEffect, useState } from 'react';

import { addGeneratedDeckToServer } from '../../components/lobby/cardPanel/fakeDecks';
import { CardPanel } from '../../components/lobby/cardPanel/index';
import { Overview } from '../../components/lobby/overview/index';
import { Leaderboard } from '../../components/shared/leaderboard/Leaderboard';
import { useAuth } from '../../contexts/auth';
import { useConnection } from '../../contexts/connection';
import { useRoom } from '../../contexts/room';

const Lobby = () => {
  const [availableDecks, setAvailableDecks] = useState([]);
  const [chosenDecks, setChosenDecks] = useState([]);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const { ws, rpc } = useConnection();
  const { userId } = useAuth();
  const { roomId } = useRoom();
  const isDeckChosen = deckID => chosenDecks.some(d => d.id === deckID);

  // @todo: rewrite ws handling logic inside specialized module
  ws.onmessage = msg => {
    console.log(msg);
    const { result } = JSON.parse(msg.data);
    console.log(result);
    switch (result.method) {
      case 'room.join':
        if (result.data._id === roomId) {
          const newUser = {
            id: result.user._id,
            isAdmin: false,
            nick: result.user.username,
            points: 0,
            state: 'lobby',
          };
          setLeaderBoardData([...leaderBoardData, newUser]);
        }
        break;
      default:
        console.log(result);
    }
  };

  const addDeck = deckID => {
    if (!isDeckChosen(deckID)) {
      const deckToAdd = availableDecks.find(deck => deck.id === deckID);
      if (deckToAdd) {
        setChosenDecks([...chosenDecks, deckToAdd]);

        //TODO: rpc.send('room.addDeck', {deckId: deckId}, false)
        console.log(`Adding deck ${deckID} to room. Send this to server`);
      }
    }
  };

  const removeDeck = deckID => {
    setChosenDecks(chosenDecks.filter(deck => deck.id !== deckID));

    //TODO: rpc.send('room.removeDeck', {deckId: deckId}, false)
    console.log(`Removing deck ${deckID} from room. Send this to server`);
  };

  const fetchAvailableDecks = async () => {
    try {
      const decksFromServer = await rpc.send('deck.getAllDecks', {}, false);
      const decks = decksFromServer.map(d => ({
        id: d.shortId,
        title: d.title,
        type: 'answers', // ! temp
        author: 'Author not fetched', // ! temp
        description: 'Description not fetched', // ! temp
        cardCount: -1, // ! temp
        createdAt: new Date(2020, 1, 1), // ! temp
      }));
      setAvailableDecks(decks);
    } catch (e) {
      console.error(e);
    }
  };

  // Temp code to create decks on key press ('a' for answers and 'q' for questions)
  const addDeckToServerOnKeyPress = async e => {
    if (e.key === 'a' || e.key === 'q') {
      await addGeneratedDeckToServer(userId, rpc, e.key === 'a' ? 0 : 1);
      fetchAvailableDecks();
    }
  };

  useEffect(async () => {
    if (isAdmin) window.addEventListener('keydown', addDeckToServerOnKeyPress);
    return () => window.removeEventListener(addDeckToServerOnKeyPress);
  }, [isAdmin]);

  //----------------------------------

  useEffect(async () => {
    try {
      const result = await rpc.send('room.getRoom', { roomId }, false);
      const users = result.users.map(({ username, _id }) => {
        return {
          isAdmin: _id === result.owner._id,
          id: _id,
          nick: username,
          state: 'lobby', // ! temp
          points: 0, // ! temp
        };
      });
      setLeaderBoardData(users);

      if (userId === result.owner) {
        setIsAdmin(true);
      }

      await fetchAvailableDecks();
    } catch (e) {
      console.error(e);
    }
  }, []);

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
