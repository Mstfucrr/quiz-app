// src/hooks/useQuestion.tsx

import { QuestionContext } from '@/context/QuestionContext'
import { useContext } from 'react'

export const useQuestion = () => useContext(QuestionContext)
