import settings from '@/static/settings'
import { ApiQuizData, QuizQuestion } from '@/types'

/**
 * Generates a quiz from the given data
 * @function
 * @param {ApiQuizData[]} data - The data to generate the quiz from
 * @returns {QuizQuestion[]} - The generated quiz
 * @example
 * import quizGenerator from '@/utils/quizGenerator'
 *
 * const data = [
 *  {
 *    userId: 1,
 *    id: 1,
 *    title: 'foo',
 *    body: 'aaa\nbar\nbaz\nqux'
 *  }
 * ]
 *
 * const quiz = quizGenerator(data)
 * console.log(quiz) // [{ id: 1, question: 'foo', answers: ['aaa', 'bar', 'baz', 'qux'], correctAnswer: 'aaa' }]
 *
 */

const quizGenerator = (data: ApiQuizData[]): QuizQuestion[] => {
  const start = Math.floor(Math.random() * (data.length - settings.QUESTIN_COUNT))
  const quiz: QuizQuestion[] = data.slice(start, start + settings.QUESTIN_COUNT).map(question => {
    const answers = question.body.split('\n')
    const correctAnswer = answers[0]
    return {
      id: question.id,
      question: question.title,
      answers,
      correctAnswer
    }
  })
  return quiz
}

export default quizGenerator
