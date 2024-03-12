"use client"

import { useGetAllProducts } from '@/hooks/useGetProducts'

function ProductsJSON() {
  const products = useGetAllProducts()

  return (
    <pre>
      {JSON.stringify(products, null, 2)}
    </pre>
  )
}

export default ProductsJSON
