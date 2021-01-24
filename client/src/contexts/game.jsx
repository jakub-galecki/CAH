import React, { createContext, useContext, useEffect, useState } from 'react';

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [gameId, _setGameId] = useState(null);

  useEffect(() => {
    const currentGame = localStorage.getItem('gameId');
    if (currentGame) _setGameId(currentGame);
  }, []);

  const setGameId = (game) => {
    localStorage.setItem('gameId', game);
    _setGameId(game);
  };

  return (
    <GameContext.Provider value={{ gameId, setGameId }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
