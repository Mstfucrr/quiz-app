import { useQuestion } from '@/hooks/useQuestion'
import React, { useMemo, useState } from 'react'
import QuizHeader from '@/components/QuizHeader'
import QuizFooter from '@/components/QuizFooter'
import QuizFinishTable from '../QuizFinishTable'
import settings from '@/static/settings'

const Quiz = () => {
  const { currentQuestion, answerable, finished, timer, startTimer, isRunning } = useQuestion()

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleSelectAnswer = (answer: string) => setSelectedAnswer(answer)

  const timerLable = useMemo(() => settings.ANSWER_TIME - timer, [timer])

  return (
    <div className='flex h-full w-full rounded-3xl bg-white text-slate-800 md:h-[650px] lg:w-3/4'>
      {!isRunning ? (
        <div className='flex h-full w-full items-center justify-center'>
          <button
            onClick={startTimer}
            className='flex items-center justify-center rounded-xl border-2 border-solid border-blue-700 px-4 py-2.5 font-medium text-blue-700 transition-colors duration-300'
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className='flex h-full max-h-screen w-full flex-col gap-y-3'>
          {/* Header */}
          {!finished ? (
            <>
              <QuizHeader timer={timer} />
              <div className='flex w-full flex-1 flex-col gap-y-8 overflow-y-auto px-3 py-5 md:px-16'>
                <h1 className='text-lg font-medium'>{currentQuestion.question}</h1>
                <div className='flex w-full flex-col gap-y-3'>
                  {currentQuestion.answers.map((answer, index) => (
                    <button
                      key={answer}
                      onClick={() => handleSelectAnswer(answer)}
                      className={`flex w-full items-center rounded-xl border-2 border-solid border-blue-700 px-4 py-2.5 text-left font-medium transition-colors duration-300 disabled:opacity-80 md:w-2/3 ${
                        selectedAnswer === answer ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'
                      }`}
                      disabled={!answerable}
                      aria-label='Answer'
                    >
                      <span className='mr-3 w-6 rounded-full bg-blue-700 text-center text-white'>
                        {answerable ? String.fromCharCode(65 + index) : timerLable}
                      </span>

                      {answer}
                    </button>
                  ))}
                </div>
              </div>
              <QuizFooter selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
            </>
          ) : (
            <QuizFinishTable />
          )}
        </div>
      )}
    </div>
  )
}

export default Quiz
