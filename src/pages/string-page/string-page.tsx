import { SyntheticEvent, useState, FC } from 'react';
import styles from './string-page.module.css'
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { InputContainer } from '../../components/ui/input-container/input-container'
import { delay } from '../../utils/utils';
import { ElementStates } from '../../types/element-states'
import { DELAY_IN_MS } from '../../constants/delays';

interface ICharacter {
  character: string
  state: ElementStates
}

export const StringPage: FC = () => {
  const [input, setInput] = useState<string>('')
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [stringArr, setStringArr] = useState<ICharacter[]>([])

  const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInProgress(true)

    const strInputArr = input.split('').map((char, i) => {
      return { 
        character: char, 
        state: ElementStates.Default }
    })

    await reverseString(strInputArr)
    setInput('')
    setInProgress(false)
  }

  const reverseString = async (arr: ICharacter[]) => {
    const midPoint = arr.length / 2
    let counter = 0

    while (counter < midPoint) {
      arr[counter].state = ElementStates.Changing
      arr[arr.length - counter - 1].state = ElementStates.Changing
      setStringArr([...arr])

      await delay(DELAY_IN_MS)

      arr[counter].state = ElementStates.Modified
      arr[arr.length - counter - 1].state = ElementStates.Modified;

      // swap elements, could use some elegance
      [arr[counter], arr[arr.length - counter - 1]] = [arr[arr.length - counter - 1], arr[counter]]
      setStringArr([...arr])

      await delay(DELAY_IN_MS)

      counter += 1
    }
  }

  return (
    <SolutionLayout title='Строка'>

      <form onSubmit={handleFormSubmit}>
        <InputContainer>
          <Input
            onChange={(e) => changeInput(e) }
            isLimitText={true} 
            maxLength={11}
            disabled={inProgress}
            extraClass={styles.input}/>
          <Button
            disabled={input.length < 2} 
            text='Развернуть'
            type='submit'
            isLoader={inProgress}/>
        </InputContainer>
      </form>

        <ul className={styles.circleContainer}>
            {stringArr && stringArr.map((item, index) => 
              <li key={index}>
                <Circle letter={item.character} state={item.state}/>
              </li>
            )}
        </ul>

    </SolutionLayout>
  );
};
