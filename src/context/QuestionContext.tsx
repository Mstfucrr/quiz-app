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
  isRunning: boolean
  startTimer: () => void
} = {
  currentQuestion: {} as QuizQuestion,
  quizQuestions: [],
  isPending: true,
  answerable: false,
  setAnswerable: () => {},
  answeredQuestions: [],
  handleAnswer: () => {},
  timer: 0,
  finished: false,
  isRunning: false,
  startTimer: () => {}
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
  const { timer, resetTimer, isRunning, startTimer } = useTimer()

  const quizQuestions = useMemo(() => quizGenerator(data), [data])
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>(quizQuestions[0])
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([])
  const [answerable, setAnswerable] = useState<boolean>(false)
  const finished = useMemo(() => answeredQuestions.length === settings.QUESTIN_COUNT, [answeredQuestions])

  // if timer is greater than or equal to the answer time, set answerable to true
  useEffect(() => {
    if (timer >= settings.ANSWER_TIME) setAnswerable(true)
  }, [timer, isRunning])

  // if timer is equal to the question time limit, answer (null) and reset timer
  useEffect(() => {
    if (timer === settings.QUESTION_TIME_LIMIT) {
      handleAnswer(null)
      resetTimer()
    }
  }, [timer, isRunning])

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
    finished,
    isRunning,
    startTimer
  }

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
}

export { QuestionProvider, QuestionContext }
