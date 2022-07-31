import { reverseString } from '../../utils/string';

describe('reverseString algorithm tests', () => {

  it('reverseString with an even number of characters', async () => {
    const reverse = await reverseString(['q', 'w', 'e', 'r'])
    expect(reverse).toEqual(['r', 'e', 'w', 'q'])
  })

  it('reverseString with an odd number of characters', async () => {
    const reverse = await reverseString(['q', 'w', 'e'])
    expect(reverse).toEqual(['e', 'w', 'q'])
  })

  it('reverseString with a single character', async () => {
    const reverse = await reverseString(['q'])
    expect(reverse).toEqual(['q'])
  })

  it('reverseString with an empty array', async () => {
    const reverse = await reverseString([])
    expect(reverse).toEqual([])
  })
})