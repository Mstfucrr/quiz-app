import { getQuizData } from '@/api/getData'
import { useSuspenseQuery } from '@tanstack/react-query'

const useGetData = () =>
  useSuspenseQuery({
    queryKey: ['quiz-data'],
    queryFn: getQuizData,
  })

export default useGetData
