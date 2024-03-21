import { ContainerPageProps } from '@/types/HomePage'
import React from 'react'

function ContainerPage({ children }: ContainerPageProps) {
  return (
    <section className='flex justify-center items-center p-1 sm:p-4 min-w-screen min-h-screen h-full overflow-x-hidden bg-slate-800'>
      {children}
    </section>
  )
}

export default ContainerPage
