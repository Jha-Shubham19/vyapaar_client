import {useEffect,useContext,React} from 'react'
import { PlayersContext } from '../context/PlayersContext';
import { MyContext } from '../context/MyContext';
import {colors_of_players , card_details} from '../data/cards_details';
import { SocketContext } from '../context/SocketContext';

function useTransaction(props) {
  const { allPlayersData, setAllPlayersData, whosTurn, setWhosTurn, allGameItemsRefs, whetherUserHasPurchasedProperty, setWhetherUserHasPurchasedProperty } = useContext(PlayersContext);
  const { currentCity, setCurrentCity,myPlayerNumber, playerCount, isMyTurn } = useContext(MyContext);
  const {buyOfProperty, switchToNextPlayerTurn} = useContext(SocketContext);

  useEffect(() => {
    const currPlayerCurrentLocation = allPlayersData[whosTurn]?.currentPosition;
    console.log("bot");

    if (whetherUserHasPurchasedProperty !== 0 && whetherUserHasPurchasedProperty!==null) {
      if (whetherUserHasPurchasedProperty === 1) {
        buyOfProperty({currPlayerCurrentLocation, whosTurn, currentCity, changeColor:colors_of_players[whosTurn]});
      }
      else if (whetherUserHasPurchasedProperty === -1) {
        console.log("decision made ", whetherUserHasPurchasedProperty);
      }
      switchToNextPlayerTurn({whosTurn, playerCount});
      // const nextTurn = (whosTurn+1) % allPlayersData.length;
      // setWhosTurn(nextTurn);  //this takes time
      // setCurrentCity(null);
      // setWhetherUserHasPurchasedProperty(0);
      // console.log("gg",whosTurn);
      // if(nextTurn+1 === myPlayerNumber) props.setBeat(true);
      // else props.setBeat(false);
    }
    else if (currentCity !== null) {
    //   switchToNextPlayerTurn({whosTurn, playerCount});
    //   // setWhetherUserHasPurchasedProperty(0);
    //   // console.log("aaya");
    //   // setCurrentCity(null);
    //   // const nextTurn = (whosTurn+1) % allPlayersData.length;
    //   // setWhosTurn(nextTurn);  //this takes time
    //   // console.log("gg",whosTurn);
    //   // if(nextTurn+1 === myPlayerNumber) props.setBeat(true);
    //   // else props.setBeat(false);
    }
  }, [whetherUserHasPurchasedProperty]);

  
  function handleBuyPassOfProperties(currPlayerCurrentLocation, whosTurn) {
    console.log("decision made ", whetherUserHasPurchasedProperty);
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
        return ind === whosTurn ? { ...val, propertiesOwned: [...(val.propertiesOwned), currentCity], cashAvailable: Number(val.cashAvailable)-Number(card_details.cities[currentCity].Purchase_Price) } : val;
      });
      console.log(newValues, card_details.cities[currentCity].Purchase_Price);
      return newValues;
    });
    console.log(allGameItemsRefs,allGameItemsRefs.current[currPlayerCurrentLocation].refToDiv.current);
    allGameItemsRefs.current[currPlayerCurrentLocation].refToDiv.current.style.color=`${colors_of_players[whosTurn]}`;
    
    // setCurrentCity(allGameItemsRefs.current[currPlayerCurrentLocation]);
    // setWhosTurn(prev => (prev+1)%allPlayersData.length);
    // setWhosTurn(prev => (prev+1)%allPlayersData.length);
    // props.setBeat(prev => !prev);
  }
}

export default useTransaction;