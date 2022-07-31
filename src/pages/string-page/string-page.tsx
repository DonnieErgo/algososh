import { SyntheticEvent, useState, FC } from 'react';
import styles from './string-page.module.css';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { InputContainer } from '../../components/ui/input-container/input-container';
import { ElementStates } from '../../types/element-states';
import { reverseString } from '../../utils/string';
import { ICharacter } from '../../types/types'

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

    const strInputArr = input.split('').map(char => ({
      character: char, 
      state: ElementStates.Default 
    }))

    await reverseString(strInputArr, setStringArr)
    setInput('')
    setInProgress(false)
  }

  return (
    <SolutionLayout title='Строка'>

      <form onSubmit={handleFormSubmit}>
        <InputContainer>
          <Input
            value={input}
            onChange={(e) => changeInput(e) }
            isLimitText={true} 
            maxLength={11}
            disabled={inProgress}
            extraClass={styles.input}
            data-cy='input'/>
          <Button
            disabled={input.length < 2} 
            text='Развернуть'
            type='submit'
            isLoader={inProgress}
            data-cy='submit'/>
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
