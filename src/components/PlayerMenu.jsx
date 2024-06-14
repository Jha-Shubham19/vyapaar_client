import React, { useContext, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { useState } from "react";

const PlayerMenu = (props) => {

  const {setPlayerCount} = useContext(MyContext);
  let setPlayerSelected = props.setPlayerSelected;
  let playerSelected = props.playerSelected;

  const [buttonClicked, setButtonClicked] = useState(2);


  function changeHandler(event) {
    const totalPlayerSelected = event.target.value;
    setPlayerCount(totalPlayerSelected);
    setButtonClicked(totalPlayerSelected);
  }

  // const [LabelSelected, setLabelSelected] = useState(2);
  // function labelClickHandler(event) {
  //   setLabelSelected(event.target.htmlFor);
  //   console.log("label " + LabelSelected);
  // }

  function clickHandler() {

    setPlayerSelected(true);


  }
  return (
    <div className="bg-[#1f416b]  text-center text- rounded-xl drop-shadow-lg fontkeliye ">
      <div className="mt-2 text-white    text-2xl p-2 font-medium  bg-[#22223b]">Select Number of Players</div>
      <div className="flex flex-row justify-evenly  -translate-x-5 text-white font-semibold">
        <input
          onClick={changeHandler}
          className="hidden"
          type="radio"
          id="2"
          value={2}
          name="playerCount" />

        <label htmlFor={2}
          className={`cursor-pointer  rounded-md  mt-6 w-1/5 aspect-square p-4 text-4xl  ${
            buttonClicked == '2'
              ? "bg-green-500 text-white border-b-4 border-green-700"
              : "bg-white bg-opacity-5"
          }`}>2</label>
        <input
          onClick={changeHandler}
          className="hidden"
          type="radio"
          id="3"
          value={3}
          name="playerCount" />
        <label htmlFor={3}
          className={`cursor-pointer  rounded-md  mt-6 w-1/5 aspect-square p-4 text-4xl  ${
            buttonClicked == '3'
              ? "bg-green-500 text-white border-b-4 border-green-700"
              : "bg-white bg-opacity-5"
          }`}>3</label>
        <input
          onClick={changeHandler}
          className="hidden"
          type="radio"
          id="4"
          value={4}
          name="playerCount" />
        <label htmlFor="4"
          className={`cursor-pointer  rounded-md  mt-6 w-1/5 aspect-square p-4 text-4xl  ${
            buttonClicked == '4'
              ? "bg-green-500 text-white border-b-4 border-green-700"
              : "bg-white bg-opacity-5"
          }`}>4</label>
      </div>
      <div className="flex justify-center items-center border-white mt-4">
        <button className="cursor-pointer m-4 px-5 text-3xl active:border-2 active:border-white   text-black bg-green-300 p-2 rounded-xl " onClick={clickHandler}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default PlayerMenu;
