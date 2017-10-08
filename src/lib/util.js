function shuffleArray (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function getRandomUrls (urls) {
  let urlsCopy = urls.slice()
  let result = []
  for (let i = 0; i < 4; i++) {
    result.push(urlsCopy.splice(Math.floor(Math.random() * urlsCopy.length), 1))
  }
  return result
}

export { shuffleArray, getRandomUrls }
