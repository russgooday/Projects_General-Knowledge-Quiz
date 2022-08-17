const intro = () =>
  (`
    <h1>Ready to Play?</h1>
    <button>Start Quiz</button>
  `)

const options = ([a, b, c, d]) =>
  (`
    <button class='choice-a'>${a}</button>
    <button class='choice-b'>${b}</button>
    <button class='choice-c'>${c}</button>
    <button class='choice-d'>${d}</button>
  `)

const remarks = ['Nevermind, try Again!', 'Pretty Good!', 'Top Notch!']

const conclusion = (numCorrect, numQuestions) => {
  const index = Math.floor(numCorrect / numQuestions * 2)

  return `
    <h1>${remarks[index]}</h1>
    <h2 class='score'>${numCorrect} out of ${numQuestions} Correct</h2>
    <button>Play Again?</button>
  `
}

export default { intro, options, conclusion }
