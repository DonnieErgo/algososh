import { bubbleSort, selectionSort } from '../../utils/sort';

describe('selectionSort algorithm tests', () => {

  it('selectionSort with an empty array', async () => {
    const sort = await selectionSort([], 'asc')
    expect(sort).toEqual([])
  })

  it('selectionSort with a single item array', async () => {
    const sort = await selectionSort([1], 'asc')
    expect(sort).toEqual([1])
  })

  it('selectionSort with an ascending and populated array', async () => {
    const sort = await selectionSort([3, 1, 2], 'asc')
    expect(sort).toEqual([1, 2, 3])
  })

  it('selectionSort with a descending and populated array', async () => {
    const sort = await selectionSort([3, 1, 2], 'desc')
    expect(sort).toEqual([3, 2, 1])
  })
})

describe('bubbleSort algorithm tests', () => {

  it('bubbleSort with an empty array', async () => {
    const sort = await bubbleSort([], 'asc')
    expect(sort).toEqual([])
  })

  it('bubbleSort with a single item array', async () => {
    const sort = await bubbleSort([1], 'asc')
    expect(sort).toEqual([1])
  })

  it('bubbleSort with an ascending and populated array', async () => {
    const sort = await bubbleSort([3, 1, 2], 'asc')
    expect(sort).toEqual([1, 2, 3])
  })

  it('bubbleSort with an ascending and populated array', async () => {
    const sort = await bubbleSort([3, 1, 2], 'desc')
    expect(sort).toEqual([3, 2, 1])
  })
})