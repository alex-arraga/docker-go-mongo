"use client"

import Image from "next/image"

function Presentation() {
  return (
    <aside className='flex flex-col justify-start items-center bg-gray-900 gap-4 p-4 w-full h-auto rounded-lg'>
      <h1 className='text-xl font-bold text-blue-200'>Products API</h1>

      <section className='flex w-full h-full gap-4'>
        <div className='flex flex-col items-center justify-start bg-gray-700 w-full h-full rounded-lg p-4'>
          <h2 className="mb-4">Database</h2>
          <div className="relative flex flex-col gap-4 justify-center items-center h-full w-full rounded-lg bg-slate-800">
            <h3 className="text-blue-200 font-medium">MongoDB</h3>
            <Image
              src="/mongodb.svg"
              alt={"mongodb logo"}
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-start bg-gray-700 w-full h-full rounded-lg p-4'>
          <h2 className="mb-4">Backend</h2>
          <div className="relative flex flex-col gap-4 justify-center items-center h-full w-full rounded-lg bg-slate-800">
            <h3 className="text-blue-200 font-medium">Docker & Go</h3>
            <Image
              src="/docker-go.png"
              alt={"docker and go stack"}
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-start bg-gray-700 w-full h-full rounded-lg p-4'>
          <h2 className="mb-4">Frontend</h2>
          <div className="relative flex flex-col gap-4 justify-center items-center h-full w-full rounded-lg bg-slate-800">
            <h3 className="text-blue-200 font-medium">Next.js & Tailwind.css</h3>
            <Image
              src="/next-tailwind.png"
              alt="next.js and tailwind logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </aside>
  )
}

export default Presentation
