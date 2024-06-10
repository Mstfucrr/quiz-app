import { useQuestion } from '@/hooks/useQuestion'
import settings from '@/static/settings'

type Props = {
  selectedAnswer: string | null
  setSelectedAnswer: (value: string | null) => void
}

const QuizFooter = ({ selectedAnswer, setSelectedAnswer }: Props) => {
  const { answerable, handleAnswer, answeredQuestions } = useQuestion()

  const handleSubmitAnswer = () => {
    handleAnswer(selectedAnswer)
    setSelectedAnswer(null)
  }

  return (
    <footer className='flex w-full items-center justify-end border-t-4 border-dashed border-blue-600 px-3 py-5 md:px-16'>
      <button
        onClick={handleSubmitAnswer}
        className='flex w-1/2 items-center justify-center rounded-xl border-2 border-solid border-blue-700 bg-blue-700 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-1/4'
        disabled={selectedAnswer === null || !answerable}
        aria-label='Submit Answer'
      >
        {answeredQuestions.length === settings.QUESTIN_COUNT - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </footer>
  )
}

export default QuizFooter
