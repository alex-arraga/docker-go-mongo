"use client"

import Image from "next/image"

function Presentation() {
  return (
    <aside className='flex flex-col justify-start items-center bg-gray-900 gap-4 p-4 w-full h-auto rounded-lg'>
      <h1 className='text-base md:text-xl font-medium text-blue-200'>Products API building with:</h1>

      <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full h-full gap-4'>
        <div className='flex flex-col items-center justify-start bg-gray-700 w-full h-full rounded-lg p-2 xl:p-4'>
          <h2 className="mb-2 md:mb-4 text-sm md:text-base">Database</h2>
          <div className="relative flex flex-col gap-4 justify-center items-center h-full w-full rounded-lg bg-slate-800">
            <h3 className="mt-2 xl:mt-0 text-blue-200 font-medium text-xs md:text-base">MongoDB</h3>
            <Image
              src="/mongodb.svg"
              alt={"mongodb logo"}
              width={150}
              height={150}
              className="object-contain mb-4 h-16 w-16 sm:w-20 sm:h-20 xl:w-[9.5rem] xl:h-[9.5rem]"
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-start bg-gray-700 w-full h-full rounded-lg p-2 xl:p-4'>
          <h2 className="mb-2 md:mb-4 text-sm md:text-base">Backend</h2>
          <div className="relative flex flex-col gap-4 justify-center items-center h-full w-full rounded-lg bg-slate-800">
            <h3 className="mt-2 xl:mt-0 text-blue-200 font-medium text-xs md:text-base">Docker & Go</h3>
            <Image
              src="/docker-go.png"
              alt={"docker and go stack"}
              width={150}
              height={150}
              className="object-contain mb-4 h-16 w-16 sm:w-20 sm:h-20 xl:w-[9.5rem] xl:h-[9.5rem]"
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-start bg-gray-700 w-full h-full rounded-lg p-2 xl:p-4'>
          <h2 className="mb-2 md:mb-4 text-sm md:text-base">Frontend</h2>
          <div className="relative flex flex-col gap-4 justify-center items-center h-full w-full rounded-lg bg-slate-800">
            <h3 className="mt-2 xl:mt-0 text-blue-200 font-medium text-xs md:text-base">Next & Tailwind</h3>
            <Image
              src="/next-tailwind.png"
              alt="next.js and tailwind logo"
              width={150}
              height={150}
              className="object-contain mb-4 h-16 w-16 sm:w-20 sm:h-20 xl:w-[9.5rem] xl:h-[9.5rem]"
            />
          </div>
        </div>
      </section>
    </aside>
  )
}

export default Presentation
