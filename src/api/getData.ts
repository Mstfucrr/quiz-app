import { ApiQuizData } from '@/types'
import axios from 'axios'

export const getQuizData = async (): Promise<ApiQuizData[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return data
}

