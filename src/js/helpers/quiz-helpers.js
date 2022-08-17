const shuffle = (arr) => ([...arr].sort(() => Math.random() - 0.5))

const getRandomSelection = (arr, max = 5) => (
  shuffle(arr).slice(0, Math.min(max, arr.length - 1))
)

export { shuffle, getRandomSelection }
