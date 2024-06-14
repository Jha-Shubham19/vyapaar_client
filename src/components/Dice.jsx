import React, { useContext, useEffect, useState } from 'react'
import diceOne from '../media/dices/die-1.svg'
import diceTwo from '../media/dices/die-2.svg'
import diceThree from '../media/dices/die-3.svg'
import diceFour from '../media/dices/die-4.svg'
import diceFive from '../media/dices/die-5.svg'
import diceSix from '../media/dices/die-6.svg'
import { useMovementFunctionality } from '../functionalities/Movement_Of_Piece_Functionality';
import useTransaction from '../functionalities/Transaction'
import { MyContext } from '../context/MyContext'
import { SocketContext } from '../context/SocketContext'
import { PlayersContext } from '../context/PlayersContext'

function Dice() {
	const {numberOnDices, myPlayerNumber, isMyTurn, setIsMyTurn} =  useContext(MyContext);
	const {allPlayersData} = useContext(PlayersContext)
	const {catchRandomDice} = useContext(SocketContext);
	const [numberOnDiceForAnimation, setNumberOnDiceForAnimation] = useState([6, 6]);
	const [beat, setBeat] = useState(false);
	const [countOfConsecutive, setCountOfConsecutive] = useState(0);
	useMovementFunctionality({ setBeat, countOfConsecutive, setCountOfConsecutive });
	useTransaction({beat, setBeat});
	const diceIcons = [
		null, // for 1-based indexing
		diceOne,
		diceTwo,
		diceThree,
		diceFour,
		diceFive,
		diceSix
	];
	useEffect(() => {
		if(1 === myPlayerNumber) setBeat(true);
	}, [myPlayerNumber])
	useEffect(() => {
		if(isMyTurn===true) setBeat(true);
	}, [isMyTurn])
	useEffect(()=>{
		console.log(myPlayerNumber);
		if(numberOnDices[0]!=-1) setNumberOnDiceForAnimation(numberOnDices);
	},[numberOnDices]);

	const getRandomDiceNumber = () => Math.floor(Math.random() * 6) + 1;
	const handleClick = () => {
		setBeat(prev => false);
		const numbersOnDiceForAnimation = [[3,4],[4,3],[3,4],[1,2],[1,5],[2,4],[1,3],[6,4],[1,2],[1,5]];
		let index = 0;
		const interval = setInterval(() => {
      setNumberOnDiceForAnimation(numbersOnDiceForAnimation[index]);
			index++;
			if(index == 7) {
				clearInterval(interval);
				const randomDice = [getRandomDiceNumber(),getRandomDiceNumber()];
				setNumberOnDiceForAnimation(randomDice);
				console.log(index);
				
				// setNumberOnDices(randomDice);
				catchRandomDice(randomDice);
			}
    }, 60);

    // setTimeout(() => {
    //   clearInterval(interval);
		// 	const randomDice = [getRandomDiceNumber(),getRandomDiceNumber()];
		// 	setNumberOnDiceForAnimation(randomDice);
		// 	console.log(numberOnDiceForAnimation,randomDice);
		// 	// setNumberOnDices(numberOnDiceForAnimation);
    // }, 300);
		// moveTheCurrentPiece();
	}

	return (
		<div className="flex justify-center my-2 cursor-pointer">
			<div className='flex  gap-2' onClick={isMyTurn && beat &&  allPlayersData[myPlayerNumber-1].cashAvailable >= 0 ? handleClick : () => { }}>
				<div key={0}><img src={diceIcons[numberOnDiceForAnimation[0]]} alt="" /></div>
				<div key={1}><img src={diceIcons[numberOnDiceForAnimation[1]]} alt="" /></div>
			</div>
		</div>
	)
}
// https://dcode.domenade.com/tutorials/how-to-create-a-dice-roll-game-with-html-css-and-javascript
export default Dice;