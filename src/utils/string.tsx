import { Dispatch, SetStateAction } from 'react';
import { DELAY_IN_MS } from '../constants/delays';
import { ElementStates } from '../types/element-states';
import { ICharacter } from '../types/types';
import { delay } from '../utils/utils';

export const reverseString = async (arr: ICharacter[], setStringArr: Dispatch<SetStateAction<ICharacter[]>>) => {
  const midPoint = arr.length / 2
  let counter = 0

  while (counter < midPoint) {
    if (arr[counter].hasOwnProperty('state')) {
      arr[counter].state = ElementStates.Changing
      arr[arr.length - counter - 1].state = ElementStates.Changing

      setStringArr([...arr])
      await delay(DELAY_IN_MS)

      arr[counter].state = ElementStates.Modified
      arr[arr.length - counter - 1].state = ElementStates.Modified
    }

    [arr[counter], arr[arr.length - counter - 1]] = [arr[arr.length - counter - 1], arr[counter]]

    if (arr[counter].hasOwnProperty('state')) {
      setStringArr([...arr])
      await delay(DELAY_IN_MS)
    }
    
    counter += 1
  }

  return arr
}