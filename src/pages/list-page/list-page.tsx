import { SyntheticEvent, useState, FC, useEffect } from 'react';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import styles from './list-page.module.css';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { InputContainer } from '../../components/ui/input-container/input-container';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { LinkedList } from '../../utils/list';
import { ElementStates } from '../../types/element-states';
import { ArrowIcon } from '../../components/ui/icons/arrow-icon';

interface IListItem {
  name: string;
  state: ElementStates;
  smallCircle: ISmallCircle | null;
}
interface ISmallCircle {
  name: string;
  state: ElementStates;
  positioning: 'topCircle' | 'bottomCircle';
}

export const ListPage: FC = () => {
  const initialList = ['0', '34', '8', '1']
  const defaultListArr: IListItem[] = initialList.map(item => ({
    name: item,
    state: ElementStates.Default,
    smallCircle: null,
  }))

  const [value, setValue] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [listArr, setListArr] = useState<IListItem[]>(defaultListArr)
  const list = new LinkedList<string>(initialList)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()

  const changeValue = (e: SyntheticEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const changeIndex = (e: SyntheticEvent<HTMLInputElement>) => {
    setIndex(+e.currentTarget.value)
  }

  const addToHead = async () => {
    setInProgress(true)

    list.insertAt(value, 0)
    if (listArr.length > 0) listArr[0].smallCircle = {
        name: value,
        state: ElementStates.Changing,
        positioning: 'topCircle',
    }
    
    setListArr([...listArr])
    await delay(SHORT_DELAY_IN_MS)

    listArr[0].smallCircle = null

    listArr.unshift({
      ...listArr[0],
      name: value,
      state: ElementStates.Modified,
    });

    setListArr([...listArr])

    await delay(SHORT_DELAY_IN_MS)
    listArr[0].state = ElementStates.Default
    
    setListArr([...listArr])

    setValue('')
    setInProgress(false)
  }

  const addToTail = async () => {
    setInProgress(true)
    list.append(value)
    const savedLen = listArr.length

    listArr[savedLen - 1] = {
      ...listArr[savedLen - 1],
      smallCircle: {
        name: value,
        state: ElementStates.Changing,
        positioning: 'bottomCircle',
      },
    }

    setListArr([...listArr])
    await delay(SHORT_DELAY_IN_MS)

    listArr[savedLen - 1] = {
      ...listArr[savedLen - 1],
      smallCircle: null,
    }

    listArr.push({
      name: value,
      state: ElementStates.Modified,
      smallCircle: null,
    })

    setListArr([...listArr])
    await delay(SHORT_DELAY_IN_MS)

    listArr[savedLen].state = ElementStates.Default
    setListArr([...listArr])

    setValue('')
    setInProgress(false)
  }

  const removeFromHead = async () => {
    setInProgress(true)
    
    const currValue = listArr[0].name
    listArr[0] = {
      ...listArr[0],
      name: '',
      smallCircle: {
        name: currValue,
        state: ElementStates.Changing,
        positioning: 'topCircle',
      },
    }

    list.removeAt(0)
    setListArr([...listArr])

    await delay(SHORT_DELAY_IN_MS)

    listArr.shift()
    setListArr([...listArr])

    setInProgress(false)
  }

  const removeFromTail = async () => {
    setInProgress(true)
    const length = listArr.length
    const lastValue = listArr[length - 1].name

    listArr[length - 1] = {
      ...listArr[length - 1],
      name: '',
      smallCircle: {
        name: lastValue,
        state: ElementStates.Changing,
        positioning: 'bottomCircle',
      },
    }

    list.removeAt(list.getSize())
    setListArr([...listArr])

    await delay(SHORT_DELAY_IN_MS)

    listArr.pop()
    setListArr([...listArr]) 

    setInProgress(false)
  }

  const addWithIndex = async () => {
    setInProgress(true)
    list.insertAt(value, index)

    for (let i = 0; i <= index; i++) {
      listArr[i] = {
        ...listArr[i],
        state: ElementStates.Changing,
        smallCircle: {
          name: value,
          state: ElementStates.Changing,
          positioning: 'topCircle',
        },
      }

      await delay(SHORT_DELAY_IN_MS)

      setListArr([...listArr])
      if (i > 0) listArr[i - 1] = { ...listArr[i - 1], smallCircle: null }
      setListArr([...listArr]);
    }
    await delay(SHORT_DELAY_IN_MS);

    listArr[index] = {
      ...listArr[index],
      state: ElementStates.Default,
      smallCircle: null,
    }

    listArr.splice(index, 0, {
      name: value,
      state: ElementStates.Modified,
      smallCircle: null,
    })

    setListArr([...listArr])

    listArr[index].state = ElementStates.Default;
    listArr.forEach((item: IListItem) => {
      item.state = ElementStates.Default
    })

    await delay(SHORT_DELAY_IN_MS)

    setListArr([...listArr])
    setValue('')
    setIndex(0)
    setInProgress(false)
  }

  const removeWithIndex = async () => {
    setInProgress(true)
    list.removeAt(index)

    for (let i = 0; i <= index; i++) {
      listArr[i] = {
        ...listArr[i],
        state: ElementStates.Changing,
      }

      await delay(SHORT_DELAY_IN_MS)
      setListArr([...listArr])
    }

    listArr[index] = {
      ...listArr[index],
      name: '',
      smallCircle: {
        name: listArr[index].name,
        state: ElementStates.Changing,
        positioning: 'bottomCircle',
      },
    }

    await delay(SHORT_DELAY_IN_MS)
    setListArr([...listArr])

    listArr.splice(index, 1)
    listArr[index - 1] = {
      ...listArr[index - 1],
      name: listArr[index - 1].name,
      state: ElementStates.Modified,
      smallCircle: null,
    }

    await delay(SHORT_DELAY_IN_MS)

    setListArr([...listArr])
    listArr.forEach(item => item.state = ElementStates.Default)

    await delay(SHORT_DELAY_IN_MS)
    setListArr([...listArr])
    setIndex(0)
    setInProgress(false)
  }

  return (
    <SolutionLayout title='Связный список'>

      <InputContainer extraClass={styles.inputContainer}>
        <form className={styles.controlsContainer} onSubmit={handleFormSubmit}>
          <Input
            placeholder="Введите значение"
            extraClass={styles.input}
            onChange={changeValue}
            value={value}
            disabled={inProgress}
            isLimitText={true}
            maxLength={4}/>
          <Button
            text="Добавить в head"
            type="button"
            extraClass={styles.buttonSmall}
            isLoader={inProgress}
            disabled={value === '' || listArr.length >= 8}
            onClick={addToHead}
          />
          <Button
            text="Добавить в tail"
            type="button"
            extraClass={styles.buttonSmall}
            isLoader={inProgress}
            disabled={value === '' || listArr.length >= 8}
            onClick={addToTail}
          />
          <Button
            text="Удалить из head"
            type="button"
            extraClass={styles.buttonSmall}
            isLoader={inProgress}
            disabled={listArr.length <= 1}
            onClick={removeFromHead}
            />
          <Button
            text="Удалить из tail"
            type="button"
            extraClass={styles.buttonSmall}
            isLoader={inProgress}
            disabled={listArr.length <= 1}
            onClick={removeFromTail}
          />
        </form>
        <form className={styles.controlsContainer} onSubmit={handleFormSubmit}>
          <Input
            placeholder="Введите индекс"
            extraClass={styles.input}
            maxLength={1}
            onChange={changeIndex}
            disabled={inProgress}
            value={index || ''}
          />
          <Button
            text="Добавить по индексу"
            type="button"
            extraClass={styles.buttonLarge}
            isLoader={inProgress}
            onClick={addWithIndex}
            disabled={value === '' || !index || listArr.length >= 8 || index > listArr.length-1}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            extraClass={styles.buttonLarge}
            isLoader={inProgress}
            onClick={removeWithIndex}
            disabled={listArr.length <= 1 || !index || index > listArr.length-1}
          />
        </form>
      </InputContainer>

      <ul className={styles.circleContainer}>
          {listArr.map((item, index) => (
            <li className={styles.circle} key={index}>
              {item.smallCircle && (
                <Circle
                  extraClass={`${styles.smallCircle} ${styles[`${item.smallCircle.positioning}`]}`}
                  letter={item.smallCircle.name}
                  isSmall
                  state={item.smallCircle.state}/>
              )}

              {index !== 0 &&
                <ArrowIcon fill={item.state === ElementStates.Changing ? "#d252e1" : "#0032FF"}/>}

              <Circle
                tail={(!item.smallCircle && index === listArr.length - 1) ? 'tail' : ''}
                letter={item.name}
                index={index}
                head={!item.smallCircle && index === 0 ? 'head' : ''}
                state={item.state}/>
            </li>
          ))}
        </ul>

    </SolutionLayout>
  );
};
