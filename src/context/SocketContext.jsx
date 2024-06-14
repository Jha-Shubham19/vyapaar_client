import React, { createContext, useContext, useState } from 'react'
import {socket} from '../socket';
import { MyContext } from './MyContext';
import { PlayersContext } from './PlayersContext';

export const SocketContext = createContext();

export default function ContextProvider({ children }) {
  const {room} = useContext(MyContext);
  const catchRandomDice = (randomDice) => {
    console.log(room,randomDice);
    socket.emit("randomDiceIs", {room, randomDice});
  }
  const buyOfProperty = (args) => {
    console.log(args);
    socket.emit("buyOfProperty", args);
  }
  const switchToNextPlayerTurn = (args) => {
    socket.emit("switchToNextPlayerTurn", args)
  }
  const payRent = ({whosTurn, boughtBy, priceToPay}) => {
    socket.emit("payRent", {whosTurn, boughtBy, priceToPay});
  }
  const giveSalary = ({whosTurn, money}) => {
    socket.emit("giveSalary", {whosTurn, money});
  }
  const buildNewHouse = ({eleNo, whosTurn}) => {
    socket.emit("buildNewHouse", {eleNo, whosTurn});
  }
  const sellOldHouse = ({eleNo, whosTurn}) => {
    socket.emit("sellOldHouse", {eleNo, whosTurn});
  }
  const sendToJail = ({whosTurn}) => {
    socket.emit("sendToJail", {whosTurn});
  }
  const chanceDikhado = ({whosTurn, randomIndex, currPlayerCurrentLocation}) => {
    socket.emit("chanceDikhado", {whosTurn, randomIndex, currPlayerCurrentLocation});
  }
  const value = {
      catchRandomDice,
      buyOfProperty,
      switchToNextPlayerTurn,
      payRent,
      giveSalary,
      buildNewHouse,
      sellOldHouse,
      sendToJail,
      chanceDikhado,
  }

  return (<SocketContext.Provider value={value}>
      {children}
  </SocketContext.Provider>)
}