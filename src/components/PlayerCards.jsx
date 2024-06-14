import React, { useContext,useEffect } from 'react';

import PlayerCard from "./PlayerCard";
import avatar1 from "../media/user-4.svg";
import avatar2 from "../media/user-1.svg";
import avatar3 from "../media/user-3.svg";
import avatar4 from "../media/user-2.svg";
import { MyContext } from '../context/MyContext';
import {PlayersContext} from '../context/PlayersContext';

const PlayerCards = (props) => {
  const {playerCount} = useContext(MyContext);
  const {allPlayersData} = useContext(PlayersContext);
  useEffect(() => {
    // setAllPlayersData(Array.from({length:playerCount},(v,ind)=> {return { playerNumber:ind+1, currentPosition: 1, cashAvailable: 1000, propertiesOwned:[] }}));
  }, []);
  let playerSelected = props.playerSelected;
  
  
  const avatars = [avatar1, avatar2, avatar3, avatar4];
  let playerCard = [];
  for (let i = 0; i < playerCount; i++) {
    playerCard.push(i);
  }
  
  return (
    (<div className="">
    
    <div className="flex gap-2 flex-col	">
        
        {playerCard.map((i) => {
          return <PlayerCard key={i}  playerNo={i + 1} avatar={avatars[i]} username={allPlayersData[i].username}/>;
        })}
    </div>
    
    
  </div>)
  )
  
}
export default PlayerCards


