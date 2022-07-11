import { useState, FC, useEffect } from 'react';
import styles from './sorting-page.module.css'
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { Button } from '../../components/ui/button/button';
import { Column } from '../../components/ui/column/column';
import { InputContainer } from '../../components/ui/input-container/input-container'
import { RadioInput } from '../../components/ui/radio-input/radio-input'
import { delay, randomNum } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states'

interface IArrObject {
  num: number
  state: ElementStates
}

export const SortingPage: FC = () => {
  const [method, setMethod] = useState<string>('selection')
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [randomArr, setArr] = useState<IArrObject[]>([])

  const minArrayLen = 3
  const maxArrayLen = 17

  useEffect(() => { createRandomArr() }, [])

  const createRandomArr = () => {
    const randomLen = Math.random() * (maxArrayLen - minArrayLen) + minArrayLen

    const randomizedObjectArr: IArrObject[] = Array.from({ length: randomLen }, () => ({
      num: randomNum(),
      state: ElementStates.Default,
    }))

    setArr(randomizedObjectArr)
  }

  const bubbleSort = async (arrangement: string, array: IArrObject[]) => {
    setInProgress(true)

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {

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

      array[array.length - i - 1].state = ElementStates.Modified
      setArr([...array])
    }

    setInProgress(false)
  }

  const selectionSort = async (arrangement: string, array: IArrObject[]) => {
    setInProgress(true)

    for (let i = 0; i < array.length; i += 1) {

      let ind = i
      array[ind].state = ElementStates.Changing

      for (let j = i + 1; j < array.length; j += 1) {

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

      const t = array[i]
      array[i] = array[ind]
      array[ind] = t

      array[ind].state = ElementStates.Default
      array[i].state = ElementStates.Modified

      setArr([...array])
    }

    setInProgress(false)
  }

  return (
    <SolutionLayout title='Сортировка массива'>

      <form>
        <InputContainer extraClass={styles.inputContainer}>
          <RadioInput
            onChange={() => setMethod('selection')}
            checked={method === 'selection'}
            name='sortMethod'
            label='Выбор'
            disabled={inProgress}
            extraClass={'mr-12'}
          />
          <RadioInput
            onChange={() => setMethod('bubble')}
            checked={method === 'bubble'}
            name='sortMethod'
            label='Пузырёк'
            disabled={inProgress}
            extraClass={styles.radioMargin}
          />
          <Button
            text='По возрастанию'
            type='button'
            sorting={Direction.Ascending}
            isLoader={inProgress}
            disabled={inProgress}
            onClick={() =>
            method === 'bubble' ? bubbleSort('asc', randomArr) : selectionSort('asc', randomArr) }/>
          <Button
            text='По убыванию'
            type='button'
            sorting={Direction.Descending}
            isLoader={inProgress}
            disabled={inProgress}
            extraClass={`mr-40 ${styles.button}`}
            onClick={() =>
            method === 'bubble' ? bubbleSort('desc', randomArr) : selectionSort('desc', randomArr) }/>
          <Button
            text='Новый массив'
            type='button'
            isLoader={inProgress}
            disabled={inProgress}
            extraClass={styles.button}
            onClick={createRandomArr}/>
        </InputContainer>
      </form>

        <ul className={styles.columnContainer}>
            {randomArr && randomArr.map((item, index) => 
              <li key={index}>
                <Column index={item.num} state={item.state}/>
              </li>
            )}
        </ul>

    </SolutionLayout>
  );
};
