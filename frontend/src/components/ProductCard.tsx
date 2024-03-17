"use client"

import { useGetAllProducts } from '@/hooks/useGetProducts'

export function ProductCard() {
  const products = useGetAllProducts()

  return (
    <section className='flex flex-1 justify-center items-center bg-red-100'>
      <ul className='flex flex-1 max-w-2xl justify-center items-center gap-4 bg-slate-400 p-4 rounded-lg'>
        {products?.map((product) => (
          <li className='bg-slate-800 rounded-lg w-full p-4' key={product.id}>
            <p>ID: {product.id.slice(0, 12) + "..."}</p>
            <h3>Product: {product.brand + " " + product.name}</h3>
            <p className='font-medium'>Cost: <span className='text-cyan-200'>$ {product.cost.toLocaleString('ar-AR', { style: "currency", currency: "ARS" })}</span></p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductCard
