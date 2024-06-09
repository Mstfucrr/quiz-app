export interface ApiQuizData {
  userId: string
  id: string
  title: string
  body: string
}

export interface QuizQuestion {
  id: string
  question: string
  answers: string[]
  correctAnswer: string
}
