import React, { useContext, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import moneyImage from "../media/money.png";
import { PlayersContext } from '../context/PlayersContext';
import {colors_of_players} from '../data/cards_details';

const PlayerCard = (props) => {
  let avatar = props.avatar;
  let playerNo = props.playerNo;
  let username = props.username;
  
  const { whosTurn, allPlayersData } = useContext(PlayersContext);
  const playerColor = colors_of_players[playerNo-1];

  // const borderStyle =` border-4 border-${playerColor}-200 border-b-${playerColor}-500`
  const borderStyle = {
    border: `6px solid ${playerColor}`,
    borderBottom: `6px solid ${playerColor}`,
    borderStyle: `inset`
  };


  return (
    <div className={`rounded-lg w-auto flex flex-row bg-[#071277] bg-gradient-to-l from-transparent via-[#3744ba] to-[#071277 ]
      ${(whosTurn + 1 == playerNo) ? "animate-scale-in-out" : "shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"} `} style={borderStyle} >
      <div className="rounded-full w-auto h-6 lg:h-12 m-2 z-10 aspect-square" style={{ backgroundImage: `url(${avatar})`, backgroundSize: "cover", }} >
      </div>

      <img className="w-auto h-4 my-auto lg:h-8" src={moneyImage} />

      <div>
        <p className="text-white text-sm lg:text-2xl font-bold tracking-wider font-mono">
          {username}
        </p>
        <p className="text-[#FFD89E] text-sm lg:text-xl font-bold">$ {allPlayersData[playerNo-1]?.cashAvailable ?? 1000}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
