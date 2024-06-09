'use client'
import dynamic from 'next/dynamic'

const QuizLoading = () => (
  <div className='flex h-full w-full items-center justify-center'>
    <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-slate-800'></div>
  </div>
)

const Quiz = dynamic(() => import('@/components/Quiz'), { ssr: false, loading: () => <QuizLoading /> })

export default function Home() {
  return (
    <div className='container mx-auto flex h-screen items-center justify-center px-3'>
      <Quiz />
    </div>
  )
}
