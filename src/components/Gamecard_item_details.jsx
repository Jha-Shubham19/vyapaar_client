import React, { useEffect } from 'react'
import Card from "./Card"
import { card_details } from "../data/cards_details"
import { MyContext } from '../context/MyContext'
import { useContext } from 'react'
import { PlayersContext } from '../context/PlayersContext'
import Chance_n_Chest_Card from './Chance_n_Chest_Card'
const Gamecard_item_details = () => {

	const allDataArray = Object.values(card_details.cities);
	const { currentCity , showCardDetails} = useContext(MyContext);
	const {indexForChanceAndChest} = useContext(PlayersContext);
	const condtionForShowDetail = showCardDetails && !(showCardDetails === "Go" || showCardDetails === "Jail" || showCardDetails === "FreeParking" || showCardDetails === "GoToJail" || showCardDetails === "IncomeTax" || showCardDetails === "LuxaryTax" || showCardDetails === "Chance" || showCardDetails==="CommunityChest")
	return (
		<>
			{
				currentCity && <Card cardData={card_details.cities[currentCity]} currentCity={currentCity} aboutToBePurchased={true}></Card>
			}
			{
				condtionForShowDetail && <Card cardData={card_details.cities[showCardDetails]} currentCity={showCardDetails} aboutToBePurchased={false}></Card>
			}
			{
				indexForChanceAndChest[0]!=indexForChanceAndChest[1] && <Chance_n_Chest_Card/> 
			}
		</>
	)
}

export default Gamecard_item_details