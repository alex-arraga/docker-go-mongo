"use client"

import { ProductsApi } from "@/types/api"
import { useEffect, useState } from "react"

export function useGetAllProducts() {
  const [products, setProducts] = useState<ProductsApi | null>(null)

  useEffect((): void => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error("Error fetching response")
      }
      return response.json()
    }).then(data => {
      setProducts(data as ProductsApi)
    })
      .catch(err => { console.log("🔴 Error Catch: " + err) })
  }, [])

  return products?.products
}