const BASE_URL = 'https://swapi.co/api/'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json (response) {
  return response.json()
}

function fetchSwapi(url) {
  return (
    fetch(url)
      .then(checkStatus)
      .then(json)
      .catch(err => {
        console.log('Request failed', err)
      })
  )
}

async function getAllEntries (url, entries) {
  entries = entries || []
  const data = await fetchSwapi(url)
  entries = entries.concat(data.results)

  if (data.next) {
    return getAllEntries(data.next, entries)
  } else {
    return entries
  }
}

function getAllEntriesUrls (url) {
  return getAllEntries(url)
          .then(entries => entries.map(entry => entry.url))
}

export { BASE_URL, fetchSwapi, getAllEntriesUrls }
