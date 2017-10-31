import { BASE_URL, fetchSwapi, getAllEntriesUrls } from '../src/lib/swapi.js'
import 'whatwg-fetch'

describe('fetchSwapi', () => {
  test('should return Luke Skywalker', () => {
    expect.assertions(1)
    return expect(fetchSwapi(`${BASE_URL}people/1/`)).resolves.toMatchSnapshot()
  })
})

describe('getAllEntriesUrls', () => {
  test('should return all the urls for starships', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
    expect.assertions(1)
    return expect(getAllEntriesUrls(`${BASE_URL}starships`)).resolves.toMatchSnapshot()
  })
})
