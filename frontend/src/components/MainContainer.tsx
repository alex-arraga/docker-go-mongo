import { ContainerPageProps } from '@/types/components'
import React from 'react'

function MainContainer({ children, type }: ContainerPageProps) {
  return (
    type === "page" ?
      <section className='flex justify-center items-center p-1 sm:p-4 min-w-screen min-h-screen h-full overflow-x-hidden bg-slate-800'>
        {children}
      </section>

      :

      <section className="relative flex flex-col justify-center h-auto w-full md:max-w-md bg-slate-900 border-2 border-blue-300 p-4 rounded-lg">
        {children}
      </section>
  )
}

export default MainContainer
