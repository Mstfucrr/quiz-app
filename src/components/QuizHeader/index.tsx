import { useQuestion } from '@/hooks/useQuestion'
import settings from '@/static/settings'
import React, { useMemo } from 'react'

const QuizHeader = () => {
  const { answeredQuestions, quizQuestions, timer } = useQuestion()

  const timerLabel = useMemo(() => {
    const countdown = settings.QUESTION_TIME_LIMIT - timer
    const minutes = Math.floor(countdown / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (countdown % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }, [timer])

  return (
    <header className='flex w-full items-center justify-center border-b-4 border-dashed border-blue-600 py-3'>
      <div className='flex flex-col gap-y-2 text-center'>
        <h3 className='text-2xl font-bold'>{timerLabel}</h3>
        <span className='text-lg font-semibold'>
          {answeredQuestions.length + 1} / {quizQuestions.length}
        </span>
      </div>
    </header>
  )
}

export default QuizHeader
