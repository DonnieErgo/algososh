import { SyntheticEvent, useState, FC } from 'react';
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { InputContainer } from '../../components/ui/input-container/input-container';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const FibonacciPage: FC = () => {
  const [input, setInput] = useState<number>(0)
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [arr, setArr] = useState<number[]>([])

  const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInput(+e.currentTarget.value)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setInProgress(true)
    await getFibonacciNumbers(input)

    setInput(0)
    setInProgress(false)
  }

  const getFibonacciNumbers = async (number: number) => {
    let x = 1,
        y = 0,
        z

    const res: number[] = []

    while (number >= 0) {
      z = x + y;
      x = y;
      y = z;

      res.push(z);

      await delay(SHORT_DELAY_IN_MS)
      setArr([...res])

      number -= 1
    }
  }

  return (
    <SolutionLayout title='Fibonacci Sequence'>

      <form onSubmit={handleFormSubmit}>
        <InputContainer>
          <Input
            onChange={(e) => changeInput(e) }
            isLimitText={true}
            maxLength={19}
            disabled={inProgress}
            extraClass={styles.input}
            type={'number'}
            max={19}
            value={input}
            data-cy='input'/>
          <Button
            disabled={input === 0 || input > 19}
            text='Calculate'
            type='submit'
            isLoader={inProgress}
            data-cy='submit'/>
        </InputContainer>
      </form>

      <ul className={styles.circleContainer}>
          {arr && arr.map((item, index) =>
            <li key={index}>
              <Circle letter={item+''} index={index}/>
            </li>
          )}
      </ul>

    </SolutionLayout>
  );
};
