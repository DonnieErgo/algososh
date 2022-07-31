import { Dispatch, SetStateAction } from 'react';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { ElementStates } from '../types/element-states';
import { IArrObject } from '../types/types';
import { delay } from '../utils/utils';

export const bubbleSort = async (
  array: IArrObject[], arrangement: string,
  setArr: Dispatch<SetStateAction<IArrObject[]>>,
  setInProgress: Dispatch<SetStateAction<boolean>>,
  ) => {
    // modified utilite algorithm to work both with a simple num array and an object array
    let modifiedObjectArray = false
    if (array.length !== 0 && array[0].hasOwnProperty('state')) modifiedObjectArray = true
    if (modifiedObjectArray) setInProgress(true)

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {

        if (modifiedObjectArray) {
          array[j].state = ElementStates.Changing
          if (array[j + 1]) array[j + 1].state = ElementStates.Changing
          setArr([...array])
        
          await delay(SHORT_DELAY_IN_MS)

          if ((arrangement === 'asc' ? array[j].num : array[j + 1].num) > (arrangement === 'asc' ? array[j + 1].num : array[j].num)) {
            const t = array[j]
            array[j] = array[j + 1]
            array[j + 1] = t
          }

          array[j].state = ElementStates.Default
          if (array[j + 1]) array[j + 1].state = ElementStates.Default
          setArr([...array])
        }

        if ((arrangement === 'asc' ? array[j] : array[j + 1]) > (arrangement === 'asc' ? array[j + 1] : array[j])) {
          const t = array[j]
          array[j] = array[j + 1]
          array[j + 1] = t
        }
      }

      if (modifiedObjectArray) {
        array[array.length - i - 1].state = ElementStates.Modified
        setArr([...array])
      }
    }

    if (modifiedObjectArray) setInProgress(false)
    return array
}

export const selectionSort = async (
  array: IArrObject[], arrangement: string,
  setArr: Dispatch<SetStateAction<IArrObject[]>>,
  setInProgress: Dispatch<SetStateAction<boolean>>,
  ) => {
    // modified utilite algorithm to work both with a simple num array and an object array
    let modifiedObjectArray = false
    if (array.length !== 0 && array[0].hasOwnProperty('state')) modifiedObjectArray = true
    if (modifiedObjectArray) setInProgress(true)

    for (let i = 0; i < array.length; i += 1) {

      let ind = i
      if (modifiedObjectArray) array[ind].state = ElementStates.Changing

      for (let j = i + 1; j < array.length; j += 1) {

        if (modifiedObjectArray) {
          array[j].state = ElementStates.Changing
          setArr([...array])
          await delay(SHORT_DELAY_IN_MS)

          if ((arrangement === 'asc' ? array[ind].num : array[j].num) > (arrangement === 'asc' ? array[j].num : array[ind].num)) {
            ind = j

            array[j].state = ElementStates.Changing
            array[ind].state = i === ind ? ElementStates.Changing : ElementStates.Default
          }
        
          if (j !== ind) array[j].state = ElementStates.Default

          setArr([...array])
        }

        if ((arrangement === 'asc' ? array[ind]: array[j]) > (arrangement === 'asc' ? array[j] : array[ind])) ind = j
      }

      const t = array[i]
      array[i] = array[ind]
      array[ind] = t

      if (modifiedObjectArray) {
        array[ind].state = ElementStates.Default
        array[i].state = ElementStates.Modified
      
        setArr([...array])
      }
    }

    if (modifiedObjectArray) setInProgress(false)

    return array
}