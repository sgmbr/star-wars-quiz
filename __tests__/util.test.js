import { shuffleArray, getRandomUrls } from '../src/lib/util.js'

describe('shuffleArray', () => {
  it('returns an array', () => {
    const result = shuffleArray([1,2,3,4])
    expect(result instanceof Array).toBeTruthy()
  })

  it('returns an array of the same length as input', () => {
    const result = shuffleArray([1,2,3,4])
    expect(result.length).toBe(4)
  })
})

describe('getRandomUrls', () => {
  it('returns an array', () => {
    const result = getRandomUrls([1,2,3,4,5,6,7,8])
    expect(result instanceof Array).toBeTruthy()
  })

  it('returns an array of 4 elements', () => {
    const result = getRandomUrls([1,2,3,4,5,6,7,8])
    expect(result.length).toBe(4)
  })
})
