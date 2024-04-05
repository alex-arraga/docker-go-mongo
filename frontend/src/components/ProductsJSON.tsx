"use client"

import { useProductsContext } from "@/app/context/ProductsContext"

function ProductsJSON() {
  const { products } = useProductsContext()

  return (
    <pre>
      {JSON.stringify(products, null, 2)}
    </pre>
  )
}

export default ProductsJSON
