import React, { createContext, useState } from 'react'


export const MyContext = createContext();

export default function ContextProvider({ children }) {
    
    const [currentCity, setCurrentCity] = useState(null);
    const [playerCount, setPlayerCount] = useState(0);
    const [numberOnDices, setNumberOnDices] = useState([-1, -1]);
    const [myPlayerNumber, setMyPlayerNumber] = useState(null);
    const [room, setRoom] = useState(null);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [showCardDetails, setShowCardDetails] = useState(false);
    const value = {
        currentCity,
        setCurrentCity,
        playerCount,
        setPlayerCount,
        numberOnDices,
        setNumberOnDices,
        myPlayerNumber,
        setMyPlayerNumber,
        room,
        setRoom,
        isMyTurn,
        setIsMyTurn,
        showCardDetails,
        setShowCardDetails,
    }

    return (<MyContext.Provider value={value}>
        {children}
    </MyContext.Provider>)
}

