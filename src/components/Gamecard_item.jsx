import React, { useContext,useEffect,useImperativeHandle, useRef } from 'react'
import { MyContext } from '../context/MyContext';
import { colors_of_properties } from '../data/cards_details';
import { PlayersContext } from '../context/PlayersContext';
import { PackMan } from "../components/PackMan"
import { SocketContext } from '../context/SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHotel } from '@fortawesome/free-solid-svg-icons';
function Gamecard_item(props) {

  const refToDiv = useRef();
  const { currentCity, setCurrentCity, playerCount, myPlayerNumber, setShowCardDetails } = useContext(MyContext);
  const { allPlayersData, hisTurnJustEnded,allGameItemsRefs } = useContext(PlayersContext);
  const {buildNewHouse, sellOldHouse} = useContext(SocketContext);
  const colors_of_properties_array = Object.values(colors_of_properties);

  useEffect(() => {
    hisTurnJustEnded!==null && allPlayersData[hisTurnJustEnded].currentPosition == props.property_details.eleNo && handleMouseOver();
  }, [hisTurnJustEnded])
  
  useEffect(() => {
    allGameItemsRefs.current[props.property_details.eleNo]={
      City: props.property_details.City.replace(/\s+/g, ''),
      boughtBy: null,
      levelOfConstruction:-1,
      tripleRent: false,
      Card_Color: props.property_details.Card_Color,
      refToDiv: refToDiv,
    }
  }, [])
  
  const handleMouseOver = () => {
    // const cityName = props.property_details["City"].replace(/\s+/g, '')
    // setCurrentCity(cityName)
  };

  const handleMouseOut = () => {
    // setCurrentCity(null)
  };
  const handleClick = () => {
    console.log(typeof refToDiv.current.dataset.buildingHouse);
    if(refToDiv.current.dataset.buildingHouse === "true") {
      // const prevValue = allGameItemsRefs.current[props.property_details.eleNo];
      // console.log(prevValue);
      // allGameItemsRefs.current[props.property_details.eleNo].levelOfConstruction++;
      console.log({eleNo:props.property_details.eleNo, whosTurn:myPlayerNumber-1});
      buildNewHouse({eleNo:props.property_details.eleNo, whosTurn:myPlayerNumber-1});
      props.setters.setToBuildActivate(false);
    }
    else if(refToDiv.current.dataset.sellingHouse === "true") {
      sellOldHouse({eleNo:props.property_details.eleNo, whosTurn:myPlayerNumber-1})
      props.setters.setToSellActivate(false);
    }
    else {
      setShowCardDetails(allGameItemsRefs.current[props.property_details.eleNo].City);
    }
  }

  const elementNo = props.property_details.eleNo;
  const cardBgColor = props.property_details.Card_Color;


  const { ...style_for_placement } = props.style_for_placement;

  return (
    <div className=" z-50 blur-none lg:text-xsm flex w-full h-full rounded-sm font-mono" style={style_for_placement} //text-sm to text-xsm
      onMouseOver={() => handleMouseOver()} onMouseOut={() => handleMouseOut()} ref={refToDiv} onClick={()=>handleClick()}>
      {
        props.property_details.eleNo % 10 !== 1 &&
        <div className={`flex justify-center items-center flex-wrap text-black ${(Math.floor((props.property_details.eleNo - 1) / 10) & 1 || props.property_details.eleNo % 10 === 1) ? 'flex-col' : 'flex-row'}`} style={{ backgroundColor: cardBgColor, flex: 1 }}>
          
        </div>
      }
      <div className="flex relative bg-[#FFFFFF] flex-col justify-evenly" style={{ flex: 2 }}>
        <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center flex-wrap ${(Math.floor((props.property_details.eleNo - 1) / 10) & 1 || props.property_details.eleNo % 10 === 1) ? 'flex-row' : 'flex-col'}`} >
          {
            allPlayersData.filter(val =>props.property_details.eleNo === val.currentPosition).map((val, index) => {
              return <PackMan key={`player-${val.playerNumber}`} index={index} playerNumber={val.playerNumber} currentPosition={props.property_details.eleNo}/>
            })
          }
        </div>
        <div className='font-bold'>{props.property_details["City"]}</div>
        {
          props.property_details["Purchase_Price"] &&
          <div className='font-bold'>{props.property_details["Purchase_Price"]}</div>
        }
      </div>
    </div>
  )
}
export default Gamecard_item