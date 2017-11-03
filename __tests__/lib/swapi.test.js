import { BASE_URL, fetchSwapi, getAllEntriesUrls } from '../../src/lib/swapi.js'
import 'whatwg-fetch'

describe('fetchSwapi', () => {
  test('should return Luke Skywalker', () => {
    expect.assertions(1)
    return expect(fetchSwapi(`${BASE_URL}people/1/`)).resolves.toMatchSnapshot()
  })
})

describe('getAllEntriesUrls', () => {
  let originalTimeout
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
  })

  it('should return all the urls for starships', () => {
    expect.assertions(1)
    return expect(getAllEntriesUrls(`${BASE_URL}starships`)).resolves.toMatchSnapshot()
  })

  it('should return all the urls for people', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
    expect.assertions(1)
    return expect(getAllEntriesUrls(`${BASE_URL}people`)).resolves.toMatchSnapshot()
  })

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
  })
})
