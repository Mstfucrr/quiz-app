import React from 'react'
import { useQuestion } from '@/hooks/useQuestion'

const QuizFinishTable = () => {
  const { answeredQuestions, quizQuestions } = useQuestion()

  const getMyAnswer = (questionId: string) => {
    const answeredQuestion = answeredQuestions.find(answer => answer.question.id === questionId)?.answer
    return answeredQuestion ?? 'Not Answered'
  }

  return (
    <div className='size-full px-3 py-5 md:px-8'>
      <div className='flex size-full flex-col gap-y-3 overflow-y-auto'>
        <table className='h-full w-full'>
          <thead>
            <tr className='sticky top-0 border-b-2 border-solid border-slate-800 bg-white text-left'>
              <th className='pl-2'>Question</th>
              <th className='pl-2'>True Answer</th>
              <th className='pl-2'>Your Answer</th>
            </tr>
          </thead>
          <tbody className='h-full'>
            {quizQuestions.map(question => (
              <tr key={question.id} className='border-b border-solid border-slate-800'>
                <td className='px-2'>{question.question}</td>
                <td className='px-2'>{question.correctAnswer}</td>
                <td
                  className={`px-2 ${getMyAnswer(question.id) === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}
                >
                  {getMyAnswer(question.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default QuizFinishTable
