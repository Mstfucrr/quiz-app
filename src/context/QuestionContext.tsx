'use client'
// src/context/QuestionContext.tsx
import useGetData from '@/hooks/useGetData'
import useTimer from '@/hooks/useTimer'
import settings from '@/static/settings'
import { QuizQuestion } from '@/types'
import quizGenerator from '@/utils/quizGenerator'
import React, { ReactNode, createContext, useEffect, useMemo, useState } from 'react'

const defaultProviderValue: {
  currentQuestion: QuizQuestion
  quizQuestions: QuizQuestion[]
  isPending: boolean
  answerable: boolean
  setAnswerable: (value: boolean) => void
  answeredQuestions: AnsweredQuestion[]
  handleAnswer: (answer: string | null) => void
  timer: number
  finished: boolean
} = {
  currentQuestion: {} as QuizQuestion,
  quizQuestions: [],
  isPending: true,
  answerable: false,
  setAnswerable: () => {},
  answeredQuestions: [],
  handleAnswer: () => {},
  timer: 0,
  finished: false
}

const QuestionContext = createContext(defaultProviderValue)

type Props = {
  children: ReactNode
}

interface AnsweredQuestion {
  question: QuizQuestion
  answer: string | null
}

const QuestionProvider = ({ children }: Props) => {
  const { data, isPending } = useGetData()

  const quizQuestions = useMemo(() => quizGenerator(data), [data])
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>(quizQuestions[0])
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([])
  const [answerable, setAnswerable] = useState<boolean>(false)
  const finished = useMemo(() => answeredQuestions.length === settings.QUESTIN_COUNT, [answeredQuestions])

  // generate quiz questions

  const { timer, resetTimer } = useTimer()

  // 10 saniye geçtiğinde cevap verilebilir olacak
  useEffect(() => {
    if (timer >= settings.ANSWER_TIME) setAnswerable(true)
  }, [timer])

  // 30 saneye geçtiğinde null cevap verilmiş sayılacak ve bir sonraki soruya geçilecek
  useEffect(() => {
    if (timer === settings.QUESTION_TIME_LIMIT) {
      handleAnswer(null)
      resetTimer()
    }
  }, [timer])

  // answer question

  const handleAnswer = (answer: string | null) => {
    if (!answerable) return
    if (!currentQuestion) return
    setAnsweredQuestions([...answeredQuestions, { question: currentQuestion, answer }])
    handleNextQuestion()
  }

  const handleNextQuestion = () => {
    const currentQuestionIndex = quizQuestions.findIndex(question => question.id === currentQuestion.id)
    const nextQuestion = quizQuestions[currentQuestionIndex + 1]
    setCurrentQuestion(nextQuestion)
    setAnswerable(false)
    resetTimer()
  }

  const value = {
    currentQuestion,
    quizQuestions,
    isPending,
    answerable,
    setAnswerable,
    answeredQuestions,
    handleAnswer,
    timer,
    finished
  }

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
}

export { QuestionProvider, QuestionContext }
