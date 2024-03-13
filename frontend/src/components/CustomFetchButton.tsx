"use client"

import { CustomFetchButtonProps, ProductsApi } from '@/types/api'
import React, { useState } from 'react'

export function CustomFetchButton({ style, text, urlFetch, methodFetch, dataFetch, idFetch }: CustomFetchButtonProps) {
  const [data, setData] = useState<ProductsApi | string | null>(null)

  const handleFetch = async () => {
    try {
      // GET or DELETE all
      if (methodFetch === 'GET' || 'DELETE' && !idFetch) {
        const response = await fetch(`${urlFetch}`, {
          method: `${methodFetch}`,
          headers: {
            "Content-Type": "application/json"
          },
        })

        const data = await response.json() as ProductsApi
        setData(JSON.stringify(data.products, null, 2))
        console.log(data)
        return data

        // GET or DELETE one
      } else if (methodFetch === 'GET' || 'DELETE' && idFetch) {
        const response = await fetch(`${urlFetch}/${idFetch}`, {
          method: `${methodFetch}`,
          headers: {
            "Content-Type": "application/json"
          },
        })

        const data = await response.json() as ProductsApi
        setData(JSON.stringify(data.products, null, 2))
        console.log(data)
        return data

      } else if (methodFetch === 'PUT') {
        const response = await fetch(`${urlFetch}/${idFetch}`, {
          method: `${methodFetch}`,
          body: JSON.stringify(dataFetch),
          headers: {
            "Content-Type": "application/json"
          },
        })

        const data = await response.json() as ProductsApi
        setData(JSON.stringify(data))
        console.log(data)
        return data

        // POST
      } else {
        const response = await fetch(`${urlFetch}`, {
          method: `${methodFetch}`,
          body: JSON.stringify(dataFetch),
          headers: {
            "Content-Type": "application/json"
          },
        })

        const data = await response.json() as ProductsApi
        setData(JSON.stringify(data))
        console.log(data)
        return data
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='flex flex-col'>
      <div className='flex justify-center items-center w-auto'>
        <button
          className={style}
          onClick={handleFetch}
        >
          {text}
        </button>
      </div>
      <div className='flex justify-center items-center'>
        <pre className='p-2 rounded-lg w-fit h-auto'>
          {data?.toString()}
        </pre>
      </div>
    </section>
  )
}

export default CustomFetchButton
