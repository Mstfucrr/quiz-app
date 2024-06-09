/**
 * Settings for the quiz game
 * @constant
 * @type {Object}
 * @property {number} QUESTIN_COUNT - Number of questions to be shown in the quiz.
 * @property {number} ANSWER_TIME - The time required for a question to be answerable
 * @property {number} QUESTION_TIME_LIMIT - The time limit for answering a question.
 * @default
 * @example
 * import settings from '@/static/settings'
 *
 * console.log(settings.QUESTIN_COUNT) // 10 (default)
 * console.log(settings.ANSWER_TIME) // 10 (default)
 * console.log(settings.QUESTION_TIME_LIMIT) // 30 (default)
 *
 */

export default {
  QUESTIN_COUNT: 10,
  ANSWER_TIME: 10,
  QUESTION_TIME_LIMIT: 30
}
