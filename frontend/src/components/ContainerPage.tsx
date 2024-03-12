import { ContainerPageProps } from '@/types/HomePage'
import React from 'react'

function ContainerPage({ children }: ContainerPageProps) {
  return (
    <section className='flex justify-center items-center p-4 w-screen h-screen overflow-x-hidden bg-slate-800'>
      {children}
    </section>
  )
}

export default ContainerPage
