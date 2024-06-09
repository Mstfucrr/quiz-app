'use client'
import { QueryClient } from '@tanstack/react-query'

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'online',
      retry: 3,
      
    }
  }
})

export default reactQueryClient
