"use client"

import { useGetAllProducts } from '@/hooks/useGetProducts'

export function ProductCard() {
  const products = useGetAllProducts()

  return (
    <section>
      <ul className='relative grid xl:grid-cols-2 w-full gap-6 rounded-lg'>
        {
          products && products.length > 0 ?
            products?.map((product) => (
              <li className='flex flex-col w-full bg-slate-800 shadow-md shadow-pink-900 rounded-lg p-4 gap-2' key={product.id}>
                <h3 className='text-xl font-medium'>{product.brand + " " + product.name}</h3>
                <p className='text-cyan-100'>$ {product.cost.toLocaleString('ar-AR', { style: "currency", currency: "ARS" })}</p>
                <p className='text-sm'>ID: {product.id}</p>
              </li>
            ))

            :
            <li>
              <p className='absolute top-0 w-full text-sm md:text-base text-center'>There is no product</p>
            </li>
        }
      </ul>
    </section>
  )
}

export default ProductCard

// {product.id.slice(0, 12) + "..."}