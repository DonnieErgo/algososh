import { SyntheticEvent, useState, FC, useEffect } from 'react';
import styles from './queue-page.module.css';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { InputContainer } from '../../components/ui/input-container/input-container';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Queue } from '../../utils/queue';
import { ElementStates } from '../../types/element-states';

interface IQueueItem {
  text: string
  state: ElementStates
  tail: boolean
  head: boolean
}

const queueLength = 7
const queue = new Queue<string>(queueLength)

export const QueuePage: FC = () => {
  const defaultQueueArr: IQueueItem[] = [...Array(queueLength)].map(_ => ({
    text: '',
    state: ElementStates.Default,
    tail: false,
    head: false
  }))

  const [input, setInput] = useState<string>('')
  const [isQueueActive, setQueueActive] = useState<boolean>(false)
  const [queueArr, setQueueArr] = useState<IQueueItem[]>(defaultQueueArr)
  const [inProgress, setInProgress] = useState<boolean>(false)

  useEffect(() => {
    setQueueActive(!queue.isEmpty())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProgress])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()

  const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const addQueueItem = async () => {
    setInProgress(true)

    queue.enqueue(input)
    queueArr[queue.getHead()].head = true

    if (queue.getTail() > 0) queueArr[queue.getTail() - 1].tail = false
    
    queueArr[queue.getTail()].text = input
    queueArr[queue.getTail()].tail = true
    queueArr[queue.getTail()].state = ElementStates.Changing
    
    await delay(SHORT_DELAY_IN_MS)
    
    queueArr[queue.getTail()].state = ElementStates.Default

    setInput('')
    setInProgress(false)
  }

  const deleteQueueItem = async () => {
    setInProgress(true)

    if (queue.getHead() === queue.getTail()) clearQueue()
    else {
      queue.dequeue()
      queueArr[queue.getHead()-1].state = ElementStates.Changing

      await delay(SHORT_DELAY_IN_MS)

      queueArr[queue.getHead()-1].state = ElementStates.Default
      if (queue.getHead() > 0) {
        queueArr[queue.getHead() - 1].head = false
        queueArr[queue.getHead() - 1].text = ''
      }
      queueArr[queue.getHead()].head = true

      setInProgress(false)
    }
  }

  const clearQueue = async () => {
    setInProgress(true)
    await delay(SHORT_DELAY_IN_MS)
    queue.clear()
    setQueueArr(defaultQueueArr)
    setInProgress(false)
  }

  return (
    <SolutionLayout title='Очередь'>

      <form onSubmit={handleFormSubmit}>
        <InputContainer extraClass={styles.inputContainer}>
          <Input
            value={input}
            onChange={e => changeInput(e)}
            isLimitText={true} 
            maxLength={4}
            disabled={inProgress}
            extraClass={styles.input}/>
          <Button
            disabled={input === '' || queue.getLength() >= 7 || queue.isFull()} 
            text='Добавить'
            type='button'
            isLoader={inProgress}
            onClick={addQueueItem}/>
          <Button
            disabled={!isQueueActive} 
            text='Удалить'
            type='button'
            isLoader={inProgress}
            extraClass={styles.buttonMargin}
            onClick={deleteQueueItem}/>
          <Button
            disabled={!isQueueActive} 
            text='Очистить'
            type='reset'
            isLoader={inProgress}
            onClick={clearQueue}/>
        </InputContainer>
      </form>

      <ul className={styles.circleContainer}>
            {queueArr && queueArr.map((item, index) => 
              <li key={index}>
                <Circle letter={item.text} index={index} state={item.state}
                  head={item.head ? 'head' : ''}
                  tail={item.tail ? 'tail' : ''}/>
              </li>
            )}
      </ul> 

    </SolutionLayout>
  );
};
