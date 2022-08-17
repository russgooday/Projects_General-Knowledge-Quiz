import { questions } from '../data/questions.js'
import { shuffle, getRandomSelection } from './helpers/quiz-helpers.js'
import templates from '../templates/quiz-templates.js'

const quiz = (function (doc) {

  // Creates new quiz properties
  const getQuizProps = (questions, num = 5) => ({
    numCorrect: 0,
    currQuestion: 0,
    questions: getRandomSelection(questions, num)
  })

  const startQuiz = (() => {

    const quizContainer = doc.querySelector('#quiz')
    const multiChoice = quizContainer.querySelector('.multiple-choice')
    let optionHandler

    return function quizHandler ({ target, type }) {

      if (type === 'click' && !target.matches('button')) return

      const newQuiz = getQuizProps(questions, 5)

      // Remove previous handler
      if (optionHandler) {
        multiChoice.removeEventListener('click', optionHandler)
      }

      // add new handler bundled with new quiz properties
      optionHandler = getOptionHandler(newQuiz)
      multiChoice.addEventListener('click', optionHandler)

      // display first question
      displayQuestion(newQuiz.questions[0])

      quizContainer.classList.add('intro-hidden')
    }
  })()

  /* Returns handler bundled with new quiz properties */

  const getOptionHandler = function ({ currQuestion, numCorrect, questions }) {

    return function optionHandler ({ target }) {

      if (!target.matches('button')) return

      if (questions[currQuestion].answer === target.textContent) numCorrect++

      // display next question
      if (currQuestion < questions.length - 1) {
        currQuestion++
        displayQuestion(questions[currQuestion])
        return
      }

      displayResult(numCorrect, questions.length)
    }
  }

  /* --- Display Intro --- */

  const displayIntro = function () {
    const quizContainer = doc.querySelector('.quiz-container')
    const intro = quizContainer.querySelector('.intro')

    intro.innerHTML = templates.intro()
    quizContainer.classList.remove('intro-hidden')
  }

  /* --- Display Question and Multiple Choice --- */

  const displayQuestion = function ({ question, choices }) {
    const questionElem = doc.querySelector('.question')
    const multipleChoice = doc.querySelector('.multiple-choice')

    questionElem.innerHTML = question
    multipleChoice.innerHTML = templates.options(shuffle(choices))
  }

  /* --- Display Results --- */

  const displayResult = function (numCorrect, numQuestions) {
    const quizContainer = doc.querySelector('.quiz-container')
    const conclusion = quizContainer.querySelector('.conclusion')

    conclusion.innerHTML = templates.conclusion(numCorrect, numQuestions)
    quizContainer.classList.remove('intro-hidden')
  }

  return { displayIntro, start: startQuiz }
}(window.document))

window.addEventListener('DOMContentLoaded', (event) => {
  const startButton = document.querySelector('.intro')

  startButton.addEventListener('click', quiz.start)
  quiz.displayIntro()
})

