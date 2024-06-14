import React, { useContext, useEffect, useState } from "react";
import Gamecard from "./Gamecard";
import Dice from "./Dice";
import PlayerMenu from "./PlayerMenu";
import PlayerCards from "./PlayerCards";
import { MyContext } from "../context/MyContext";
import { PlayersContext } from "../context/PlayersContext";
import { card_details } from "../data/cards_details";

function FailedApp() {
  const [playerSelected, setPlayerSelected] = useState(true);
  const {allGameItemsRefs,allPlayersData} = useContext(PlayersContext);
  const {isMyTurn, myPlayerNumber} = useContext(MyContext);
  const [toBuildActivate, setToBuildActivate] = useState(false);
  const [toSellActivate, setToSellActivate] = useState(false);
  useEffect(() => {
    if(toBuildActivate) {
      const {cashAvailable} = allPlayersData[myPlayerNumber-1];
  
      for(let eleNo=1 ; eleNo<=40 ; eleNo++) {
        const currentCityForComparison = allGameItemsRefs.current[eleNo].City.replace(/\s+/g, '');
        const canPurchaseProperty = cashAvailable >= (card_details.cities[currentCityForComparison]?.["House_Price"] ?? 0);
        const nowColor = card_details.cities[currentCityForComparison]?.Card_Color ?? "#FFFFFF";
        const nowLevelOfConstruction = allGameItemsRefs.current[eleNo].levelOfConstruction;

        const sameColorCardsLevelOfConstruction = [1,2,3,0,-1,-2,-3].map(val => {
          let ind = eleNo+val; 
          if(ind <= 0 || ind>40 || nowColor === "#FFFFFF") return null;
          if(allGameItemsRefs.current[ind].Card_Color != nowColor) return null;
          return allGameItemsRefs.current[ind];
        }).filter(val => val!=null).map(({levelOfConstruction}) => levelOfConstruction);
        console.log(sameColorCardsLevelOfConstruction);

        if(allGameItemsRefs.current[eleNo].tripleRent === true && allGameItemsRefs.current[eleNo].boughtBy === myPlayerNumber-1 && canPurchaseProperty && (sameColorCardsLevelOfConstruction.every(val => nowLevelOfConstruction<=val)) && nowLevelOfConstruction < 5) {
          const element = allGameItemsRefs.current[eleNo].refToDiv.current;
          element.style.filter = "contrast(100%)";
          if(isMyTurn) element.dataset.buildingHouse = true;
        }
        else allGameItemsRefs.current[eleNo].refToDiv.current.style.filter = "contrast(20%)";
      }
    }
    else {
      for(let eleNo=1 ; eleNo<=40 ; eleNo++) {
        const element = allGameItemsRefs.current[eleNo].refToDiv.current;
        element.style.filter = "contrast(100%)";
        element.dataset.buildingHouse = false;
      }
    }
  
    return () => {
      ;
    }
  }, [toBuildActivate]);
  useEffect(() => {
    if(toSellActivate) {
      
      for(let eleNo=1; eleNo<=40 ; eleNo++) {
        const currentCityForComparison = allGameItemsRefs.current[eleNo].City.replace(/\s+/g, '');

        const nowLevelOfConstruction = allGameItemsRefs.current[eleNo].levelOfConstruction;
        const nowColor = card_details.cities[currentCityForComparison]?.Card_Color ?? "#FFFFFF";

        const sameColorCardsLevelOfConstruction = [1,2,3,0,-1,-2,-3].map(val => {
          let ind = eleNo+val; 
          if(ind <= 0 || ind>40 || nowColor === "#FFFFFF") return null;
          if(allGameItemsRefs.current[ind].Card_Color != nowColor) return null;
          return allGameItemsRefs.current[ind];
        }).filter(val => val!=null).map(({levelOfConstruction}) => levelOfConstruction);

        if(allGameItemsRefs.current[eleNo].boughtBy === myPlayerNumber-1 && nowLevelOfConstruction > 0 && (sameColorCardsLevelOfConstruction.every(val => nowLevelOfConstruction>=val))) {
          const element = allGameItemsRefs.current[eleNo].refToDiv.current;
          element.style.filter = "contrast(100%)";
          if(isMyTurn) element.dataset.sellingHouse = true;
        }
        else allGameItemsRefs.current[eleNo].refToDiv.current.style.filter = "contrast(20%)";
      }
    }
    else {
      for(let eleNo=1 ; eleNo<=40 ; eleNo++) {
        const element = allGameItemsRefs.current[eleNo].refToDiv.current;
        element.style.filter = "contrast(100%)";
        element.dataset.sellingHouse = false;
      }
    }
  
    return () => {
      ;
    }
  }, [toSellActivate])
  
  return (
    <div className="h-screen flex max-lg:flex-col md:justify-evenly md:p-1 gap-4 bg-cover bg-center bg-no-repeat cursor-retro" style={{backgroundImage:`url(/images/main-bg.svg)`,backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',}}>
      <Gamecard setters={{setToBuildActivate, setToSellActivate}}/>

      <div className="flex flex-nowrap justify-around items-center gap-2 flex-row sm:min-h-[calc(calc(100vh-100vw)/2)] md:min-w-[calc(calc(100vw-100vh)/2)] lg:flex-col">
        {
          playerSelected && <Dice/>
        }

        <div className="flex flex-col justify gap-2 sm:flex-1">
          {playerSelected ? <PlayerCards playerSelected={playerSelected} setPlayerSelected={setPlayerSelected} /> :
            <PlayerMenu setPlayerSelected={setPlayerSelected} playerSelected={playerSelected} />}
            <button className="text-white bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2" onClick={()=>setToBuildActivate(prev => !prev)}>{toBuildActivate ? "cancle" : "build"}</button>
            <button className="text-white bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2" onClick={()=>setToSellActivate(prev => !prev)}>{toSellActivate ? "cancle" : "sell"}</button>
        </div>
      </div>
    </div>
  );
}

export default FailedApp;
