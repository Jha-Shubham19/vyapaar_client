import React, {createContext, useState, useRef} from 'react'


export const PlayersContext = createContext();
function PlayersContextProvider({children}) {
  const [allPlayersData, setAllPlayersData] = useState([]);
  const [whosTurn, setWhosTurn] = useState(0);
  const [hisTurnJustEnded, setHisTurnJustEnded] = useState(null);
  const allGameItemsRefs = useRef([]);
  const [whetherUserHasPurchasedProperty,setWhetherUserHasPurchasedProperty] = useState(0);
  const [indexForChanceAndChest, setIndexForChanceAndChest] = useState([-1,-1]);
  const value = {
    allPlayersData,
    setAllPlayersData,
    whosTurn,
    setWhosTurn,
    hisTurnJustEnded,
    setHisTurnJustEnded,
    allGameItemsRefs, 
    whetherUserHasPurchasedProperty,
    setWhetherUserHasPurchasedProperty,
    indexForChanceAndChest,
    setIndexForChanceAndChest,
  };
  return (
    <PlayersContext.Provider value={value}>
      {children}
    </PlayersContext.Provider>
  )
}

export default PlayersContextProvider;