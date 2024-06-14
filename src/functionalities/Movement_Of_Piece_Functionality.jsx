import React, { useState, useEffect, useContext } from 'react';
import { PlayersContext } from '../context/PlayersContext';
import { MyContext } from '../context/MyContext';
import {colors_of_players , card_details} from '../data/cards_details';
import { SocketContext } from '../context/SocketContext';

let totalSumOnDiceForPromise = -1;
function waitForZero() {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (totalSumOnDiceForPromise <= 0) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 200); // Check every 100ms
  });
}
function useMovementFunctionality(props) {
  const { allPlayersData, setAllPlayersData, whosTurn, setWhosTurn, hisTurnJustEnded, setHisTurnJustEnded, allGameItemsRefs, whetherUserHasPurchasedProperty, setWhetherUserHasPurchasedProperty } = useContext(PlayersContext);
  const { currentCity, setCurrentCity,numberOnDices, myPlayerNumber, isMyTurn, playerCount } = useContext(MyContext);
  const {switchToNextPlayerTurn, payRent, giveSalary, sendToJail, chanceDikhado} = useContext(SocketContext)
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);
  const [totalSumOnDice, setTotalSumOnDice] = useState(-1);

  useEffect(() => {

    totalSumOnDiceForPromise = numberOnDices[0] + numberOnDices[1];
    setTotalSumOnDice(numberOnDices[0] + numberOnDices[1]);
  }, [numberOnDices]);
  useEffect(() => {
    if (totalSumOnDice > 0) {

      const timer = setTimeout(() => {
        setAllPlayersData(prev => {
          const newValues = prev.map((val, ind) => {
            if(val.currentPosition == 40 && isMyTurn && ind==whosTurn) {
              console.log("moment lode");
              giveSalary({whosTurn, money:200});
            }
            if (val.currentPosition == 40 && ind == whosTurn) {
              val.currentPosition = 0;
            }
            return ind === whosTurn ? { ...val, currentPosition: val.currentPosition + 1 } : val;
          });
          return newValues;
        });

        setTotalSumOnDice(prev => prev - 1); // Decrement remaining total sum
      }, 200);///increaseSpeed[0]

      return () => {
        clearInterval(timer);
      };
    }
    else if (totalSumOnDice == 0 && isMyTurn) {
      // setHisTurnJustEnded(whosTurn);
      const {currentPosition:currPlayerCurrentLocation, cashAvailable} = allPlayersData[whosTurn];
      console.log(currPlayerCurrentLocation, allGameItemsRefs.current[currPlayerCurrentLocation]);
      
      let currentCityForComparison = allGameItemsRefs.current[currPlayerCurrentLocation].City.replace(/\s+/g, '');
      let canPurchaseProperty = cashAvailable >= (card_details.cities[currentCityForComparison]?.["Purchase_Price"] ?? 0);

      if(currentCityForComparison === "Go" || currentCityForComparison === "Jail" || currentCityForComparison === "FreeParking" || currentCityForComparison === "GoToJail" || currentCityForComparison === "IncomeTax" || currentCityForComparison === "LuxaryTax" || allGameItemsRefs.current[currPlayerCurrentLocation].boughtBy === whosTurn || canPurchaseProperty === false)
        {
          console.log(currentCityForComparison);
          switch (currentCityForComparison) {
            case "IncomeTax": giveSalary({whosTurn, money:-200}); break;
            case "LuxaryTax": giveSalary({whosTurn, money:-75}); break;
            case "Jail": giveSalary({whosTurn, money:-50}); break;
            case "GoToJail": sendToJail({whosTurn}); break;
          }
          //ignore -> next 
          console.log("igrone");
          switchToNextPlayerTurn({whosTurn, playerCount});
          // setWhetherUserHasPurchasedProperty(0);
          // console.log("aaya");
          // setCurrentCity(null);
          // const nextTurn = (whosTurn+1) % allPlayersData.length;
          // setWhosTurn(nextTurn);  //this takes time
          // console.log("gg",whosTurn);
          // if(nextTurn+1 === myPlayerNumber) props.setBeat(true);
          // else props.setBeat(false);
        }
      else if(currentCityForComparison === "Chance" || currentCityForComparison === "CommunityChest") {
        const totalChanceCards = 8;
        const randomIndex = Math.floor(Math.random()*totalChanceCards);
        chanceDikhado({whosTurn, randomIndex, currPlayerCurrentLocation});
        switchToNextPlayerTurn({whosTurn, playerCount});
      }
      else if(allGameItemsRefs.current[currPlayerCurrentLocation].boughtBy===null) {
        setCurrentCity(allGameItemsRefs.current[currPlayerCurrentLocation].City);
      }
      else {
        //on another property
        const currentPosRef = allGameItemsRefs.current[currPlayerCurrentLocation];
        const levelOfConstruction = currentPosRef.levelOfConstruction;
        const tripleRent = currentPosRef.tripleRent;
        const boughtBy = currentPosRef.boughtBy;
        let priceToPay = calculateThePayableRent(currentCityForComparison, levelOfConstruction, tripleRent, boughtBy)
        payRent({whosTurn, boughtBy, priceToPay});
        console.log("payrentvala");
        switchToNextPlayerTurn({whosTurn, playerCount});
      }
    }
    totalSumOnDiceForPromise = totalSumOnDice;
    console.log(totalSumOnDiceForPromise);
  }, [totalSumOnDice]);

  const calculateThePayableRent = (currentCityForComparison, levelOfConstruction, tripleRent, boughtBy) => {
    let totalRent = 0;
    console.log(card_details,card_details.cities[currentCityForComparison],currentCityForComparison);
    if(currentCityForComparison.includes("Station") === true) {
      return [6,16,26,36].reduce((total, eleNo) => {return allGameItemsRefs.current[eleNo].boughtBy===boughtBy ? total*2 : total}, 25)/2;
    } 
    else if(currentCityForComparison === "ElectricCompany" || currentCityForComparison === "WaterWorks") {
      const multiplier = allGameItemsRefs.current[13].boughtBy === allGameItemsRefs.current[29].boughtBy ? 10 : 5;
      return (numberOnDices[0] + numberOnDices[1]) * multiplier;
    }
    else if(levelOfConstruction === 0) {
      totalRent += card_details.cities[currentCityForComparison]["Rent"] * (tripleRent ? 3 : 1);
    }
    else if(levelOfConstruction <= 4){
      const rentParameter = `Rent_with_${levelOfConstruction}_Houses`;
      totalRent += card_details.cities[currentCityForComparison][rentParameter];
    }
    else {
      totalRent += card_details.cities[currentCityForComparison]["Rent_with_Hotel"];
    }
    return totalRent;
  }
  // const getRandomDiceNumber = () => Math.floor(Math.random() * 6) + 1;
  // const startFromHere = () => {
  //   props.setBeat(prev => !prev);
  //   setIsIntervalRunning(prev => !prev);
  //   const interval = setInterval(() => {
  //     props.setNumberOnDices([getRandomDiceNumber(), getRandomDiceNumber()]);
  //   }, 60);

  //   setTimeout(() => {
  //     clearInterval(interval);
  //     setIsIntervalRunning(prev => !prev);
  //   }, 300);
  // }
  // return [startFromHere];
}

export { useMovementFunctionality, waitForZero };