import { SyntheticEvent, useState, FC } from 'react';
import styles from './stack-page.module.css';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { InputContainer } from '../../components/ui/input-container/input-container';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Stack } from '../../utils/stack';
import { ElementStates } from '../../types/element-states';
import { strictEqual } from 'assert';

interface IStackItem {
  text: string | null,
  state: ElementStates;
}

const stack = new Stack<string>()

export const StackPage: FC = () => {
  const [input, setInput] = useState<string>('')
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [stackArr, setStackArr] = useState<IStackItem[]>([])

  const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const addStackItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInProgress(true)

    stack.push(input)
    stackArr.push({
      text: stack.peak(),
      state: ElementStates.Changing,
    });
    setInput('')
    setStackArr([...stackArr])

    await delay(SHORT_DELAY_IN_MS)

    stackArr[stackArr.length - 1].state = ElementStates.Default
    setStackArr([...stackArr])
    setInProgress(false)
  }

  const deleteStackItem = async () => {
    setInProgress(true)

    stackArr[stackArr.length - 1].state = ElementStates.Changing
    setStackArr([...stackArr])

    await delay(SHORT_DELAY_IN_MS)

    stack.pop()
    stackArr.pop()
    setStackArr([...stackArr])

    setInProgress(false)
  }

  const clearStack = async () => {
    setInProgress(true)
    await delay(SHORT_DELAY_IN_MS)

    stack.clearAll()
    setStackArr([])

    setInProgress(false)

  }

  return (
    <SolutionLayout title='Стек'>
      <form onSubmit={addStackItem}>
        <InputContainer extraClass={styles.inputContainer}>
          <Input
            value={input}
            onChange={e => changeInput(e)}
            isLimitText={true} 
            maxLength={4}
            disabled={inProgress}
            extraClass={styles.input}/>
          <Button
            disabled={input === ''} 
            text='Добавить'
            type='submit'
            isLoader={inProgress}/>
          <Button
            disabled={!stackArr.length} 
            text='Удалить'
            type='button'
            isLoader={inProgress}
            extraClass={styles.buttonMargin}
            onClick={deleteStackItem}/>
          <Button
            disabled={!stackArr.length} 
            text='Очистить'
            type='reset'
            isLoader={inProgress}
            onClick={clearStack}/>
        </InputContainer>
      </form>

      <ul className={styles.circleContainer}>
            {stackArr && stackArr.map((item, index) => 
              <li key={index}>
                <Circle letter={item.text || ''} index={index} state={item.state}
                head={stackArr.length - 1 === index ? 'top' : ''}/>
              </li>
            )}
      </ul>

    </SolutionLayout>
  );
};
