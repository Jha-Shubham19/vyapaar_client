import React, { useContext } from 'react'
import { card_details, colors_of_properties } from '../data/cards_details';
import Gamecard_item from './Gamecard_item';
import Chance_n_Chest_Card from './Chance_n_Chest_Card';
import Gamecard_item_details from "./Gamecard_item_details"
import { MyContext } from '../context/MyContext';

function Gamecard({setters}) {


  const make_style_for_placement = (eleNo) => {
    let resulting_style = {};
    const border = '1px solid black';
    if(eleNo === 1) {
      resulting_style = { gridRow: `12 / span 2`, gridColumn: `12 / span 2`, borderLeft: border, }
    }
    else if (eleNo <= 10)
      resulting_style = {
        gridRow: `12 / span 2`, gridColumn: `${10 + 2 + 1 - eleNo} / span 1`, flexDirection: "column",
        borderLeft: border, borderTop: border,
      }
    else if(eleNo === 11) {
        resulting_style = { gridRow: `12 / span 2`, gridColumn: `1 / span 2`, borderTop: border, };
      }
    else if (eleNo <= 20)
      resulting_style = {
        gridRow: `${20 + 3 - eleNo} / span 1`, gridColumn: `1 / span 2`, flexDirection: "row-reverse",
        borderRight: border, borderTop: border,
      }
    else if(eleNo === 21) {
        resulting_style = { gridRow: `1 / span 2`, gridColumn: `1 / span 2`, borderRight: border, };
      }
    else if (eleNo <= 30)
      resulting_style = {
        gridRow: `1 / span 2`, gridColumn: `${3 - 22 + eleNo} / span 1`, flexDirection: "column",
        borderRight: border, borderBottom: border,
      }
    else if(eleNo === 31) {
        resulting_style = { gridRow: `1 / span 2`, gridColumn: `12 / span 2`, borderBottom: border, };
      }
    else if (eleNo <= 40) {
      resulting_style = {
        gridRow: `${3 - 32 + eleNo} / span 1`, gridColumn: `12 / span 2`, flexDirection: "row",
        borderLeft: border, borderBottom: border,
      }
    }

    return resulting_style;
  }
  const function_call = () => {
    return [...Object.entries(card_details["cities"]).map(([key, { City, Card_Color, Purchase_Price }], ind) => {
      const eleNo = ind+1;
      const style = make_style_for_placement(eleNo);

      return <Gamecard_item key={key} property_details={{ City, Card_Color, Purchase_Price, eleNo }} style_for_placement={style} setters={setters}/>;
    })];
  }
  return (
    <div className={`grid border border-black text-center w-auto text-[0.3rem] aspect-square lg:h-auto lg:w-min lg:text-[0.65rem] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-sm overflow-hidden`} style={{ gridTemplateColumns: "repeat(13, 1fr)", gridTemplateRows: "repeat(13, 1fr)", gridAutoRows: "calc(100%/13)", gridAutoColumns: "calc(100%/13)", }}
      >


      <Gamecard_item_details />
      {
        function_call()
      }
      {/* <Chance_n_Chest_Card /> */}

      {/* <p style = {{gridColumn: "1 / span 2", gridRow: "1 / span 1",flexDirection:"row-reverse" , fontSize:""}} ></p> */}
    </div>
  )
}
// const citiesList = [
//   "Rasayani", "Karjat","Turbhe", "Kopar Kairane", "Ghansoli", "Airoli", 
//   "Uran", "Ulwe", "Pushpak Nagar","Dronagiri", "Taloja", "Taloja-MIDC", "Kalamboli", 
//   "New Panvel", 
//   "Mansarovar","Juinagar", "Seawoods", "Sanpada", "CBD Belapur", "Nerul","Vashi","Kharghar"
// ];
export default Gamecard