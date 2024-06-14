import React, { useContext, useEffect, useState, useRef } from "react";
import { createRoot } from 'react-dom/client';import FailedApp from "./components/FailedApp";
import MyContextFunction,{MyContext} from "./context/MyContext";
import PlayersContextFunction,{PlayersContext} from "./context/PlayersContext";
import {socket} from './socket';
import { card_details, chances_cards, chest_cards } from "./data/cards_details";
import { waitForZero } from "./functionalities/Movement_Of_Piece_Functionality";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHotel } from '@fortawesome/free-solid-svg-icons';
function App() {
  const {allPlayersData, setAllPlayersData , setWhosTurn, allGameItemsRefs, whosTurn, setWhetherUserHasPurchasedProperty, setIndexForChanceAndChest} = useContext(PlayersContext);
  const {setPlayerCount, setNumberOnDices, myPlayerNumber, setMyPlayerNumber, setRoom, setIsMyTurn, playerCount, setCurrentCity} = useContext(MyContext);

  const allPlayersDataRef = useRef(allPlayersData);
  const urlPraser = new URLSearchParams(window.location.search);
  const room = urlPraser.get('code');
  const username = urlPraser.get('username');
  
  useEffect(()=>{
    allPlayersDataRef.current = allPlayersData;
  },[allPlayersData]);
  useEffect (() => {
    if(myPlayerNumber) {
      setIsMyTurn(myPlayerNumber === whosTurn+1);
    }
  },[whosTurn, myPlayerNumber])
  useEffect(() => {
    console.log("real app");
    let mySocketId;
    const handleConnection = ({socketId}) => {
      console.log(socketId);
      mySocketId = socketId;
      setRoom(room);
      socket.emit("join", {room, username});
    }
    const handleNewUserJoined = ({allPlayersData}) => {
      console.log(allPlayersData);
      const myPlayerNumber = allPlayersData.filter(({socketId}) => mySocketId === socketId)[0].playerNumber;
      console.log(myPlayerNumber);
      setMyPlayerNumber(myPlayerNumber);
      setAllPlayersData(allPlayersData);
      setPlayerCount(allPlayersData.at(-1).playerNumber);
      setWhosTurn(0);
    }
    const handleMakeDiceMovemet = ({randomDice}) => {
      setNumberOnDices(randomDice);
    }
    const handleBuyOfProperty = ({currPlayerCurrentLocation, whosTurn, currentCity, changeColor}) => {
        // console.log("decision made ", whetherUserHasPurchasedProperty);
      setAllPlayersData(prev => {
        const newValues = prev.map((val, ind) => {
          if(ind === whosTurn) {
            allGameItemsRefs.current[currPlayerCurrentLocation].boughtBy = whosTurn;
            allGameItemsRefs.current[currPlayerCurrentLocation].levelOfConstruction = 0;
          
            const nowColor = allGameItemsRefs.current[currPlayerCurrentLocation].Card_Color;
            const sameColorCards = [1,2,3,0,-1,-2,-3].map(val => {
              let ind = currPlayerCurrentLocation+val; 
              if(ind <= 0 || ind>40 || nowColor === "#FFFFFF") return null;
              if(allGameItemsRefs.current[ind].Card_Color != nowColor) return null;
              return allGameItemsRefs.current[ind];
            }).filter(val => val!=null);
            console.log(sameColorCards);
            if(sameColorCards.every(({boughtBy}) => boughtBy === whosTurn)) {
              sameColorCards.map(val => val.tripleRent = true);
            }
          }
          console.log(currentCity);
          return ind === whosTurn ? { ...val, propertiesOwned: [...(val.propertiesOwned), currentCity], cashAvailable: Number(val.cashAvailable)-Number(card_details.cities[currentCity].Purchase_Price) } : val;
        });
        console.log(newValues, card_details.cities[currentCity].Purchase_Price);
        return newValues;
      });
      // console.log(allGameItemsRefs,allGameItemsRefs.current[currPlayerCurrentLocation].refToDiv.current);
      allGameItemsRefs.current[currPlayerCurrentLocation].refToDiv.current.style.color=`${changeColor}`;
      
      // setCurrentCity(allGameItemsRefs.current[currPlayerCurrentLocation]);
      // setWhosTurn(prev => (prev+1)%allPlayersData.length);
      // setWhosTurn(prev => (prev+1)%allPlayersData.length);
      // props.setBeat(prev => !prev);
    }
    const handleSwitchToNextPlayerTurn = async ({whosTurn, playerCount}) => {
      // console.log(allPlayersDataRef.current);
      console.log(new Date());
      await waitForZero();
      console.log(new Date());
      console.log("gg",whosTurn, playerCount);
      setWhetherUserHasPurchasedProperty(0);
      // console.log("aaya");
      setCurrentCity(null);
      // // const nowWhosTurn = whosTurn;
      const allPlayersData = allPlayersDataRef.current;
      console.log(allPlayersData);
      let withMoney = allPlayersData.filter(val => {console.log(val); return val.bankrupt==false;});
      if(withMoney.length === 1) {
        alert(`winner is ${withMoney[0].username}`);
      }
      let nextTurn = (whosTurn+1) % playerCount;
      while(allPlayersData[nextTurn].bankrupt===true) {
        nextTurn = (nextTurn + 1)%playerCount;
      }
      setWhosTurn(nextTurn);  //this takes time
      console.log("gg",whosTurn, nextTurn, playerCount);
    }
    const handlePayRent = ({whosTurn, boughtBy, priceToPay}) => {
      const val = allPlayersDataRef.current[whosTurn];
      const prevBankrupt = val.bankrupt;
      const bankrupt = (val.cashAvailable-priceToPay + val.extraMoney) < 0;
      let thisIsBankrupt = (prevBankrupt===false && bankrupt===true);
      setAllPlayersData(prev => {
        return prev.map((val, ind)=> {
          if(ind === whosTurn) {
            return {...val, cashAvailable: Number(val.cashAvailable)-Number(priceToPay), bankrupt:bankrupt}
          }
          if(ind == boughtBy) {
            return {...val, cashAvailable: Number(val.cashAvailable)+Number(priceToPay)}
          }
          return val;
        })
      });
      console.log(thisIsBankrupt,bankrupt,prevBankrupt);
      if(thisIsBankrupt) {
        for(let eleNo=1 ; eleNo<=40 ; eleNo++) {
          const {boughtBy} = allGameItemsRefs.current[eleNo];
          if(boughtBy==whosTurn) {
            allGameItemsRefs.current[eleNo] = {...allGameItemsRefs.current[eleNo], boughtBy:null, levelOfConstruction:-1,tripleRent:false};
            allGameItemsRefs.current[eleNo].refToDiv.current.style.color = 'black';
          }
        }
      }
    }
    const handleGiveSalary = ({whosTurn , money}) => {
      console.log("lode", money);
      setAllPlayersData(prev => prev.map((val,ind) => ind==whosTurn ? {...val,cashAvailable:val.cashAvailable+money} : val))
    }
    const handleBuildNewHouse = ({eleNo, whosTurn}) => {
      let currentCity = allGameItemsRefs.current[eleNo].City.replace(/\s+/g, '');

      allGameItemsRefs.current[eleNo].levelOfConstruction++;
      const levelOfConstruction = allGameItemsRefs.current[eleNo].levelOfConstruction;
      const container = allGameItemsRefs.current[eleNo].refToDiv.current.firstElementChild;
      container.replaceChildren();
      if(levelOfConstruction >= 5) {
        console.log("object");
        const root = createRoot(document.createElement('div'));
        root.render(<FontAwesomeIcon key={levelOfConstruction} icon={faHotel} />);
        container.replaceChildren(root._internalRoot.containerInfo);
      }
      else {
        for(let i=0 ; i<levelOfConstruction ; i++) {
          const root = createRoot(document.createElement('div'));
          root.render(<FontAwesomeIcon key={levelOfConstruction} icon={faHouse} />);
          container.appendChild(root._internalRoot.containerInfo);
        }
      }
      
      setAllPlayersData(prev => prev.map((val,ind) => ind==whosTurn ? {...val,cashAvailable:val.cashAvailable-Number(card_details.cities[currentCity]["House_Price"]), housesCount:val.housesCount+1, extraMoney: val.extraMoney + Math.floor(4*Number(card_details.cities[currentCity]["House_Price"])/5)} : val));
    }
    const handleSellOldHouse = ({eleNo, whosTurn}) => {
      let currentCity = allGameItemsRefs.current[eleNo].City.replace(/\s+/g, '');

      allGameItemsRefs.current[eleNo].levelOfConstruction--;
      const levelOfConstruction = allGameItemsRefs.current[eleNo].levelOfConstruction;
      const container = allGameItemsRefs.current[eleNo].refToDiv.current.firstElementChild;
      container.replaceChildren();
      if(levelOfConstruction >= 5) {
        console.log("object");
        const root = createRoot(document.createElement('div'));
        root.render(<FontAwesomeIcon key={levelOfConstruction} icon={faHotel} />);
        container.replaceChildren(root._internalRoot.containerInfo);
      }
      else {
        for(let i=0 ; i<levelOfConstruction ; i++) {
          const root = createRoot(document.createElement('div'));
          root.render(<FontAwesomeIcon key={levelOfConstruction} icon={faHouse} />);
          container.appendChild(root._internalRoot.containerInfo);
        }
      }
      setAllPlayersData(prev => prev.map((val,ind) => ind==whosTurn ? {...val,cashAvailable:val.cashAvailable+Math.floor(4*Number(card_details.cities[currentCity]["House_Price"])/5), housesCount:val.housesCount-1, extraMoney: val.extraMoney - Math.floor(4*Number(card_details.cities[currentCity]["House_Price"])/5)} : val)) 
    }
    const handleSendToJail = async ({whosTurn}) => {
      await waitForZero();
      setAllPlayersData(prev => prev.map((val,ind) => ind==whosTurn ? {...val,cashAvailable:val.cashAvailable-50, currentPosition:11} : val))
    }
    const handleChanceDikhado = async ({whosTurn, randomIndex, currPlayerCurrentLocation}) => {
      await waitForZero();
      let currentCity = allGameItemsRefs.current[currPlayerCurrentLocation].City.replace(/\s+/g, '');
      const cardsList = currentCity === "Chance" ? chances_cards : chest_cards;
      setIndexForChanceAndChest(currentCity === "Chance" ? [randomIndex, -1] : [-1,randomIndex]);
      
      if(randomIndex===7) {
        const multiplier = currentCity == "Chance" ? 50 : 70;
        const val = allPlayersDataRef.current[whosTurn];
        const prevBankrupt = val.bankrupt;
        const bankrupt = (val.cashAvailable-val.housesCount*multiplier + val.extraMoney) < 0;
        let thisIsBankrupt = (prevBankrupt===false && bankrupt===true);
      
        setAllPlayersData(prev => prev.map((val, ind)=> {
          return ind==whosTurn ? {...val, cashAvailable:val.cashAvailable-val.housesCount*multiplier, bankrupt:bankrupt} : val;
        }));
        if(thisIsBankrupt) {
          for(let eleNo=1 ; eleNo<=40 ; eleNo++) {
            const {boughtBy} = allGameItemsRefs.current[eleNo];
            if(boughtBy==whosTurn) {
              allGameItemsRefs.current[eleNo] = {...allGameItemsRefs.current[eleNo], boughtBy:null, levelOfConstruction:-1,tripleRent:false};
              allGameItemsRefs.current[eleNo].refToDiv.current.style.color = 'black';
            }
          }
        }
      }
      else {
        const {money, position} = cardsList[randomIndex].thisWillHappen({currPlayerCurrentLocation});
        console.log(position,money,currPlayerCurrentLocation);
        const val = allPlayersDataRef.current[whosTurn];
        const prevBankrupt = val.bankrupt;
        const bankrupt = (val.cashAvailable+money + val.extraMoney) < 0;
        let thisIsBankrupt = (prevBankrupt===false && bankrupt===true);
        
        setAllPlayersData(prev => prev.map((val,ind) => {
          return ind==whosTurn ? {...val,cashAvailable:val.cashAvailable+money, currentPosition:position, bankrupt:bankrupt} : val
        }))
        if(thisIsBankrupt) {
          for(let eleNo=1 ; eleNo<=40 ; eleNo++) {
            const {boughtBy} = allGameItemsRefs.current[eleNo];
            if(boughtBy==whosTurn) {
              allGameItemsRefs.current[eleNo] = {...allGameItemsRefs.current[eleNo], boughtBy:null, levelOfConstruction:-1,tripleRent:false};
              allGameItemsRefs.current[eleNo].refToDiv.current.style.color = 'black';
            }
          }
        }
      }
    }
    socket.on("makeDiceMovemet", handleMakeDiceMovemet, arguments);
    socket.on("newUserJoined", handleNewUserJoined, arguments);
    socket.on("connection", handleConnection, arguments); // Use "connect" event instead of "connection"
    socket.on("buyOfProperty", handleBuyOfProperty, arguments);
    socket.on("switchToNextPlayerTurn", handleSwitchToNextPlayerTurn, arguments);
    socket.on("payRent", handlePayRent, arguments);
    socket.on("giveSalary", handleGiveSalary, arguments);
    socket.on("buildNewHouse", handleBuildNewHouse, arguments);
    socket.on("sellOldHouse", handleSellOldHouse, arguments);
    socket.on("sendToJail", handleSendToJail, arguments);
    socket.on("chanceDikhado", handleChanceDikhado, arguments);
    // Cleanup function to remove the event listener
    return () => {
      socket.off("connection", handleConnection);
      socket.off("newUserJoined", handleNewUserJoined);
      socket.off("makeDiceMovemet", handleMakeDiceMovemet);
      socket.off("buyOfProperty", handleBuyOfProperty);
      socket.off("switchToNextPlayerTurn", handleSwitchToNextPlayerTurn);
      socket.off("payRent", handlePayRent);
      socket.off("giveSalary", handleGiveSalary);
      socket.off("buildNewHouse", handleBuildNewHouse);
      socket.off("sellOldHouse", handleSellOldHouse);
      socket.off("sendToJail", handleSendToJail);
      socket.off("chanceDikhado", handleChanceDikhado);
    };
  }, []);
  return (
  
    <FailedApp></FailedApp>
    
  )
}

export default App;
