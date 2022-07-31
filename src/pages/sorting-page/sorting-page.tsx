import { useState, FC, useEffect } from 'react';
import styles from './sorting-page.module.css'
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { Button } from '../../components/ui/button/button';
import { Column } from '../../components/ui/column/column';
import { InputContainer } from '../../components/ui/input-container/input-container'
import { RadioInput } from '../../components/ui/radio-input/radio-input'
import { randomNum } from '../../utils/utils';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { IArrObject } from '../../types/types';
import { bubbleSort, selectionSort } from '../../utils/sort';

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
            method === 'bubble' ? bubbleSort(randomArr, 'asc', setArr, setInProgress) 
            : selectionSort(randomArr, 'asc', setArr, setInProgress) }/>
          <Button
            text='По убыванию'
            type='button'
            sorting={Direction.Descending}
            isLoader={inProgress}
            disabled={inProgress}
            extraClass={`mr-40 ${styles.button}`}
            onClick={() =>
            method === 'bubble' ? bubbleSort(randomArr, 'desc', setArr, setInProgress) 
            : selectionSort(randomArr, 'desc', setArr, setInProgress) }/>
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
