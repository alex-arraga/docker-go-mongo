"use client"

import { useGetAllProducts } from '@/hooks/useGetProducts'

export function ProductCard() {
  const products = useGetAllProducts()

  return (
    <section>
      <ul className='grid grid-cols-1 w-full gap-6 rounded-lg'>
        {products?.map((product) => (
          <li className='flex flex-col w-full bg-slate-800 shadow-md shadow-zinc-700 rounded-lg p-4 gap-2' key={product.id}>
            <h3 className='text-xl font-medium'>{product.brand + " " + product.name}</h3>
            <p className='text-cyan-100'>$ {product.cost.toLocaleString('ar-AR', { style: "currency", currency: "ARS" })}</p>
            <p className='text-sm'>ID: {product.id}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductCard

// {product.id.slice(0, 12) + "..."}