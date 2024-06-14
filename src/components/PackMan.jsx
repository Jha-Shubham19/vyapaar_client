import React, { useContext } from 'react'
import { PlayersContext } from '../context/PlayersContext';

export const PackMan = ({ currentPosition, playerNumber, index }) => {

  const { allPlayersData } = useContext(PlayersContext);
  const UserPieceIcon = `/images/body${playerNumber}.svg`;

  

  const userEyesPosition =
    Number(currentPosition) < 11
      ? "/images/eyesLeft.svg"
      : currentPosition < 21
        ? "/images/eyesUp.svg"
        : currentPosition < 31
          ? "/images/eyesRight.svg"
          : "/images/eyesDown.svg";

  const overlappingTranslations = ['translateX(0)', 'translateX(-50%)', 'translateX(-100%)', 'translateX(-150%)'];
  const overlappingTranslationsY = ['translateY(0)', 'translateY(-50%)', 'translateY(-100%)', 'translateY(-150%)'];
  
  const translationStyle = {
    transform: playerNumber === 1 ? 'none' : Math.floor((currentPosition - 1) / 10) & 1|| currentPosition%10===1 ? overlappingTranslations[[index]] : overlappingTranslationsY[[index]],
  };

  return (
    // className={`${playerNumber == 1 ? "":`-translate-x-${overlappingTranslations[index]}`} `}
    <div className={`relative w-fit h-fit`} style={translationStyle}>
      <img src={UserPieceIcon} alt="" className='relative h-2 lg:h-4' />
      <div className='absolute left-0 right-0 bottom-0 top-0 mx-auto my-auto'>
        <img src={userEyesPosition} alt="" className='h-2 lg:h-4' />
      </div>
    </div>
  )
}
