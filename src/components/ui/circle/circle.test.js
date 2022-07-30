import renderer from 'react-test-renderer'
import { Circle } from './circle'
import { ElementStates } from '../../../types/element-states'

describe('Circle component tests', () => {

  it('circle renders without letter', () => {
    const circle = renderer.create(<Circle />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with letter', () => {
    const circle = renderer.create(<Circle letter='x' />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with head', () => {
    const circle = renderer.create(<Circle head='x' />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with component in head', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with tail', () => {
    const circle = renderer.create(<Circle tail='x' />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with component in tail', () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with index', () => {
    const circle = renderer.create(<Circle index={1} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with isSmall prop', () => {
    const circle = renderer.create(<Circle isSmall />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with Default state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with Changing state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle renders with Modified state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

})